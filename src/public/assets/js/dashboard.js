// Al cargar la página del dashboard
window.addEventListener('load', (event) => {
    const username = localStorage.getItem('username');
    let resultsString = localStorage.getItem('results');
    let results = JSON.parse(resultsString);
    if (username) {
        document.getElementById('username-display').innerText = results[0].username;
        document.getElementById('name-display').innerText = results[0].name.toUpperCase();
        document.getElementById('card-display').innerText = results[0].card;
        document.getElementById('balance-display').innerText = "$"+results[0].balance;
    } else {
        // Si no hay un nombre de usuario en el almacenamiento local,
        // podrías redirigir al usuario de vuelta a la página de login.
        window.location.href = '/login';
    }
});