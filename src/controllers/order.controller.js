const { Order, OrderDetail, Product, sequelize } = require("../../models");
const { errorResponse, successResponse } = require("../helpers/response.helper");

const createOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { customer_id, items } = req.body;

        const total = items.reduce((acc, item) => acc + (item.qty * item.product_price), 0);
        const order = await Order.create({customer_id, total}, {transaction: t});
        
        const orderItems = items.map(item => ({...item, order_id: order.order_id}));
        const orderDetail = await OrderDetail.bulkCreate(orderItems, {individualHooks: true, transaction: t});

        for (const item of orderItems) {
            const product = await Product.findByPk(item.product_id, {transaction: t});
            await Product.update(
                { qty: product.qty - item.qty },
                { where: { product_id: item.product_id }, transaction: t }
            );
        }

        await t.commit();
        successResponse(res, "Create order successfully", {order, orderDetail});
    } catch (error) {
        await t.rollback();
        errorResponse(res, "Error create order", error.message);
    }
}

module.exports = {
    createOrder
}