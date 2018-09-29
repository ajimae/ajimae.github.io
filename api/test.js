//let VOWEL_LETTERS = ['a', 'e', 'i', 'o', 'u'];
//
//const letter = 'O';  //coming from user input
//
//
//if(isVowel(letter)) {
//    console.log(`${letter} is a vowel`);
//}
//else {
//    console.log(`${letter} is not a vowel`);
//}
//
//function isVowel(n) {
//    n = n.toLowerCase().trim();
//    for(let i of VOWEL_LETTERS) {
//        if(i === n) return true;
//    }    
//    return false;
//}

    
const html = '<div class="questions"><p><a href="view.html"></a></p></div><footer><div class="status">Posted by <a href="person.html">Username</a>&nbsp;&nbsp;<span class="vote">0 votes</span>&nbsp;&nbsp;<span class="ans">5 Views</span>&nbsp;&nbsp;<span>4 hrs ago</span></div></footer>';


//const html = '<div class="questions">'+
//    +'<p>'+
//        +'<a href="view.html">'+value.title+'</a>'+
//    +'</p>'+
//+'</div>'+
//+'<footer>'+
//    +'<div class="status">Posted by <a href="person.html">'+value.username+'</a>&nbsp;&nbsp;'+
//    +'<span class="vote">0 votes</span>&nbsp;&nbsp;<span class="ans">'+data.views+' Views</span>&nbsp;&nbsp;'+
//    +'<span>'+data.posted_at+' ago</span></div>'+
//+'</footer>';


document.getElementById('article').innerHTML = html;