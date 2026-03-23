"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderInput, user) {
        const restaurant = await this.prisma.restaurant.findUnique({ where: { id: createOrderInput.restaurantId } });
        if (!restaurant)
            throw new common_1.NotFoundException('Restaurant not found');
        if (user.role !== 'ADMIN' && restaurant.country !== user.country) {
            throw new common_1.UnauthorizedException('Cannot order from a restaurant outside your country');
        }
        let totalAmount = 0;
        const itemsData = [];
        for (const item of createOrderInput.items) {
            const dbItem = await this.prisma.menuItem.findUnique({ where: { id: item.menuItemId } });
            if (!dbItem || dbItem.restaurantId !== restaurant.id) {
                throw new common_1.BadRequestException(`Invalid menu item ${item.menuItemId}`);
            }
            totalAmount += dbItem.price * item.quantity;
            itemsData.push({
                menuItemId: dbItem.id,
                quantity: item.quantity,
                price: dbItem.price,
            });
        }
        return this.prisma.order.create({
            data: {
                userId: user.id,
                restaurantId: restaurant.id,
                totalAmount,
                status: 'CREATED',
                orderItems: {
                    create: itemsData,
                },
            },
        });
    }
    async checkout(orderId, user) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId }, include: { restaurant: true } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (user.role !== 'ADMIN' && order.restaurant.country !== user.country) {
            throw new common_1.UnauthorizedException('Cannot checkout order outside your country');
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID' },
        });
    }
    async cancel(orderId, user) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId }, include: { restaurant: true } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (user.role !== 'ADMIN' && order.restaurant.country !== user.country) {
            throw new common_1.UnauthorizedException('Cannot cancel order outside your country');
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map