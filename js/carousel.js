/* Carousel */
export default class Carousel extends HTMLDivElement {    
    constructor(element, products) {
        super();
        this.currentIndex = 0; 
        this.container = element;
        this.track = document.querySelector('.carousel-track'); 
        this.dotsContainer = document.querySelector('.dots-container');
        this._render(products);
    }
    _render(products) {
        if(!this.container) {
            this.container = document.createElement('div');
            this.container.className = '.carousel-container';
        }
        // Componentes do Carousel 
        // Cria os itens (card) dentro do Carousel a partir dos destaques
        this._renderProductsCards(products) 
    
        // Seleciona todas os cartões do carousel 
        const cards = document.querySelectorAll('.product-item');
    
        // Para cada cartão do carousel 
        cards.forEach((_, index) => {
            // Cria um elemento de dot
            const dot = document.createElement('span');
            dot.classList.add('dot'); // e atribui a classe
    
            // Define o primeiro dot como ativo
            if (index === 0)
                dot.classList.add('active');
            
            // Adiciona o eventListener para atualizar o carousel a cada dot
            dot.addEventListener('click', () => this._dotUpdateCarousel(cards, index));
            
            // Insere ele no container de dots
            this.dotsContainer.appendChild(dot);
        })
        this.dots = document.querySelectorAll('.dot');
    
        // Atualiza Carousel depois de instanciar todos seus componentes
        this._updateCarousel(cards); 
    
        // Atribui eventListener ao botão de retroceder
        document.querySelector('button.prev').addEventListener('click', () => this._backwardCarousel(cards))
    
        // Atribui eventListener ao botão de avançar 
        document.querySelector('button.next').addEventListener('click', () => this._forwardCarousel(cards))
    
        // Atualiza o Carousel caso a janela mude de tamanho 
        window.addEventListener('resize', () => this._updateCarousel(cards));
    }
    _renderProductsCards(products) {
        products.forEach((produto, index) => {
            const card = document.createElement('li'); 
    
            card.className = 'product-item';
    
            card.innerHTML = `
                <figure>
                    <img src="${produto.img}" alt="${produto.name}">
                </figure>
                <h3>${produto.name}</h3>
                <label class="price">${produto.price}</label>
            `;
    
            card.dataset.index = index; 
            card.dataset.name = produto.name;
            card.dataset.price = produto.price;
    
            this.track.appendChild(card);
        })
    }
    _dotUpdateCarousel(items, dotIndex) {
        // Remove a class 'active' ao dot ativo
        this.dots[this.currentIndex].classList.remove('active');

        // Atualiza o dot selecionado para ser ativo
        this.dots[dotIndex].classList.add('active');

        // Atualiza o index do cartão atual 
        this.currentIndex = dotIndex;
        
        // Atualiza carrossel
        this._updateCarousel(items)
    }
    _backwardCarousel(items) {
        const totalItems = items.length;
        /* novoIndex = (indexAtual - 1 + total) % total
        * Isso garante que o novoIndex nunca vai ser menor que 0
        * pois sempre é somado o total de items e caso o valor da
        * seja igual o total, não há resto na divisão. Retorna 0  
        */
        this.currentIndex = (this.currentIndex - 1 + totalItems) % totalItems
        this._updateCarousel(items)
    }
    _forwardCarousel(items) {
        const totalItems = items.length;
        /* novoIndex =  (indexAtual + 1) % total
         * Se `novoIndex` == totalItems, retorna 0 
         * Em outras palavras se novoIndex for divisível ele retorna 0  
         */
        this.currentIndex = (this.currentIndex + 1) % totalItems;
        this._updateCarousel(items)
    }
    _updateCarousel(items) {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'inactive');
    
            if (index === this.currentIndex) {
                item.classList.add('active');
            } else if (index === (this.currentIndex - 1)) {
                item.classList.add('prev');
            } else if (index === (this.currentIndex + 1)) {
                item.classList.add('next');
            } else { 
                item.classList.add('inactive');
            }
        });
    
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
    
            if (index === this.currentIndex) {
                dot.classList.add('active');
            }
        })
    
        const activeItem = items[this.currentIndex]; 
    
        const containerWidth = this.container.offsetWidth
        const itemWidth = activeItem.offsetWidth;
        
        
        const gap = parseInt(getComputedStyle(this.track).gap) || 32;
    
        const offset = (containerWidth/2) - (itemWidth/2) -((itemWidth + gap)*this.currentIndex);
    
        this.track.style.transform = `translateX(${offset}px)`;
    }
    
}
customElements.define("carousel-container", Carousel, {extends: "div"});