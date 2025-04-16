document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const themeButton = document.getElementById('theme-button');
    const body = document.body;
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const registerEmailInput = document.getElementById('registerEmail');
    const loginEmailInput = document.getElementById('loginEmail');
    const registerPasswordInput = document.getElementById('registerPassword');
    const loginPasswordInput = document.getElementById('loginPassword');

    function displayError(inputElement, message) {
        const errorSpan = document.createElement('span');
        errorSpan.textContent = message;
        errorSpan.style.color = 'red';
        errorSpan.style.display = 'block';
        inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
    }

    function clearErrors(formElement) {
        const errorSpans = formElement.querySelectorAll('span[style*="color: red"]');
        errorSpans.forEach(span => span.remove());
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors(registerForm);
            const nombre = document.getElementById('registerNombre').value;
            const email = registerEmailInput.value;
            const password = registerPasswordInput.value;
            const password2 = document.getElementById('registerPassword2').value;
            let hasError = false;

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                displayError(registerEmailInput, 'Ingresa tu correo correctamente.');
                hasError = true;
            }

            if (password.length < 6) {
                displayError(registerPasswordInput, 'La contraseña debe tener al menos 6 caracteres.');
                hasError = true;
            }

            if (password !== password2) {
                const password2Input = document.getElementById('registerPassword2');
                displayError(password2Input, 'Las contraseñas no coinciden.');
                hasError = true;
            }

            if (!hasError) {
                const userData = { email: email, password: password };
                localStorage.setItem('usuarioRegistradoData', JSON.stringify(userData));
                localStorage.setItem('usuarioRegistrado', 'true');
                window.location.href = 'login.html';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors(loginForm);
            const loginEmail = loginEmailInput.value;
            const loginPassword = loginPasswordInput.value;
            let hasError = false;

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
                displayError(loginEmailInput, 'Ingresa tu correo correctamente.');
                hasError = true;
            }

            if (loginPassword.length < 6) {
                displayError(loginPasswordInput, 'La contraseña debe tener al menos 6 caracteres.');
                hasError = true;
            }

            if (!hasError) {
                const usuarioRegistradoData = localStorage.getItem('usuarioRegistradoData');
                if (usuarioRegistradoData) {
                    const userData = JSON.parse(usuarioRegistradoData);
                    if (loginEmail === userData.email && loginPassword === userData.password) {
                        window.location.href = 'redes.html';
                    } else {
                        alert('Correo o contraseña incorrectos.');
                    }
                } else {
                    alert('Primero debes registrarte.');
                }
            }
        });
        
        if (localStorage.getItem('usuarioRegistrado') === 'true' && localStorage.getItem('usuarioLogueado') === 'true') {
            window.location.href = 'redes.html';
        }
    }

    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogueado');
            window.location.href = 'login.html';
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }
});
