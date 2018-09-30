const url = 'https://ajimae.herokuapp.com/api/v1/questions';
fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
}).then(response => response.json()).then((data) => {
    if(data.success) {
        const answers = document.getElementById('answers');
        let item = `<head>
                        <h2>${data.title}</h2>
                        <p>${data.description}</p>
                        <div class="status">${data.posted_at}&nbsp;&nbsp;&nbsp;06:00 AM</div>
                    </head>
                    <article>
                        <h2>Answers</h2>
                            <ul id='answers'>`;   
        document.getElementById('article').innerHTML = item;        
        data.Questions.map((value) => {
            let elementDiv = document.createElement('li');
            
            const items = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia asperiores mollitia
                                minus cum suscipit amet quasi, quos provident ipsa facilis laudantium praesentium.
                                Consectetur, veritatis enim atque ratione ea, maiores eos repudiandae eius molestias
                                esse perferendis ipsum at incidunt! Harum, beatae! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Officia asperiores mollitia minus cum suscipit
                                amet quasi,
                            </p>`;
            const footer = `<span><a href="#" ><em class="down-vote">0 Downvote</em></a>&nbsp;<a href="#"><em class="vote">1 Upvote</em>            </a>&nbsp;&nbsp;<a href="person.html"><em>anonymous</em></a></span>
                            <hr>`;
                            
            elementDiv.innerHTML = items;
            answers.appendChild(elementDiv+""+footer);
        });
        const postAnswer = `<h3>Answer</h3>
                            <textarea placeholder="Type your answer here"></textarea>
                            <div class="action">
                                <a href="#">Post Answer</a>
                            </div>`;
        document.getElementById('article').appendChild(answers+""+postAnswer);
    }else if(data.error) {
        console.log(data.error);
    }
}).catch((error) => {
    console.log(error);
});
