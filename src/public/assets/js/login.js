document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok') {
            // Guardar el nombre de usuario en el almacenamiento local
            localStorage.setItem('username', data.username);
            localStorage.setItem('results', JSON.stringify(data.results));
            console.table(data.results);
            
            // Redirigir a la página del dashboard
            window.location.href = '/dashboard';
        } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message
            });
        }
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error en el servidor. Por favor intente nuevamente.',
        });
    });
});