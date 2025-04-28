export class Order {
    constructor({customer}){
        this._id = this.id;
        this.customer = customer;
        this.items = [];
        this.paymentType = null;
    }
    get id() {
        return `Pedido ID: ${this._id}`;
    }
    set id(number = 0){
        number != 0 ? this._id = number : this._id = Math.floor(Math.random() * 1000);
    }
    addProduct(newProduct, newQuantity = 1) {
        if (newQuantity < 0) {
            const e = 'ERROR: Quantidade do produto deve ser maior que zero'
            console.warn(e)
            throw new Error(e);

        }

        const foundItem = this.items.find(item => {
            item.product.id === newProduct.id
        });

        if (foundItem) {
            foundItem.quantity += newQuantity
        } else {
            this.items.push(new OrderItem(newProduct, newQuantity));
        }

        console.log(`Adicionado ${quantidade}x ${produto.nome} ao pedido`);
    }
    removeProduct(productId, quantity = 1) {
        // Busca o indicador do produto na lista de produtos do Pedido
        const itemIndex = this.items.findIndex(item => item.product.id === productId)

        if (itemIndex > -1) {
            const foundItem = this.items[index];

            if (foundItem.quantity <= quantity) {
                this.items.splice(index, 1)
                console.log(`Produto ${foundItem.product.name} removido completamente do pedido`);
            } else {
                foundItem.quantity -= quantity;
                console.log(`Produto ${item.product.name} x${foundItem.produto.nome} do pedido`);
            }
            
            return true;
        } else {
            const e = 'ERROR: Produto não encontrado no pedido';
            console.warn(e)
            return false; 
        }
    }
}
class OrderItem {
    constructor({product, quantity}) {
        this.product = product;
        this.quantity = quantity;
    }

    get subTotalPrice() {
        return this.product.price * this.quantity; 
    }
}
