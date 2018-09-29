let VOWEL_LETTERS = ['a', 'e', 'i', 'o', 'u'];

const letter = 'O';  //coming from user input


if(isVowel(letter)) {
    console.log(`${letter} is a vowel`);
}
else {
    console.log(`${letter} is not a vowel`);
}

function isVowel(n) {
    n = n.toLowerCase().trim();
    for(let i of VOWEL_LETTERS) {
        if(i === n) return true;
    }    
    return false;
}