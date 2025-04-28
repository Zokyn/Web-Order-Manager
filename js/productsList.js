
/* CONSTANTES */
const PRODUCTS = [
    new Product({
        name: "Agulhinha",
        basePrice: 80
    }),
    new Product({
        name: "Patinha de Caranguejo",
        variations: [
            { name: "Com Casca", price: 105 },
            { name: "Sem Casca", price: 150 }
        ]
    }),
    new Product({
        name: "Camarão",
        variations: [
            { name: "Com Casca", price: 50 },
            { name: "Sem Casca", price: 85 }
        ]
    }),
    new Product({
        name: "Camarão Pistola",
        variations: [
            { name: "Com Casca", price: 85 },
            { name: "Sem Casca", price: 145 }
        ]
    }),
    new Product({
        name: "Siri",
        basePrice: 80
    }),
    new Product({
        name: "Aratu",
        basePrice: 80
    }),
    new Product({
        name: "Mariscada",
        basePrice: 68
    }),
    new Product({
        name: "Caranguejo",
        basePrice: 80
    }),
    new Product({
        name: "Polvo",
        basePrice: 80
    }),
    new Product({
        name: "Cavala",
        basePrice: 45
    }),
    new Product({
        name: "Badejo",
        basePrice: 65
    }),
    new Product({
        name: "Vermelho",
        basePrice: 55
    }),
    new Product({
        name: "Pescada Amarela",
        basePrice: 45
    }),
    new Product({
        name: "Robalo",
        basePrice: 65
    }),
    new Product({
        name: "Robalinho",
        basePrice: 50
    }),
    new Product({
        name: "Arraia",
        basePrice: 30
    }),
    new Product({
        name: "Filé de Badejo",
        basePrice: 106
    }),
    new Product({
        name: "Filé de Tilápia",
        basePrice: 68
    })
]

const PAYMENT_TYPE = {
    CASH: "Dinheiro",
    CREDIT: "Crédito",
    DEBIT: "Débito",
    PIX: "PIX"
}

/* CLASSES */

class ProductItem {
    constructor({product, quantity}) {
        this.product = product;
        this.quantity = quantity;
    }

    get subTotalPrice() {
        return this.product.price * this.quantity; 
    }
}
/* TODO: class Catalog {

} */

