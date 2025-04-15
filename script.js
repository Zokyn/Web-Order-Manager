function checkAddItem(checkbox) {

}

document.addEventListener("DOMContentLoaded", () => { 
    // Pega todos os checkboxes que pretendo colocar a função
    const checkboxesElements = document.querySelectorAll('.select-item-check');
    const itemPicturesElements = document.querySelectorAll('.select-item-picture');
    const itemContainerElements = document.querySelectorAll('.products-list li');

    // Transforma esse objeto de checkboxes em um array
    const checkboxesList = Array.from(checkboxesElements);
    const itemPicturesList = Array.from(itemPicturesElements);
    const itemContainerList = Array.from(itemContainerElements);

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
    // Visita cada image do item e adiciona um eventlistener da função
    itemPicturesList.forEach(picture => {
        // Adiciona o evento listener para quando clicarem na image
        picture.addEventListener('click', function () {
            // Vai até o element ovô (li) e ativa ou desativa class "selected"
            this.parentElement.parentElement.classList.toggle('selected');
        })
    })

    itemContainerList.forEach(container => {

        container.addEventListener('click', function () {
            this.classList.toggle('selected');
        })
    })
});