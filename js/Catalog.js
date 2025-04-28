
/* CLASSES */
export default class Catalog {
    constructor(element, products, order) {
        this.element = element,
        this.order = order;
        this._render(products);
    }
    
    _render(products) {
        if(!this.element) {
            this.element = document.createElement('ul');
        }
        products.forEach((product) => {
            const item = document.createElement('li', { is: 'catalog-item' });
            item._setProduct(product)
            
            item.addEventListener('item-selected', (e) => {
                this.order.handleItemSelect(e);
            });

            item.addEventListener('item-unselected', (e) => {
                this.order.handleItemUnselect(e);
            });

            item.addEventListener('item-updated', (e) => {
                this.order.handleItemSelect(e);
            })
            
            // Insere o item na lista de produtos
            this.element.appendChild(item);
        })
    }
}
class CatalogItem extends HTMLLIElement {
    static CLASSNAME = 'product-item';
    constructor(product) {
        super();
    }
    _setProduct(product) {
        this.product = product;
        this.selectedVariation = null;
        this._init()
    }
    get hasVariations() {
        return this.product.hasVariations;
    }
    _init() {
        this._setProductInfo();

        this.id =`${this.product.id}`
        this.name = `${this.product.slug}` 
        this.className = `${CatalogItem.CLASSNAME} ${this.product.slug}-item`

        // Adiciona Itens
        this.append(
            this._renderCheckbox(), /* Checkbox */
            this._renderPicture(), /* Picture */
            this._renderPriceLabel() /* Price Label */
        )
        
        // Se houver variações
        if(this.hasVariations) {
            // Desativa seleção do item 
            this.classList.add('unable');
            // Adiciona botões de variações
            this.append(this._renderSubOptions());
        } 

        // Adiciona container do contador
        this._renderQuantContainer();
        
        // Define elemento e liga eventos
        this._cacheElements();
        this._setupEvents();

    }
    _setProductInfo() {
        // Atribui Informações do produto 
        this.dataset.id = this.product.id;
        this.dataset.name = this.product.name;
        this.dataset.price = this.product.price; 
        this.dataset.selected = -1;
    }
    _cacheElements() {
        this.checkbox = this.querySelector(`.${CatalogItem.CLASSNAME}-check`);
        this.picture = this.querySelector(`.${CatalogItem.CLASSNAME}-picture`);
        this.variationsButtons = this.querySelectorAll('.sub-option-button');
        this.priceLabel = this.querySelector(`.${CatalogItem.CLASSNAME}-price`);

        this.quantContainer = this.querySelector('.quant-count-container')
        this.quantAddButton = this.querySelector('.count-button:first-child');
        this.quantCounter = this.querySelector('input .count-button')
        this.quantSubButton = this.querySelector('.count-button:last-child');
    }
    _setupEvents() {
        this.picture?.addEventListener('click', () => this._handlePictureClick())
        this.checkbox?.addEventListener('change', () => this._handleCheckBoxChange())
        this.variationsButtons?.forEach((button) => {
            button.addEventListener('click', (e) => {
                this._handleVariationOptionClick(button, e)
            })
        })
    }
    /* Componentes */
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
            src: `../images/${this.product.slug}.jpg`
        }));
        // Adiciona caption com estilos de titulo
        this.picture.append(Object.assign(document.createElement('figcaption'), {
            className: `${CatalogItem.CLASSNAME}-title`,
            textContent: this.product.name
        }));
        return this.picture;
    }
    _renderSubOptions() {
        this.variationsButtons = Object.assign(document.createElement('div'), {
            className: `${CatalogItem.CLASSNAME} sub-options-list`
        });
        this.product.variations.forEach((variation, i) => {
            let spanPrice = document.createElement('span')
            spanPrice.textContent = ` R$${variation.price}`
            let button = Object.assign(document.createElement('button'), {
                id: `option-${i}`,
                name: `${this.product.slug}-${variation.slug}`,
                className: `${CatalogItem.CLASSNAME} sub-option-button`,
                value:`${variation.price}`,
                type: 'button',
                textContent: variation.name
            });
            button.dataset.index = i;
            button.appendChild(spanPrice);
            this.variationsButtons.append(button)
        })
        return this.variationsButtons;
    }
    _renderPriceLabel() {
        this.priceLabel = Object.assign(document.createElement('label'), {
            className: `${CatalogItem.CLASSNAME}-price`,
            textContent: `R$${this.product.price}`
        })

        return this.priceLabel;
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
    }
    /* Event Handles */
    _handlePictureClick() {
        if(!this.classList.contains('unable')) {
            this.classList.toggle('selected');
            this.quantContainer?.classList.toggle('hidden');
        }
    }
    _handleCheckBoxChange() {
        if(!this.classList.contains('unable')) {

        }
        if (this.checkbox.checked) {
            this.dispatchEvent(new CustomEvent('item-selected', {
                detail: {
                    product: this.product,
                    variationIndex: this.selectedVariation
                },
                bubbles: true
            }));
            
            this.classList.add('selected')
            this.quantContainer?.classList.remove('hidden');
        } else {
            this.dispatchEvent(new CustomEvent('item-unselected', {
                detail: {
                    productId: this.product.id,
                    variationIndex: this.selectedVariation
                },
                bubbles: true
            }));
            
            this.classList.remove('selected');
            this.quantContainer?.classList.add('hidden');
        }
    }
    _handleVariationOptionClick(button, event) {
        event.preventDefault()

        this.variationsButtons.forEach(button => {
            // Desativa todas as opções
            button.disabled = false
        });
        // Ativa a opção clicada
        button.disabled = true;
        this.selectedVariation = parseInt(button.dataset.index);
        
        //this.dataset.selected = button.id.slice(-1);
        
        this.classList.remove('unable');
        
        if (this.checkbox?.checked) {
            this.dispatchEvent(customEvent('item-updated', {
                detail: {
                    product: this.product,
                    variationIndex: this.selectedVariation
                },
                bubbles: true
            }))
        }
        this.priceLabel.textContent = `R$${button.value}`;
    }
}
customElements.define("catalog-item", CatalogItem, {extends: "li"});

/* document.addEventListener('DOMContentLoaded', function() {
    // Renderiza listContainer no elemento '.product-list'
    const list = new Catalog(document.querySelector('.products-list'));
    list.renderList();
}) */