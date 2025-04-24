class Product {
    constructor({name, basePrice, variations = []}) {
        this.name = name; 
        this.basePrice = basePrice;
        this.variations = variations.map(variation => ({
            name: variation.name,
            price: variation.price
        }));
    }

    get hasVariations() {
        return this.variations.length > 0;
    }

    get price() {
        let price;
        if (this.hasVariations) {
            price = [
                Number(this.variations[0].price).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits:  2
                }),
                Number(this.variations[1].price).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits:  2
                }),
            ]
        } else {
            price = Number(this.basePrice).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits:  2
            }); 
        }
        return price;
        /* return this.hasVariations ? null : Number(this.basePrice).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits:  2
        }); */
    }

    createHTMLElement() {
        const li = document.createElement('li')

        li.className = 'product-item';

        li.innerHTML = `
        <figure>
            <img
                class="select-item-picture" 
                src="https://placehold.co/240x240"/>
        </figure>
        <h3>${this.name}</h3>
        `

        if (this.hasVariations) {
            li.innerHTML += `
            <ul class="select-item sub-options">
                <li>
                    <input 
                        type="radio"
                        name="${this.name}-subitem"
                        data-price="${this.price[0]}" />
                    <label class="select-item sub-option-label">
                        ${this.variations[0].name}
                        <span>R$${this.price[0]}</span>
                    </label>
                </li>
                            <li>
                    <input 
                        type="radio"
                        name="${this.name}-subitem"
                        data-price="${this.price[1]}" />
                    <label class="select-item sub-option-label">
                        ${this.variations[1].name}
                        <span>R$${this.price[1]}</span>
                    </label>
                </li>
            </ul>
            <label class="select-item-label">R$${this.price[0]}</label>
            `
        } else {
            li.innerHTML += `
            <label class="select-item-label">R$${this.price}</label>
            `
        }

        li.innerHTML += `
        <input 
            class="select-item-check"
            type="checkbox" />
        `

        return li;
    }
}

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