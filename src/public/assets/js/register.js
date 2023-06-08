    function generateCardNumber() {
        let cardNumber = [];
        let sum = 0;
        let parity = 0;

        // Generate the first 15 digits
        for (let i = 0; i < 15; i++) {
            let digit;
            if (i % 2 == parity) {
                // Double every other digit and subtract 9 if it's greater than 9
                digit = Math.floor(Math.random() * 9) * 2;
                digit = digit > 9 ? digit - 9 : digit;
            } else {
                digit = Math.floor(Math.random() * 9);
            }

            cardNumber.push(digit);
            sum += digit;
        }

        // Generate the check digit
        let checkDigit = (10 - (sum % 10)) % 10;
        cardNumber.push(checkDigit);

        return cardNumber.join('');
    }

    function generateBalance() {
        // Generate a random balance between 0 and 10000
        return (Math.random() * 10000).toFixed(2);
    }

    let cardNumber = generateCardNumber();
    let balance = generateBalance();

    
    document.getElementById('register-form').addEventListener('submit', function(event) {
        // Prevén la recarga de la página
        event.preventDefault();
    
        // Recoge los datos del formulario
        const email = document.getElementById('email').value;
        const name = document.getElementById('nombre').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        // Envía los datos al servidor
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: name,
                username: username,
                card: cardNumber,
                balance: balance,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Haz algo con los datos de respuesta aquí
            if(data.status === "ok")
            {
                Swal.fire("Registrado","Registro existoso!","success").then((result) => {
                    // Check if the user clicked on "OK"
                    if (result.isConfirmed) {
                        window.location.href = "/";
                    }
                });
            }
            else{
                Swal.fire("Error","No se puedo completar el registro!","error");
            }
            
            
            //console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
