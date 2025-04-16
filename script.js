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

function backwardCarousel(items, container, track) {
    const totalItems = items.length;
    /* novoIndex = (indexAtual - 1 + total) % total
    * Isso garante que o novoIndex nunca vai ser menor que 0
    * pois sempre é somado o total de items e caso o valor da
    * seja igual o total, não há resto na divisão. Retorna 0  
    */
    currentIndex = (currentIndex - 1 + totalItems) % totalItems
    updateCarousel(items, container, track, currentIndex)
}

function forwardCarousel(items, container, track) {
    const totalItems = items.length;
    /* novoIndex =  (indexAtual + 1) % total
     * Se `novoIndex` == totalItems, retorna 0 
     * Em outras palavras se novoIndex for divisível ele retorna 0  */
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel(items, container, track, currentIndex)
}

function updateCarousel(items, container, track) {

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

    const activeItem = items[currentIndex]; 
    const containerWidth = container.offsetWidth
    const itemWidth = activeItem.offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 32;

    const offset = (containerWidth/2) - (itemWidth/2) -(currentIndex * (itemWidth + gap));

    track.style.transform = `translateX(${offset}px)`;
}

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
    /* --- Carousel --- */
/*     let currentSlide = 0;
    const slides = document.querySelectorAll('.card');
    const dotsContainer = document.querySelector('.dots-container');
    const slidesContainer = document.querySelector('.carousel-track');

    // Para cada Card encontrado na pagina cria um dot
    slides.forEach((_, index) => {
        // Dot nada mais é que um span com className dot
        const dot = document.createElement('span');
        dot.classList.add('dot');

        // Se ele for o primeiro da lista, o coloca como ativo
        if (index === 0)
            dot.classList.add('active');

        // Adiciona eventListener para ao clicar e para o card
        dot.addEventListener('click', () => goToSlide(index));

        // Adiciona-o ao container de dots (dotsContainer)
        dotsContainer.appendChild(dot);

    })

    const dots = document.querySelectorAll('.dot');
    console.log(dots)
    function goToSlide(index) {
        // Se o index for 
        if (index >= slides.length) // maior que o numero de slides
            index = 0 // então o index do card deve reiniciar indo a 0
        // Se o index for
        if (index < 0) // menor do que zero 
            index = slides.length - 1; // então index deve ir para o último card
        
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;

        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    document.querySelector('.prev').addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    })

    document.querySelector('.next').addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    })
    
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
    }) 
*/
});


document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track'); 

    createProductsCards(carouselTrack)

    const items = document.querySelectorAll('.product-item');

    updateCarousel(items, carouselContainer, carouselTrack, currentIndex); 

    document.querySelector('button.prev').addEventListener('click', () => backwardCarousel(items, carouselContainer, carouselTrack, currentIndex))

    document.querySelector('button.next').addEventListener('click', () => forwardCarousel(items, carouselContainer, carouselTrack, currentIndex))

    window.addEventListener('resize', updateCarousel);
})