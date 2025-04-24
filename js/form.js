document.addEventListener('DOMContentLoaded', function() {
    errorsElements = document.querySelectorAll('.error');

    errorsElements.forEach((error) => {
        error.classList.add('hidden');
    })
});