class Order {
    constructor({customer}){
        this._id = this.id;
        this.customer = customer;
        this.productItems = [];
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

        const foundItem = this.productItems.find(item => {
            item.product.id === newProduct.id
        });

        if (foundItem) {
            foundItem.quantity += newQuantity
        } else {
            this.productItems.push(new ProductItem(newProduct, newQuantity));
        }

        console.log(`Adicionado ${quantidade}x ${produto.nome} ao pedido`);
    }
    removeProduct(productId, quantity = 1) {
        // Busca o indicador do produto na lista de produtos do Pedido
        const itemIndex = this.productItems.findIndex(item => item.product.id === productId)

        if (itemIndex > -1) {
            const foundItem = this.productItems[index];

            if (foundItem.quantity <= quantity) {
                this.productItems.splice(index, 1)
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
class Catalog {
    constructor(element) {
        this.element = element,
        this.items = []
    }
    
    renderList() {
        if(!this.element) {
            this.element = document.createElement('ul');
        }
        PRODUCTS.forEach((product) => {
/*             // Para cada produto, cria-se um elemento HTML
            const item = product.createHTMLElement();
            // Atribui valores importantes para o item 
            item.dataset.id = product.id;
            item.dataset.name = product.name;
            item.dataset.price = product.price;  */

            // const item = new CatalogItem(product);
            const item = document.createElement('li', { is: 'catalog-item' });
            item.setProduct(product);
            // Insere o item na lista de produtos
            this.items.push(item);
            this.element.appendChild(item);
        })
    }
}
class CatalogItem extends HTMLLIElement {
    static CLASSNAME = 'product-item';
    constructor(product) {
        super();
        this.product = product
    }
    setProduct(product) {
        this.product = product
        this._init();
        this._setupEvents();
    }
    get hasVariations() {
        return this.product.hasVariations;
    }
    _init() {
        this.id =`${this.product.id}`
        this.name = `${this.product.slug}` 
        this.className = `${CatalogItem.CLASSNAME} ${this.product.slug}-item`

        // Atribui Informações do produto 
        this.dataset.id = this.product.id;
        this.dataset.name = this.product.name;
        this.dataset.price = this.product.price; 
        this.dataset.selected = -1;

        if(this._hasVariations)
            this.classList.add('unable');
        
        this.innerHTML +=
        `<input 
            name="${this.product.slug}-item"
            class="${CatalogItem.CLASSNAME}-check"
            type="checkbox" />
        `
        this.checkbox = this.querySelector(`.${CatalogItem.CLASSNAME}-check`);

        this.innerHTML += 
        `
        <figure>
            <img
                class="${CatalogItem.CLASSNAME}-picture" 
                src="https://placehold.co/240x240"/>
        </figure>
        <h3>${this.name}</h3>
        `
        this.picture = this.querySelector(`.${CatalogItem.CLASSNAME}-picture`);

        if(this.hasVariations) {
            const divOptionList = document.createElement("div");
            divOptionList.className = `${CatalogItem.CLASSNAME} sub-options-list`;

            this.product.variations.forEach((variation, i) => {
                divOptionList.innerHTML += `
                    <button
                        type="button"
                        id="option-${i}"
                        name="${this.product.slug}-${variation.name}"
                        class="${CatalogItem.CLASSNAME} sub-option-button"
                        value="${variation.basePrice}"
                        >
                        ${variation.name}
                        <span>R$${variation.basePrice}</span>
                    </button>
                `
            });
            
            this.appendChild(divOptionList)
        } 
        this.innerHTML += `
        <label class="${CatalogItem.CLASSNAME}-label">R$${this.product.price}</label>
        `
        this.priceLabel = this.querySelector(`.${CatalogItem.CLASSNAME}-label`);

        this.innerHTML += `
        <div class="quant-count-container hidden">
            <button
                id="item-${this.product.id}-remove"
                class="count-button"
                type="button">
                <i class="fa-solid fa-minus"></i>
            </button>
            <input 
                id="item-${this.product.id}-quant"
                value="1"
                class="count-input"
                type=["number"] />
            <button
                id="item-${this.product.id}-add"
                class="count-button"
                type="button">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        `
        this.buttons = this.querySelectorAll('.sub-option-button');
    }
    _setupEvents() {
        this.querySelector(`.${CatalogItem.CLASSNAME}-picture`)?.addEventListener('click', () => {
            if (!this.classList.contains('unable')) {
                this.classList.toggle('selected')
                // this.countContainer?.classList.toggle('hidden');
            }
        })
        
        this.querySelector(`.${CatalogItem.CLASSNAME}-check`)?.addEventListener('change', () => {
            if(!this.classList.contains('unable')) {
                this.classList.toggle('selected')

                // this.querySelector(`.count-quant-container`).classList.toggle('hidden');
            }
        })
        
        this.querySelectorAll('.sub-option-button')?.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault()

                this.buttons.forEach((button) => button.disabled = false);

                button.disabled = true;

                this.dataset.selected = button.id.slice(-1);

                this.classList.remove('unable');
                this.querySelector(`.${CatalogItem.CLASSNAME}-label`).textContent = `R$${this.product.getVariationPrice(this.dataset.selected)}`;
            })
        })
        console.log(this.querySelector(`.${CatalogItem.CLASSNAME}-picture`))
        console.log("eventos adicionado ao CatalogItem")
    }
}
customElements.define("catalog-item", CatalogItem, {extends: "li"});

document.addEventListener('DOMContentLoaded', function() {
    // Renderiza listContainer no elemento '.product-list'
    const list = new Catalog(document.querySelector('.products-list'));
    list.renderList();
})