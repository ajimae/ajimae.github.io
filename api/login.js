/**
** Created by ajima chukwuemeka
*/

const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const signinButtonElement = document.getElementById('login');
const successElement = document.getElementById('success');
let errorCount = 0;

const checkEmail = (email, element) => {
    // Reference => https://stackoverflow.com/questions/20301237/javascript-form-validating-e-mail-address-and-checking-another-field-with-star
    const emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if(email === '' || !email.replace(/\s/g, '').length || !emailFilter.test(email)) {
        errorCount++;
        element.style.border = '1px solid #e64a4a';
    }else {
        element.style.border = '1px solid #06b506';
    }
}

const checkOthers = (value, element) => {
    if(value === '' || !value.replace(/\s/g, '').length) {
        errorCount++;
        element.style.border = '1px solid #e64a4a';
    }else {
        element.style.border = '1px solid #06b506';
    }
}

const loginUser = (details) => {
    const url = 'https://ajimae.herokuapp.com/api/v1/auth/login';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(details)
    })
    .then(response => response.json()).then((data) => {
        console.log(data);
        if(data.success) {
            signinButtonElement.removeAttribute('disabled');
            successElement.style.display = 'block';
            successElement.style.color = '#fff';
            successElement.style.fontSize = '15px';
            successElement.innerHTML = 'Login was successful....Redirecting to activity page';
            localStorage.setItem('token', data.token);
            setTimeout(() => {
                successElement.innerHTML = 'Redirecting...';
                window.location.href = window.location.protocol + '//' + window.location.hostname + '/activity.html';
            }, 3000);
        }else if(data.error) {
            signinButtonElement.removeAttribute('disabled');
            signinButtonElement.value = 'Sign in';
            successElement.style.display = 'block';
            
            successElement.style.color = '#fff';
            successElement.style.fontSize = '15px';
            successElement.innerHTML = data.error;
            console.log(data.error);
        }
    }).catch((error) => {
        console.log('Request failed', error);
    });
}

const checkInput = () => {
    errorCount = 0;
    const email = emailElement.value;
    const password = passwordElement.value;
    
    checkEmail(email, emailElement);
    checkOthers(password, passwordElement);
    
    if(errorCount > 0) {
        successElement.style.color = 'red';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = 'The field(s) with red borders are either empty, invalid.';
        return false;
    }else {
        successElement.style.display = 'none';
    }
    
    signinButtonElement.setAttribute('disabled', '');
    signinButtonElement.value = 'Logging in...';
    
    const details = {
        email,
        password,
    }
    loginUser(details);
}


