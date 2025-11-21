// Scripts/site.js
function initializeValidation() {
    var form = document.getElementById("registrationForm");
    if (!form) return;

    form.onsubmit = function (event) {
        clearErrors();

        var isValid = true;
        var name = document.getElementById("Name").value.trim();
        var email = document.getElementById("Email").value.trim();
        var password = document.getElementById("Password").value;
        var confirmPassword = document.getElementById("ConfirmPassword").value;

        // Проверка имени
        if (!name) {
            showError("nameError", "Имя обязательно для заполнения");
            isValid = false;
        }

        // Проверка email
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError("emailError", "Email обязателен для заполнения");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            showError("emailError", "Введите корректный email адрес");
            isValid = false;
        }

        // Проверка пароля
        if (!password) {
            showError("passwordError", "Пароль обязателен для заполнения");
            isValid = false;
        } else if (password.length < 6) {
            showError("passwordError", "Пароль должен содержать минимум 6 символов");
            isValid = false;
        }

        // Проверка подтверждения пароля
        if (!confirmPassword) {
            showError("confirmPasswordError", "Подтверждение пароля обязательно");
            isValid = false;
        } else if (password !== confirmPassword) {
            showError("confirmPasswordError", "Пароли не совпадают");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }

        return isValid;
    };

    function showError(elementId, message) {
        var errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }

    function clearErrors() {
        var errorElements = document.querySelectorAll('.field-validation-error');
        for (var i = 0; i < errorElements.length; i++) {
            errorElements[i].textContent = '';
            errorElements[i].style.display = 'none';
        }
    }

    // Очистка ошибок при вводе
    var nameField = document.getElementById('Name');
    var emailField = document.getElementById('Email');
    var passwordField = document.getElementById('Password');
    var confirmPasswordField = document.getElementById('ConfirmPassword');

    if (nameField) {
        nameField.addEventListener('input', function () {
            var errorElement = document.getElementById('nameError');
            if (errorElement) errorElement.style.display = 'none';
        });
    }

    if (emailField) {
        emailField.addEventListener('input', function () {
            var errorElement = document.getElementById('emailError');
            if (errorElement) errorElement.style.display = 'none';
        });
    }

    if (passwordField) {
        passwordField.addEventListener('input', function () {
            var errorElement1 = document.getElementById('passwordError');
            var errorElement2 = document.getElementById('confirmPasswordError');
            if (errorElement1) errorElement1.style.display = 'none';
            if (errorElement2) errorElement2.style.display = 'none';
        });
    }

    if (confirmPasswordField) {
        confirmPasswordField.addEventListener('input', function () {
            var errorElement = document.getElementById('confirmPasswordError');
            if (errorElement) errorElement.style.display = 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeValidation);