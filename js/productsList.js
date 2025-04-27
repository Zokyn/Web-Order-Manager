
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

class ProductItem {
    constructor({product, quantity}) {
        this.product = product;
        this.quantity = quantity
    }

    get subTotalPrice() {
        return this.product.price * this.quantity; 
    }
}

class Catalog {

}

class Order {
    constructor({customer}){
        this._id = this.id;
        this.customer = customer;
        this.products = [];
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
            throw new Error('ERROR: Quantidade do produto deve ser maior que zero');
        }

        const foundItem = this.products.find(item => {
            item.product.name === newProduct.name
        });

        if (foundItem) {
            foundItem.quantity += newQuantity
        } else {
            this.products.push(new ProductItem(newProduct, newQuantity));
        }

        console.log(`Adicionado ${quantidade}x ${produto.nome} ao pedido`);
    }
    removeProduct(productId, quantity = 1) {
        const itemIndex = this.products.find((item) => {
            item.product.id === productId
        })
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

document.addEventListener('DOMContentLoaded', function() {
    // Busca o elemento de lista de produtos
    const listContainer = document.querySelector('.products-list');

    // Gera todos os items dentro da lista de produtos
    createProductsItems(listContainer);

    /* Enable multi-option item */

    // Pega todos os checkboxes que pretendo colocar a função
    const checkboxesElements = document.querySelectorAll('.select-item-check');
    const itemPicturesElements = document.querySelectorAll('.select-item-picture');
    const itemContainerElements = document.querySelectorAll('.products-list>li');

    const itemSubOptionElements = document.querySelectorAll('.select-item.sub-options input[type="radio"]')

    // Transforma esse objeto de checkboxes em um array
    const checkboxesList = Array.from(checkboxesElements);
    const itemPicturesList = Array.from(itemPicturesElements);
    const itemContainerList = Array.from(itemContainerElements);

    const itemSubOptionsList = Array.from(itemSubOptionElements);


    itemContainerList.forEach(container => {
        container.classList.add('product-item')
        const hasSelectedRadio = container.querySelector('.sub-options input[type="radio"]')
        if (hasSelectedRadio && !hasSelectedRadio.checked) {
            container.classList.add('unable');
            container.querySelector('.select-item-check').disabled = true;
        }
        container.addEventListener('click', function () {
            if (!this.classList.contains("unable"))
                this.classList.toggle('selected');
        })
    })

    // Visita cada image do item e adiciona um eventlistener da função
    itemPicturesList.forEach(picture => {
        // Adiciona o evento listener para quando clicarem na image
        picture.addEventListener('click', function () {
            // Vai até o element ovô (li) e ativa ou desativa class "selected"
            if (!this.parentElement.parentElement.classList.contains("unable"))
                this.parentElement.parentElement.classList.toggle('selected');
        })
    })

    // Visita cada checkbox e adiciona um eventlistener da função
    checkboxesList.forEach(checkbox => {
        // Adiciona o event listener para quando o checkbox mudar
        checkbox.addEventListener('change', function () {
            if (this.checked) // Se ele estiver "marcado"
                // O elemento pai (li) deverá ser selecionado
                this.parentElement.classList.add('selected');
            else 
                // Caso contrário o elemento pai deverá ser desselecionado
                this.parentElement.classList.remove('selected');
        })
    })

    // Adiciona eventListener para cada subitem(radio)
    itemSubOptionsList.forEach(subItem => {
        // Caso um dos radio button seja selecionado
        subItem.addEventListener('change', function () {
            // Busca o item pai do subitem
            const itemContainer = this.closest('.product-item');

            // Busca o checkbox do item pai
            const itemCheckbox = itemContainer.querySelector('.select-item-check');

            // Atribui o preço ao a label do item pai
            const selectedPrice = this.dataset.price;
            itemContainer.querySelector('.select-item-label').textContent = 'R$' + selectedPrice

            // Permite seleção no checkbox
            itemCheckbox.disabled = false;

            // Atribui ele como selecionado
            itemContainer.classList.add('selected');

            // Remove class de 'unable'
            itemContainer.classList.remove('unable');
        })
    })
})