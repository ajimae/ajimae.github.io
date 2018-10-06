const url = 'https://ajimae.herokuapp.com/api/v1/questions';
fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
}).then(response => response.json()).then((data) => {
    if(data.success) {
        data.Questions.map((value) => {
            let index = parseInt(value.id);
            console.log(index);
            let elementDiv = document.createElement('div');
            elementDiv.setAttribute('class', 'article');
            elementDiv.setAttribute('id', 'article');
            
            let item = `<div class="questions"><p><a href="view.html" id="index-${index}">${value.title}</a></p></div><footer><div 
class="status">Posted by <a href="person.html">${value.respondent}</a>&nbsp;&nbsp;<span class="vote">0 votes</span>&nbsp;&nbsp;<span 
class="ans">${value.views} Views</span>&nbsp;&nbsp;<span>4 hrs ago</span></div></footer>`;
            
            elementDiv.innerHTML = item;
            document.getElementById('content').appendChild(elementDiv);
            
            document.getElementById('index-'+index).addEventListener('click', () => {
                localStorage.setItem('index', index);
            });
        });
    }else if(data.error) {
        console.log(data.error);
    }
}).catch((error) => {
    console.log(error);
});
