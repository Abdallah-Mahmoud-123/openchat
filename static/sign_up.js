let nameInput = document.getElementById('nameInput');
let passwordInput = document.getElementById('passwordInput');
let emailInput = document.getElementById('emailInput');
let button = document.querySelector('button[type="submit"]');
let maleRadio = document.getElementById('male');
let femaleRadio = document.getElementById('female');
document.addEventListener('DOMContentLoaded', function () {
    checkInputs();
});
function checkInputs() {
    if (nameInput.value.length > 0 && passwordInput.value.length <= 10 && passwordInput.value.length >= 8 && !passwordInput.value.includes(' ') && emailInput.value.includes('@') && emailInput.value.includes('.') && emailInput.value.length > 5 && (maleRadio.checked || femaleRadio.checked) && nameInput.value.length < 12) {
        button.disabled = false;
        button.style.backgroundColor = 'blue';
        button.style.cursor = 'pointer';
    } else {
        button.disabled = true;
        button.style.backgroundColor = 'gray';
        button.style.cursor = 'not-allowed';
    }
}

async function signUp() {
    let name = nameInput.value.trim();
    let password = passwordInput.value.trim();
    let email = emailInput.value.trim();
    let gender = maleRadio.value.trim();

    let response = await fetch('/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            password: password,
            email: email,
            gender: gender
        })
    });

    let data = await response.json();
    document.getElementById('message').innerText = data.msg;

}


function checkSignIn() {
    if (nameInput.value.length > 0 && passwordInput.value.length <= 10 && passwordInput.value.length >= 8 && !passwordInput.value.includes(' ')) {
        button.disabled = false;
        button.style.backgroundColor = 'blue';
        button.style.cursor = 'pointer';
    } else {
        button.disabled = true;
        button.style.backgroundColor = 'gray';
        button.style.cursor = 'not-allowed';
    }
}