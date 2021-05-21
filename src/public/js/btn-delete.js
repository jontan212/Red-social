// Declaración de  variables
const btn_delete = document.getElementById('btn-delete');
const id_delete = btn_delete.dataset.id;



btn_delete.addEventListener('click', () => {

    const respuesta = confirm('¿Seguro qué lo quieres borrar?');

    if (respuesta) {
        const config = {
            method: 'DELETE'
        };

        fetch('/bulo/' + id_delete, config)
            .then(response => {
                btn_delete.innerHTML = 'Borrado';
                btn_delete.classList.remove('borrar');
                btn_delete.classList.add('borrado');
            })
    }

});