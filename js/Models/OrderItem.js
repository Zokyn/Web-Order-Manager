export class OrderItem {
    constructor({product, quantity}) {
        this.product = product;
        this.quantity = parseInt(quantity);
    }

    get subTotalPrice() {
        return parseInt(this.product.price) * this.quantity; 
    }
}
