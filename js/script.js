/* Color Scheme */
let isDark = false; 
/* Carousel Index */
let currentIndex = 0; 
/* Lista de destaques (fake database) */
// import { highlights } from "./highlights";
function createProductsCards(track) {
    highlights.forEach((produto, index) => {
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
function changeColorScheme() {
    document.body.classList.toggle('dark');
    isDark = !isDark;

    localStorage.setItem("theme", isDark ? "dark" : "light");
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

    // Adiciona eventListener para cada subitem(radio)
    itemSubOptionsList.forEach(subItem => {
        // Caso um dos radio button seja selecionado
        subItem.addEventListener('change', function () {
            // Busca o item pai do subitem
            const itemContainer = this.closest('.product-item');

            // Busca o checkbox do item pai
            const itemCheckbox = itemContainer.querySelector('.select-item-check');

            // Atribui o preço ao a label do item pai
            const selectedPrice = this.dataset.price;
            itemContainer.querySelector('.select-item-label').textContent = 'R$' + selectedPrice

            // Permite seleção no checkbox
            itemCheckbox.disabled = false;

            // Atribui ele como selecionado
            itemContainer.classList.add('selected');

            // Remove class de 'unable'
            itemContainer.classList.remove('unable');
        })
    })
});

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
/* Button Change Colors Schema */
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('theme') === 'dark')
        changeColorScheme();

    const changeColorsButton = document.querySelector('#change-color-button');

    changeColorsButton.addEventListener('click', () => changeColorScheme());
})