class Product {
    constructor({id, name, price, variations = []}) {
        this.id = id;
        this.name = name; 
        this.price = price;
        this.variations = variations.map(variation => ({
            name: variation.name,
            price: variation.price
        }));
    }

    get hasVariations() {
        return this.variations.length > 0;
    }

    get price() {
        return this.hasVariations ? null : this.price;
    }
}

const products = [
    new Product({
        id: 1,
        name: "Agulhinha",
        price: 80
    }),
    new Product({
        id: 2,
        name: "Patinha de Caranguejo",
        variations: [
            { name: "Com Casca", price: 105 },
            { name: "Sem Casca", price: 150 }
        ]
    }),
    new Product({
        id: 3,
        name: "Camarão",
        variations: [
            { name: "Com Casca", price: 50 },
            { name: "Sem Casca", price: 85 }
        ]
    }),
    new Product({
        id: 4,
        name: "Camarão Pistola",
        variations: [
            { name: "Com Casca", price: 85 },
            { name: "Sem Casca", price: 145 }
        ]
    }),
    new Product({
        id: 5,
        name: "Siri",
        price: 80
    }),
    new Product({
        id: 6,
        name: "Aratu",
        price: 80
    }),
    new Product({
        id: 7,
        name: "Mariscada",
        price: 68
    }),
    new Product({
        name: "Caranguejo",
        price: 80
    }),
    new Product({
        name: "Polvo",
        price: 80
    }),
    new Product({
        name: "Cavala",
        price: 45
    }),
    new Product({
        name: "Badejo",
        price: 65
    }),
    new Product({
        name: "Vermelho",
        price: 55
    }),
    new Product({
        name: "Pescada Amarela",
        price: 45
    }),
    new Product({
        name: "Robalo",
        price: 65
    }),
    new Product({
        name: "Robalinho",
        price: 50
    }),
    new Product({
        name: "Arraia",
        price: 30
    }),
    new Product({
        name: "Filé de Badejo",
        price: 106
    }),
    new Product({
        name: "Filé de Tilápia",
        price: 68
    })
]