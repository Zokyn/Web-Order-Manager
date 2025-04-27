class Product {
    static INDEX = 0;
    static CLASSNAME = 'product-item';

    constructor({name, basePrice, variations = []}) {
        Product.INDEX++;
        this.id = Product.INDEX;
        this.name = name; 
        this.basePrice = basePrice;
        this.variations = variations.map(variation => new Product({
            name: variation.name,
            basePrice: variation.price
        }));
    }

    get hasVariations() {
        return this.variations.length > 0;
    }

    get price() {
        let price;
        if (this.hasVariations) {
            price = [
                Number(this.variations[0].basePrice).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits:  2
                }),
                Number(this.variations[1].basePrice).toLocaleString('pt-BR', {
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
        <input 
            name="${this.slug}-item"
            class="${Product.CLASSNAME}-check"
            type="checkbox" />
        `

        li.innerHTML += `
        <figure>
            <img
                class="${Product.CLASSNAME}-picture" 
                src="https://placehold.co/240x240"/>
        </figure>
        <h3>${this.name}</h3>
        `

        if (this.hasVariations) {
            const divOptionList = document.createElement("div");
            divOptionList.className = `${Product.CLASSNAME} sub-options-list`;

            this.variations.forEach((variation, i) => {
                divOptionList.innerHTML += `
                    <button
                        type="button"
                        id="option-${i}"
                        name="${this.slug}-${variation.name}"
                        class="${Product.CLASSNAME} sub-option-button"
                        value="${variation.price}"
                        >
                        ${variation.name}
                        <span>R$${variation.price}</span>
                    </button>
                `
            });
            
            li.appendChild(divOptionList)

            li.innerHTML += `
            <label class="${Product.CLASSNAME}-label">R$${this.price}</label>
            `
        } else {
            li.innerHTML += `
            <label class="${Product.CLASSNAME}-label">R$${this.price}</label>
            `
            li.innerHTML += `
            <div class="quant-count-container">
                <button
                    id="item-${this.id}-add"
                    class="count-button"
                    type="button">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <input 
                    id="item-${this.id}-quant"
                    value="1"
                    class="count-input"
                    type=["number"] />
                <button
                    id="item-${this.id}-remove"
                    class="count-button"
                    type="button">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>
            `
        }


        return li;
    }
}