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
//const questions = `<div class="questions"><p><a href="view.html">${value}</a></p></div>`;


fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
}).then(response => response.json()).then((data) => {
    //console.log(data);
    if(data.success) {
        data.Questions.map((value) => {
            let item = `<div class="article" id="article"><div class="questions"><p><a href="view.html">${value.title}</a></p></div><footer><div class="status">Posted by <a href="person.html">${value.username}</a>&nbsp;&nbsp;<span class="vote">0 votes</span>&nbsp;&nbsp;<span class="ans">${value.views} Views</span>&nbsp;&nbsp;<span>4 hrs ago</span></div></footer></div>`;
            
            document.getElementById('content').appendChild(item);
        });
    }else if(data.error) {
        console.log(data.error);
    }
}).catch((error) => {
    console.log(error);
});