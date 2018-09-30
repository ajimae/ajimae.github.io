/**
** Created by ajima chukwuemeka
*/

const titleElement = document.getElementById('title');
const descriptionElement = document.getElementById('modify');
const postButtonElement = document.getElementById('post');
const successElement = document.getElementById('success');
let errorCount = 0;

const checkOthers = (value, element) => {
    if(value === '' || !value.replace(/\s/g, '').length) {
        errorCount++;
        element.style.border = '1px solid #e64a4a';
    }else {
        element.style.border = '1px solid #06b506';
    }
}

const postQuestion = (details) => {
    const url = 'https://ajimae.herokuapp.com/api/v1/questions';
    console.log(localStorage.getItem('x-access-token'));
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(details)
    })
    .then(response => response.json()).then((data) => {
        if(data.success) {
            postButtonElement.removeAttribute('disabled');
            successElement.style.display = 'block';
            successElement.style.color = '#222';
            successElement.style.fontSize = '15px';
            successElement.innerHTML = 'Question was posted successful....Redirecting to activity page';
            setTimeout(() => {
                successElement.innerHTML = 'Redirecting...';
                window.location.href = window.location.protocol + '//' + window.location.hostname + '/activity.html';
            }, 3000);
        }else if(data.error) {
            postButtonElement.removeAttribute('disabled');
            postButtonElement.value = 'Sign in';
            successElement.style.display = 'block';
            
            successElement.style.color = '#222';
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
    const title = titleElement.value;
    const description = descriptionElement.value;
    
    checkOthers(title, titleElement);
    checkOthers(description, descriptionElement);
    
    if(errorCount > 0) {
        successElement.style.color = 'red';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = 'The field(s) with red borders are either empty or invalid.';
        return false;
    }else {
        successElement.style.display = 'none';
    }
    
    postButtonElement.setAttribute('disabled', '');
    postButtonElement.value = 'Posting question...';
    
    const details = {
        title,
        description
    }
    
    postQuestion(details);
}