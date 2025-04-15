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
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots-container');
    const slidesContainer = document.querySelector('.slides-container');

    // Para cada Slide encontrado na pagina cria um dot
    slides.forEach((_, index) => {
        if(index%3 == 0) {
            // Dot nada mais é que um span com className dot
            const dot = document.createElement('span');
            dot.classList.add('dot');

            // Se ele for o primeiro da lista, o coloca como ativo
            if (index === 0)
                dot.classList.add('active');

            // Adiciona eventListener para ao clicar e para o slide
            dot.addEventListener('click', () => goToSlide(index));

            // Adiciona-o ao container de dots (dotsContainer)
            dotsContainer.appendChild(dot);
        }

    })

    const dots = document.querySelectorAll('.dot');
    console.log(dots)
    function goToSlide(index) {
        // Se o index for 
        if (index >= slides.length/3) // maior que o numero de slides
            index = 0 // então o index do slide deve reiniciar indo a 0
        // Se o index for
        if (index < 0) // menor do que zero 
            index = slides.length - 1; // então index deve ir para o último slide
        
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

    document.querySelector('index-carousel').addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });

    document.querySelector('index-carousel').addEventListener('mouseleave', () => {
        autoplay = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000)
    })
});
