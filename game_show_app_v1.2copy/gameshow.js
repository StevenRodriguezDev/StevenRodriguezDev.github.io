//  <--- add needed variables --->
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.getElementsByClassName("btn__reset");
const overlay = document.getElementById('overlay');

let missed = 0;

const ul = document.querySelector('#phrase ul');
// <--- Array named Phrases --->
const phrases = [
    'remember why you started',
    'do what you love',
    'get better every single day',
    'it is the will not the skill',
    'trust the process',
];

//  <---listens for the start of the game button to be pressed--->
startGame[0].addEventListener('click', () => {
    overlay.style.display = 'none';
});


//  <--- return a random phrase from an array --->
function getRandomPhraseAsArray(phrases){
    const randomPhrase = phrases[Math.floor(Math.random()*phrases.length)];
    const phraseSplit = randomPhrase.split('');
    return phraseSplit;
};

const getRandomPhrase = getRandomPhraseAsArray(phrases);
// const getRandomPhraseAsArray = arr => {}
//console.log(getRandomPhrase)


// <--- add letters of a string to the display --->
function addPhraseToDisplay(phrase){
    for(let i = 0; i < phrase.length; i++){
        const list = document.createElement('li');
        list.textContent = phrase[i];
        ul.appendChild(list);

        if (phrase[i] === ' '){
            list.className = 'space';
        } else {
            list.className = 'letter';
        }
    }
}
const phraseDisplay = addPhraseToDisplay(getRandomPhrase);
// const addPhraseToDisplay = arr => {}
// console.log (getRandomPhrase)


// <--- checks if a letter is in the phrase --->
function checkLetter(button){
    const letters = document.querySelectorAll('.letter');
    let matchingLetters = null;

    for (let i = 0; i < letters.length; i++) {
        if (button.textContent === letters[i].textContent) {
            letters[i].classList.add('show');
            letters[i].style.transition = '.5 ease-in-out';
            matchingLetters = true;
        }
    }
    return matchingLetters;
}
// const checkLetter = button => {}


//  <--- listen for the onscreen keyboard to be clicked --->
qwerty.addEventListener('click', (z) =>{  
    if(z.target.tagName === 'BUTTON'){
        z.target.className = 'chosen';
        z.target.setAttribute('disabled', '');
        let matchingLetters = checkLetter(z.target);
        if(matchingLetters === null){
            document.querySelectorAll('img')[missed].src='images/lostHeart.png';
            z.target.className = 'mismatch';
            missed ++;
        }
        checkWin();
    }
    //  checkWin();
})

// qwerty.addEventListener('click', e => {});


// <--- checks if the game has been won or lost --->
function checkWin() {
    const letterClass = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');

    if (letterClass.length === show.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        document.querySelector('h2').textContent = "you did it!";
        playAgain();
    } else if (missed > 4 ) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        document.querySelector('h2').textContent = "try again!";
        playAgain();
    }
}
// const checkWin = () => {}

//<---- reset ---->
function playAgain(){
    startGame[0].textContent = 'Play Again';
    missed = 0;
    ul.textContent = ' ';

    const gameLetters = document.querySelectorAll('.chosen');
    const mismatchedLetters = document.querySelectorAll('.mismatch');

 for(let i = 0; i < gameLetters.length; i++) {
      gameLetters[i].classList.remove('chosen');
      gameLetters[i].disabled = false;
    }  
  
 for(let i = 0; i < mismatchedLetters.length; i++) {
     mismatchedLetters[i].classList.remove('mismatch');
     mismatchedLetters[i].disabled = false;
    } 

 const newPhrase = getRandomPhraseAsArray(phrases);
 addPhraseToDisplay(newPhrase);

 const newHearts = document.querySelectorAll('.tries img');
 for(i = 0;  i < newHearts.length; i++) {
     newHearts[i].src = 'images/liveHeart.png';
 }
 startGame[0].addEventListener('click', () => {
         playAgain();
 });


}
