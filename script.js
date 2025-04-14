function checkAddItem(checkbox) {

}

document.addEventListener("DOMContentLoaded", () => { 
    // Pega todos os checkboxes que pretendo colocar a função
    const checkboxesElements = document.querySelectorAll('.select-item-check');

    // Transforma esse objeto de checkboxes em um array
    const checkboxesList = Array.from(checkboxesElements);
    console.log(checkboxesList)
    // Visita cada checkbox e adiciona um eventlistener da função
    checkboxesList.forEach(checkbox => {
        console.log(checkbox)
        checkbox.addEventListener('change', function (checkbox) {
            if (this.checked)
                this.parentElement.classList.add('selected');
            else 
                this.parentElement.classList.remove('selected');
        })
    })
});