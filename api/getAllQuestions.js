//const questions = '<div class="questions">'+
//                    +"<p>"+
//                        +'<a href="view.html">'+data.question+'</a>'+
//                    +'</p>'+
//               +'</div>'+
//                +'<footer>'+
//                        +'<div class="status">Posted by <a href="person.html">'+data.username+'</a>&nbsp;&nbsp;'+
//                        +'<span class="vote">0 votes</span>&nbsp;&nbsp;<span class="ans">0 Answers</span>&nbsp;&nbsp;'+
//                        +'<span>2hrs ago</span></div>'+
//                +'</footer>';
//

const url = 'https://ajimae.herokuapp.com/api/v1/questions';
fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
}).then(response => response.json()).then((data) => {
    //console.log(data);
    if(data.success) {
        data.Questions.map((value) => {
            let elementDiv = document.createElement('div');
            elementDiv.setAttribute('class', 'article');
            elementDiv.setAttribute('id', 'article');
            
            let item = `<div class="questions"><p><a href="view.html">${value.title}</a></p></div><footer><div 
class="status">Posted by <a href="person.html">${value.username}</a>&nbsp;&nbsp;<span class="vote">0 votes</span>&nbsp;&nbsp;<span 
class="ans">${value.views} Views</span>&nbsp;&nbsp;<span>4 hrs ago</span></div></footer>`;
            
            elementDiv.innerHTML = item;
            document.getElementById('content').appendChild(elementDiv);
        });
    }else if(data.error) {
        console.log(data.error);
    }
}).catch((error) => {
    console.log(error);
});
