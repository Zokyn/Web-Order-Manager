
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

        if(this.hasVariations)
            this.classList.add('unable');
        
        this.append(
            this._renderCheckbox(),
            this._renderPicture(),
        )
        
        if(this.hasVariations) {
            this.append(this._renderSubOptions());
        } 


        this._renderPriceLabel();

        this._renderQuantContainer();
    }
    _cacheElements() {
        this.checkbox = this.querySelector(`.${CatalogItem.CLASSNAME}-check`);
        this.picture = this.querySelector(`.${CatalogItem.CLASSNAME}-picture`);
        this.variationsButtons = this.querySelectorAll('.sub-option-button');
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

                this.querySelectorAll('.sub-option-button').forEach((button) => button.disabled = false);

                button.disabled = true;

                this.dataset.selected = button.id.slice(-1);

                this.classList.remove('unable');
                this.querySelector(`.${CatalogItem.CLASSNAME}-label`).textContent = `R$${button.value}`;
            })
        })
    }
    _renderCheckbox() {
        this.checkbox = Object.assign(document.createElement('input'), {
            name:`${this.product.slug}-item`,
            className:`${CatalogItem.CLASSNAME}-check`,
            type:'checkbox'
        })
        return this.checkbox;
    }

    _renderPicture() {  
        // Cria figure e insere <img> dentro dela
        this.picture = document.createElement('figure');
        this.picture.append(Object.assign(document.createElement('img'), {
            className:`${CatalogItem.CLASSNAME}-picture`,
            src: 'https://placehold.co/240x240'
        }));
        this.picture.append(Object.assign(document.createElement('figcaption'), {
            className: `${CatalogItem.CLASSNAME}-title`,
            textContent: this.product.name
        }));
        return this.picture;
    }
    _renderSubOptions() {
/*         const divOptionList = document.createElement("div");
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
         */
        this.variationsButtons = Object.assign(document.createElement('div'), {
            className: `${CatalogItem.CLASSNAME} sub-options-list`
        });
        this.product.variations.forEach((variation, i) => {
            let spanPrice = document.createElement('span')
            spanPrice.textContent = `R$${variation.price}`
            let button = Object.assign(document.createElement('button'), {
                id: `option-${i}`,
                name: `${this.product.slug}-${variation.slug}`,
                className: `${CatalogItem.CLASSNAME} sub-option-button`,
                value:`${variation.price}`,
                type: 'button',
                innerText: variation.name
            });
            button.appendChild(spanPrice);
            this.variationsButtons.append(button)
        })
        return this.variationsButtons;
        // this.appendChild(divOptionList)
        // this.buttons = this.querySelectorAll('.sub-option-button');
    }
    _renderPriceLabel() {
        this.innerHTML += `
        <label class="${CatalogItem.CLASSNAME}-label">R$${this.product.price}</label>
        `
        this.priceLabel = this.querySelector(`.${CatalogItem.CLASSNAME}-label`);
    }
    _renderQuantContainer() {
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
        this.quantAddButton = this.querySelector('count-button')
    }
}
customElements.define("catalog-item", CatalogItem, {extends: "li"});

document.addEventListener('DOMContentLoaded', function() {
    // Renderiza listContainer no elemento '.product-list'
    const list = new Catalog(document.querySelector('.products-list'));
    list.renderList();
})