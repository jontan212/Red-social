// Declaración de  variables
const btn_like = document.getElementById('btn-like');
const id_likes = btn_like.dataset.id;
let likes_count = document.querySelector('.likes-count');

btn_like.addEventListener('click', () => {

    const config = {
        method: 'POST'
    };
    
    fetch('/bulo/' + id_likes + '/like', config)
        .then(response => {
            return response.json();
        })
        .then(data => {
            likes_count.innerHTML = data.likes
        })
});