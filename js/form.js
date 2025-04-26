document.addEventListener('DOMContentLoaded', function() { 
    const resetButton = document.querySelector('button[type="reset"]');
    resetButton.disabled = true;

    const form = document.querySelector('form');

    const inputsElements = document.querySelectorAll('[name*="-input"');
    const errorsElements = document.querySelectorAll('[name*="-error"');
    console.log(inputsElements)
    console.log(errorsElements)

    errorsElements.forEach((error) => {
        error.classList.add('hidden');
    })

    
    form.addEventListener('submit', (e) => {
        e.preventDefault;
    })

    form.addEventListener('input', () => {
        resetButton.disabled = false;
    })

    inputsElements.forEach((input, index) => {
        input.addEventListener('invalid', (e) => {
            errorsElements[index].classList.remove('hidden')
        })
    })
});