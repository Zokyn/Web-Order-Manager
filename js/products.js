class Product {
    static INDEX = 0;

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

    getVariationPrice(index) {
        return this.variations[index].basePrice;
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

    get HTMLElement() {
        return CatalogItem(this);
    }
}