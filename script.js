const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('comfirmpassword');
const strengthIndicator = document.getElementById("password-strength");

// Disable confirm password input initially
confirmpassword.disabled = true;

const levels = {
    1: "Very Weak",
    2: "Weak",
    3: "Medium",
    4: "Strong",
};

const colors = {
    1: "red",          // Very Weak
    2: "yellow",       // Weak
    3: "lightgreen",   // Medium
    4: "green"         // Strong
};

function checkPwdStrength(pwd,confirmpassword,min,max) {
    console.log(pwd.value);
    const confirmpasswordParent = confirmpassword.parentElement;

    const colors = ["red", "orange", "yellow", "green", "darkgreen"];
    const checks = [
        /[a-z]/,     // Lowercase letter
        /[A-Z]/,     // Uppercase letter
        /\d/,        // Digit
        /[@.#$!%^&*?_]/ // Special character
    ];

    if(pwd.value !== ""){
        document.getElementById('strength').style.display = 'block';
    } 
    let score = checks.reduce((acc, regex) => acc + regex.test(pwd.value), 1);

    if (pwd.value.length >= 12 && pwd.value.length <= max) {
        score++;
    }else if (pwd.value.length < min || pwd.value.length > max) {
        score = 1;
    }

    const loadingbar = document.getElementById("loading-bar");
    loadingbar.style.width = (score * 20) + "%"; // Maximum width: 100%
    loadingbar.style.backgroundColor = colors[score-1]; 

    if(score > 3) {
        confirmpasswordParent.style.display = "block"
        confirmpassword.disabled = false;
    }
    else confirmpasswordParent.style.display = 'none';
}


// Show error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email validity
function checkEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.value.trim().toLowerCase())) {
        showError(email, 'Email is not Valid!');
    } else {
        showSuccess(email);
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            let message = (input.id === "comfirmpassword") ? `Enter Password Again!` : `${getFieldName(input)} is required!`;
            showError(input, message);
        } else {
            showSuccess(input);
        }
    });
}

function checkPasswordsMatch(pass1, pass2) {
    if (pass1.value !== pass2.value) {
        showError(pass2, 'Passwords Do Not Match!');
    }
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} is less than ${min} characters.`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} is greater than ${max} characters.`);
    } else {
        showSuccess(input);
    }
}

password.addEventListener('input', () => {
    checkPwdStrength(password,confirmpassword,6,25);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkRequired([username, email, password, confirmpassword]);
    checkLength(username, 6, 25);
    checkEmail(email);
    checkLength(password, 6, 18);
    checkPasswordsMatch(password, confirmpassword);
});
