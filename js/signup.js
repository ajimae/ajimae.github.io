/**
** Created by ajima chukwuemeka
*/

const nameElement = document.getElementById('name');
const usernameElement = document.getElementById('username');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const confirmPassElement = document.getElementById('cpassword');
const signupButtonElement = document.getElementById('signup');
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

const checkPassword = (password, confirmPass, element1, element2) => {
    if(password != "" && (password === confirmPass)) {
        element1.style.border = '1px solid #06b506';
        element2.style.border = '1px solid #06b506';        
    }else {
        errorCount++;
        element1.style.border = '1px solid #e64a4a';
        element2.style.border = '1px solid #e64a4a';
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

const registerUser = (details) => {
    const url = 'https://ajimae.herokuapp.com/api/v1/auth/signup';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(details)
    })
    .then((data) => {
        console.log(data);
        if(data.success) {
            signupButtonElement.value = 'Registered';
            signupButtonElement.removeAttribute('disabled');
            successElement.style.color = 'green';
            successElement.style.fontSize = '15px';
            successElement.style.display = 'block';
            successElement.innerHTML = 'Registration was successful....Redirecting to activity page';
            localStorage.setItem('token', data.token);
            setTimeout(() => {
                console.log("Redirecting...");
                window.location.href = window.location.protocol + '//' + window.location.hostname + '/activity.html';
            }, 2000);
        }else if(data.error) {
            console.log(data.error);
            registerButton.value = 'Sign Up';
            registerButton.removeAttribute('disabled');
            successElement.style.color = 'red';
            successElement.style.fontSize = '15px';
            successElement.innerHTML = data.error;
        }
    }).catch((error) => {
        console.log('Request failed', error);
    });
}


const checkInput = () => {
    errorCount = 0;
    const name = nameElement.value;
    const email = emailElement.value;
    const username = usernameElement.value;
    const password = passwordElement.value;
    const confirmPass = confirmPassElement.value;
    
    checkEmail(email, emailElement);
    checkOthers(name, nameElement);
    checkOthers(username, usernameElement);
    checkOthers(password, passwordElement);
    checkPassword(password, confirmPass, passwordElement, confirmPassElement);
    
    if(errorCount > 0) {
        successElement.style.color = 'red';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = 'The inputs with red borders are either empty, invalid and/or passwords not matching';
        return false;
    }else {
        successElement.style.display = 'none';
    }
    
    signupButtonElement.setAttribute('disabled', '');
    signupButtonElement.value = 'Creating Account...';
    
    const details = {
        name,
        email,
        username,
        password,
        confirmPass
    }
    registerUser(details);
}


