class Product {
    static INDEX = 0;
    static CLASSNAME = 'product-item';

    constructor({name, basePrice, variations = []}) {
        Product.INDEX++;
        this.id = Product.INDEX;
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
        return Product.INDEX;
    }

    createHTMLElement() {
        const li = document.createElement('li')

        li.id = `${this.id}`
        li.name = `${this.slug}` 
        li.className = `${Product.CLASSNAME} ${this.slug}-item`;

        li.innerHTML = `
        <figure>
            <img
                class="${Product.CLASSNAME}-picture" 
                src="https://placehold.co/240x240"/>
        </figure>
        <h3>${this.name}</h3>
        `

        if (this.hasVariations) {
            /* li.innerHTML += `
            <ul class="select-item list-sub-options">
                <li>
                    <input 
                        type="radio"
                        name="${this.slug}-option"
                        data-price="${this.variations[0].price}" />
                    <label class="select-item sub-option-label">
                        ${this.variations[0].name}
                        <span>R$${this.variations[0].price}</span>
                    </label>
                </li>
                            <li>
                    <input 
                        type="radio"
                        name="${this.slug}-option"
                        data-price="${this.variations[1].price}" />
                    <label class="select-item sub-option-label">
                        ${this.variations[1].name}
                        <span>R$${this.variations[1].price}</span>
                    </label>
                </li>
            </ul>
            <label class="select-item-label">R$${this.price}</label>
            ` */
            li.innerHTML += `
                <ul class="${Product.CLASSNAME} sub-options-list">
            `
            this.variations.forEach((variation, i) => {
                li.innerHTML += `
                     <li class="${Product.CLASSNAME} sub-option-item">
                        <button
                            type="button"
                            id="option-${i}"
                            name="${this.slug}-${variation.name}"
                            class="${Product.CLASSNAME} sub-option-button">
                            ${variation.name}
                            <span>R$${variation.price}</span>
                        </button>
                    </li>
                `
            });
            li.innerHTML += `
                </u>
                <label class="${Product.CLASSNAME}-label">R$${this.price}</label>
            `
        } else {
            li.innerHTML += `
            <label class="${Product.CLASSNAME}-label">R$${this.price}</label>
            `
        }

        li.innerHTML += `
        <input 
            name="${this.slug}-item"
            class="${Product.CLASSNAME}-check"
            type="checkbox" />
        `

        return li;
    }
}