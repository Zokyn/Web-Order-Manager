/* Carousel Index */
let currentIndex = 0; 

function createProductsCards(track) {
    HIGHLIGHTS.forEach((produto, index) => {
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

        track.appendChild(card);
    })
}

function backwardCarousel(items, dots, container, track) {
    const totalItems = items.length;
    /* novoIndex = (indexAtual - 1 + total) % total
    * Isso garante que o novoIndex nunca vai ser menor que 0
    * pois sempre é somado o total de items e caso o valor da
    * seja igual o total, não há resto na divisão. Retorna 0  
    */
    currentIndex = (currentIndex - 1 + totalItems) % totalItems
    updateCarousel(items, dots, container, track)
}

function forwardCarousel(items, dots, container, track) {
    const totalItems = items.length;
    /* novoIndex =  (indexAtual + 1) % total
     * Se `novoIndex` == totalItems, retorna 0 
     * Em outras palavras se novoIndex for divisível ele retorna 0  
     */
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel(items, dots, container, track)
}
function updateCarousel(items, dots, container, track) {
    items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'inactive');

        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === (currentIndex - 1)) {
            item.classList.add('prev');
        } else if (index === (currentIndex + 1)) {
            item.classList.add('next');
        } else { 
            item.classList.add('inactive');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.remove('active');

        if (index === currentIndex) {
            dot.classList.add('active');
        }
    })

    const activeItem = items[currentIndex]; 

    const containerWidth = container.offsetWidth
    const itemWidth = activeItem.offsetWidth;
    
    
    const gap = parseInt(getComputedStyle(track).gap) || 32;

    const offset = (containerWidth/2) - (itemWidth/2) -((itemWidth + gap)*currentIndex);

    track.style.transform = `translateX(${offset}px)`;
}

/* --- Carousel --- */
document.addEventListener('DOMContentLoaded', function() {
    // Componentes do Carousel 
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track'); 
    const dotsContainer = document.querySelector('.dots-container');

    // Cria os itens (card) dentro do Carousel a partir dos destaques
    createProductsCards(carouselTrack) 

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
        dot.addEventListener('click', () => dotUpdateCarousel(cards, carouselContainer, carouselTrack, index));
        
        // Insere ele no container de dots
        dotsContainer.appendChild(dot);
    })

    // Seleciona todos os dots
    const dots = document.querySelectorAll('.dot');

    function dotUpdateCarousel(items, container, track, dotIndex) {
        // Remove a class 'active' ao dot ativo
        dots[currentIndex].classList.remove('active');

        // Atualiza o dot selecionado para ser ativo
        dots[dotIndex].classList.add('active');

        // Atualiza o index do cartão atual 
        currentIndex = dotIndex;
        
        // Atualiza carrossel
        updateCarousel(items, dots, container, track)
    }

    // Atualiza Carousel depois de instanciar todos seus componentes
    updateCarousel(cards, dots, carouselContainer, carouselTrack, currentIndex); 

    // Atribui eventListener ao botão de retroceder
    document.querySelector('button.prev').addEventListener('click', () => backwardCarousel(cards, dots, carouselContainer, carouselTrack, currentIndex))

    // Atribui eventListener ao botão de avançar 
    document.querySelector('button.next').addEventListener('click', () => forwardCarousel(cards, dots, carouselContainer, carouselTrack, currentIndex))

    // Atualiza o Carousel caso a janela mude de tamanho 
    window.addEventListener('resize', () => updateCarousel(cards, dots, carouselContainer, carouselTrack));
})