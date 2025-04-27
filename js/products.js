class Product {
    static index = 0;

    constructor({name, basePrice, variations = []}) {
        Product.index++;
        this.id = Product.index;
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
            price = price[0];
        } else {
            price = Number(this.basePrice).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits:  2
            }); 
        }
        return price;
    }

    get slug() {
        // Usando regex para encontra qualquer tipo de espaço vazio
        /* 
            Regex
            / * /g  escape de regex
            \s      qualquer espaço vazio
            \s+     um ou mais qualquer espaço vazio
        */
        return this.name.trim().replace(/\s+/g, "-").toLowerCase();
    }

    static get totalCount() {
        return Product.index;
    }

    createHTMLElement() {
        const li = document.createElement('li')

        li.id = `item-${this.id}`
        li.name = `item-${this.slug}` 
        li.className = `product-item item-${this.slug}`;

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
                        name="${this.slug}-subitem"
                        data-price="${this.variations[0].price}" />
                    <label class="select-item sub-option-label">
                        ${this.variations[0].name}
                        <span>R$${this.variations[0].price}</span>
                    </label>
                </li>
                            <li>
                    <input 
                        type="radio"
                        name="${this.slug}-subitem"
                        data-price="${this.variations[1].price}" />
                    <label class="select-item sub-option-label">
                        ${this.variations[1].name}
                        <span>R$${this.variations[1].price}</span>
                    </label>
                </li>
            </ul>
            <label class="select-item-label">R$${this.price}</label>
            `
        } else {
            li.innerHTML += `
            <label class="select-item-label">R$${this.price}</label>
            `
        }

        li.innerHTML += `
        <input 
            name="${this.slug}-item"
            class="select-item-check"
            type="checkbox" />
        `

        return li;
    }
}