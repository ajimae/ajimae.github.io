const questions = '<div class="questions">'+
                    +"<p>"+
                        +'<a href="view.html">'+data.question+'</a>'+
                    +'</p>'+
               +'</div>'+
                +'<footer>'+
                        +'<div class="status">Posted by <a href="person.html">'+data.username+'</a>&nbsp;&nbsp;'+
                        +'<span class="vote">0 votes</span>&nbsp;&nbsp;<span class="ans">0 Answers</span>&nbsp;&nbsp;'+
                        +'<span>2hrs ago</span></div>'+
                +'</footer>';


const url = 'https://ajimae.herokuapp.com/api/v1/questions';
//const questions = `<div class="questions"><p><a href="view.html">${value}</a></p></div>`;


fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
}).then(response => response.json()).then((data) => {
    console.log(data);
    if(data.success) {
        data.map((value) => {
            console.log(data.Questions[1].title);
            //document.getElementById('article').innerHTML = questions;
        });
    }else if(data.error) {
        console.log(error);
    }
}).catch(error) {
    console.log(error);
}