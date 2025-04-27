
/* CONSTANTES */
const products = [
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

function createProductsItems(list) {
    products.forEach((product) => {
        // Para cada produto, cria-se um elemento HTML
        const item = product.createHTMLElement();
        
        // Atribui valores importantes para o item 
        item.dataset.id = product.id;
        item.dataset.name = product.name;
        item.dataset.price = product.price; 

        // Insere o item na lista de produtos
        list.appendChild(item);
    });
}

const listContainer = {
    element: '',
    items: [],
    
    renderList(query) { /* String query */
        /*  FUNÇÃO |renderiza a lista de produtos no documento
            PARAMETROS
                query : (busca) de entrada no Query Selector */

        // Associa elemento ao listContainer
        this.element = document.querySelector(query)

        // Caso não exista
        if (!this.element) {
            /* TODO: revisar documente.createElement */
            this.element = document.createElement('ul')
            this.element.className = query
        }
        // this.element.className = element

        products.forEach((product) => {
            // Para cada produto, cria-se um elemento HTML
            const item = product.createHTMLElement();
            
            // Atribui valores importantes para o item 
            item.dataset.id = product.id;
            item.dataset.name = product.name;
            item.dataset.price = product.price; 
    
            // Insere o item na lista de produtos
            this.items.push(item);
            this.element.appendChild(item);
        });
        console.log('LOG: Lista de Produtos Gerada com sucesso');
    }
}
function selectOption(radio) {
    // Busca o item pai do subitem
    const itemContainer = radio.closest('.product-item');

    // Busca o checkbox do item pai
    const itemCheckbox = itemContainer.querySelector('.select-item-check');

    // Atribui o preço ao a label do item pai
    const selectedPrice = radio.dataset.price;
    itemContainer.querySelector('.select-item-label').textContent = 'R$' + selectedPrice

    // Permite seleção no checkbox
    itemCheckbox.disabled = false;

    // Atribui ele como selecionado
    itemContainer.classList.add('selected');

    // Remove class de 'unable'
    itemContainer.classList.remove('unable');
}
document.addEventListener('DOMContentLoaded', function() {
    // Renderiza listContainer no elemento '.product-list'
    listContainer.renderList('.products-list');

    /* Enable multi-option item */

    // Pega todos os checkboxes que pretendo colocar a função
    const checkboxesElements = document.querySelectorAll(`.${Product.CLASSNAME}-check`);
    const itemPicturesElements = document.querySelectorAll(`.${Product.CLASSNAME}-picture`);

    const itemContainerElements = document.querySelectorAll('.products-list>li');

    const subOptionButtons = document.querySelectorAll('.sub-option-button')




    itemContainerElements.forEach(element => {

        element.classList.add('product-item');
        
        const picture = element.querySelector(`.${Product.CLASSNAME}-picture`);
        const checkbox = element.querySelector(`.${Product.CLASSNAME}-check`)
        const buttons = element.querySelectorAll('.sub-option-button');
        const countContainer = element.querySelector('.quant-count-container');

        const hasSelectedOption = element.querySelector('.sub-option-button')
        
        if (hasSelectedOption && !hasSelectedOption.disabled) {
            element.classList.add('unable');
        }

        // Adiciona o evento listener para quando clicarem na image
        picture.addEventListener('click', function () {
            // Ativa ou desativa class "selected" de li
            if (!element.classList.contains("unable")) {
                element.classList.toggle('selected');
                countContainer.classList.toggle('hidden');
            }

        })

        // Adiciona o event listener para quando o checkbox mudar
        checkbox.addEventListener('change', function () {
            if (!element.classList.contains("unable")) {
                if (this.checked) // Se ele estiver "marcado"
                    // O li deverá ser selecionado
                    element.classList.add('selected');
                else 
                    // Caso contrário li deverá ser desselecionado
                    element.classList.remove('selected');
                countContainer.classList.toggle('hidden');
            }
        })

        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault()

                buttons.forEach((button) => button.disabled = false);
                
                button.disabled = true;

                element.classList.remove('unable')
                element.querySelector('.product-item-label').textContent = `R$${button.value}`;
            })
        });

    })

})