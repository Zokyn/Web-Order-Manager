import { OrderItem } from './OrderItem.js'
/* Order (Model) */
export class Order {
    constructor({customer}){
        this._id = Math.floor(Math.random() * 1000);
        this.customer = customer;
        this.items = [];
        this.paymentType = null;
    }
/*     get id() {
        return `Pedido ID: ${this._id}`;
    }
    set id(number = 0){
        number != 0 ? this._id = number : this._id = Math.floor(Math.random() * 1000);
    } */
    addItem(product, variationIndex = null, quantity = 1) {
        if (quantity < 0) {
            const e = 'ERROR: Quantidade do produto deve ser maior que zero'
            console.warn(e)
            throw new Error(e);
        }

        const foundItem = this.items.find(item => {
            item.product.id === product.id && item.variationIndex === variationIndex
        });

        if (foundItem) {
            foundItem.quantity += quantity;
        } else {
            this.items.push(new OrderItem(product, quantity));
        }
        // console.log(`Adicionado ${quantidade}x ${produto.nome} ao pedido`);
        this._updateOrderDisplay();
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

    handleItemSelect(event) {
        const product = event.detail.product;
        const variationIndex = event.detail.variationIndex;
        const price = variationIndex ? product.variations[variationIndex].price : product.price;

        this.items.push(new OrderItem({
            product: { ...product, price },
            variationIndex,
            quantity: 1
        }));
        this._updateUI();
    }

    handleItemUpdate(event) {
        const product = event.detail.product;
        const variationIndex = event.detail.variationIndex;
        const price = variationIndex ? product.variations[variationIndex].price : product.price;
        const quantity = event.detail.quantity;

        this.items = this.items.filter(item => {
            !(item.product.id === product.id && item.variationIndex === variationIndex)
        });

        this.items.push(new OrderItem({
            product: { ...product, price },
            variationIndex,
            quantity: quantity
        }));

        this._updateUI();
    }

    handleItemUnselect(event) {
        const productId = event.detail.productId;
        const variationIndex = event.detail.variationIndex;

        this.items = this.items.filter(item => {
            !(item.product.id === productId && item.variationIndex === variationIndex)
        });
        this._updateUI();
    }
    _updateUI() {
        console.log("Pedido atual:", this.items);

        const total = this.items.reduce((sum, item) => sum + item.subTotalPrice, 0);
        console.log(`Total: R$${total.toFixed(2)}`);
    }
}
