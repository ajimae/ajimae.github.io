const questionIndex = localStorage.getItem('index');
const url = `http://ajimae.herokuapp.com/api/v1/questions/${questionIndex}`;

const answerElement = document.getElementById('answer');
const postBtnElement = document.getElementById('post');
const successElement = document.getElementById('success');

fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
}).then(response => response.json()).then((data) => {
    if(data.success) {
        document.getElementById('title').innerHTML = data.Question[0].title;
        
        document.getElementById('desc').innerHTML = data.Question[0].description;
        
        let date = data.Question[0].posted_at.split('T')[0];
        let time = data.Question[0].posted_at.split('T')[1];
        //document.querySelector('.status').innerHTML = `${data.Question[0].posted_at}`;
        
        document.querySelector('.status').innerHTML = `${date}&nbsp;&nbsp;&nbsp;${time}`;
        
        
        
            data.Answers.map((value) => {
            let elementDiv = document.createElement('li');
                
            console.log(value);
            
            const items = `<p>${value.answer}</p>`;
            const footer = `<span><a href="#" ><em class="down-vote">${value.downvotes} Downvote</em></a>&nbsp;<a href="#"><em class="vote">${value.upvotes} Upvote</em>            </a>&nbsp;&nbsp;<a href="person.html"><em>${value.username}</em></a></span><hr>`;
            
            let elements = `${items}${footer}`;
                            
            elementDiv.innerHTML = elements;
            answers.appendChild(elementDiv);
        });
        
    }else if(data.error) {
        console.log(data.error);
    }
}).catch((error) => {
    console.log(error);
});

const checkInput = () => {
    errorCount = 0;
    const answer = answerElement.value;
    const postButton = postBtnElement.value;
    
    checkOthers(answer, answerElement);
    
    if(errorCount > 0) {
        successElement.style.color = 'red';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = 'The field(s) with red borders are either empty or invalid.';
        return false;
    }else {
        successElement.style.display = 'none';
    }
    
    postBtnElement.setAttribute('disabled', '');
    postBtnElement.value = 'Posting...';
    
    const answers = {
        answer
    }
    
    postAnswer(answers);
}

const checkOthers = (value, element) => {
    if(value === '' || !value.replace(/\s/g, '').length) {
        errorCount++;
        element.style.border = '1px solid #e64a4a';
    }else {
        element.style.border = '1px solid #06b506';
    }
}

const postAnswer = (answer) => {
    const url = `https://ajimae.herokuapp.com/api/v1/questions/${questionIndex}/answers`;
    const token = localStorage.getItem('token');
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': token
        },
        body: JSON.stringify(answer)
    })
    .then(response => response.json()).then((data) => {
        console.log(data);
        if(data.success) {
            postBtnElement.removeAttribute('disabled');
            successElement.style.display = 'block';
            successElement.style.color = '#fff';
            successElement.style.fontSize = '15px';
            successElement.innerHTML = 'Posting answer';
            localStorage.setItem('token', data.token);
            setTimeout(() => {
                successElement.innerHTML = 'Successfully posted answer...';
                window.location.href = window.location.protocol + '//' + window.location.hostname + '/view.html';
            }, 3000);
        }else if(data.error) {
            postBtnElement.removeAttribute('disabled');
            postBtnElement.value = 'Sign in';
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
