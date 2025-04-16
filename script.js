/* Carousel Index */
let currentIndex = 0; 
/* Lista de Produtos (fake database) */
const produtos = [
    { nome: "Agulhinha", preco: "R$80,00", img: "https://placehold.co/200x300" },
    { nome: "Patinha de Caranguejo", preco: "R$105,00", img: "https://placehold.co/200x300" },
    { nome: "Camarão", preco: "R$85,00", img: "https://placehold.co/200x300" },
    { nome: "Camarão Pistola", preco: "R$145,00", img: "https://placehold.co/200x300" },
    { nome: "Siri", preco: "R$80,00", img: "https://placehold.co/200x300" },
    { nome: "Aratu", preco: "R$80,00", img: "https://placehold.co/200x300" }
];

function createProductsCards(track) {
    produtos.forEach((produto, index) => {
        const card = document.createElement('li'); 

        card.className = 'product-item';

        card.innerHTML = `
            <figure>
                <img src="${produto.img}" alt="${produto.nome}">
            </figure>
            <h3>${produto.nome}</h3>
            <label class="price">${produto.preco}</label>
        `;

        card.dataset.index = index; 
        card.dataset.name = produto.nome;
        card.dataset.price = produto.preco;

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
        item.classList.remove('active', 'prev', 'next');
        
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === (currentIndex - 1)) {
            item.classList.add('prev');
        } else if (index === (currentIndex + 1)) {
            item.classList.add('next');
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

    const offset = (containerWidth/2) - (itemWidth/2) -(currentIndex * (itemWidth + gap));

    track.style.transform = `translateX(${offset}px)`;
}

/* Enable multi-option item */
document.addEventListener("DOMContentLoaded", () => { 
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

    itemSubOptionsList.forEach(subItem => {
        subItem.addEventListener('change', function () {
            const itemContainer = this.closest('.product-item');
            console.log(itemContainer)

            const itemCheckbox = itemContainer.querySelector('.select-item-check');
            console.log(itemCheckbox)

            const selectedPrice = this.dataset.price;
            itemContainer.querySelector('.select-item-label').textContent = 'R$' + selectedPrice

            itemCheckbox.disabled = false;

            itemContainer.classList.add('selected');
            itemContainer.classList.remove('unable');
        })
    })
});

/* --- Carousel --- */
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track'); 
    const dotsContainer = document.querySelector('.dots-container');

    createProductsCards(carouselTrack)

    const cards = document.querySelectorAll('.product-item');

    cards.forEach((_, index) => {
        
        const dot = document.createElement('span');
        dot.classList.add('dot');

        if (index === 0)
            dot.classList.add('active');

        dot.addEventListener('click', () => dotUpdateCarousel(cards, carouselContainer, carouselTrack, index));
        
        dotsContainer.appendChild(dot);
    })

    const dots = document.querySelectorAll('.dot');

    function dotUpdateCarousel(items, container, track, dotIndex) {
        dots[currentIndex].classList.remove('active');

        dots[dotIndex].classList.add('active');

        currentIndex = dotIndex;
    
        updateCarousel(items, dots, container, track)
    }

    updateCarousel(cards, dots, carouselContainer, carouselTrack, currentIndex); 

    document.querySelector('button.prev').addEventListener('click', () => backwardCarousel(cards, dots, carouselContainer, carouselTrack, currentIndex))

    document.querySelector('button.next').addEventListener('click', () => forwardCarousel(cards, dots, carouselContainer, carouselTrack, currentIndex))

    window.addEventListener('resize', updateCarousel);

    /*     
    let autoplay = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);

    document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });

    document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
        autoplay = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000)
    })  */
})