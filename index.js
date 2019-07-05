let text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';
text = text.split(' ');
// console.log(text[Math.floor((Math.random)*text.length)]);
let score = 0;
let index = 0;
let initialTime = 30;
let timeLeft = initialTime;

let divFinish = document.getElementById('finish');
let divFinishContainer = document.getElementById('finish__container---js');
let divApp = document.getElementById('app');
let wordsContainer = document.getElementById('app__words--container');
let wordsContainerDone = document.getElementById('app__words--container--done');
let labelScoreValue = document.getElementById('finish__label--score-value---js');
let appScore = document.getElementById('app__score');
let formInput = document.getElementById('app__form--input---js');
let timeLoad = document.getElementById('time-load');
let time;

// function that needs to start first
restartApp();

function start(){
  divFinish.style.display = 'none';
  divFinishContainer.style.opacity = 0;
  divFinishContainer.style.transform = 'scale(0.8)';
  divApp.style.display = 'block';
  
  timeLoad.style.transiton = '0.3s';
  timeLoad.style.transitionTimingFunction = 'linear';  
  
  
  
  time = setIntervalAndExecute(timer,1000);
}

function finish(){
  divFinish.style.display = 'block';
  divFinishContainer.style.opacity = 1;
  divFinishContainer.style.transform = 'scale(1)';
  divApp.style.display = 'none';
  labelScoreValue.innerHTML = score;

  // stop time
  window.clearInterval(time);
}

function restartApp(){
  divFinish.style.display = 'none';
  divApp.style.display = 'block';
  formInput.value = '';
  
  // reset
  timeLeft = initialTime; //reset time
  // reset score
  score = 0;
  timeLoad.style.width = 0;  
  timeLoad.style.transiton = '0.1s';  
  timeLoad.style.transitionTimingFunction = 'ease';  

  //start function
  generateText(text);
}

function generateText(text){
  index = Math.floor((Math.random())*text.length);
  let displayText = text[index];
  
  // Set text
  wordsContainerDone.innerHTML = '';
  wordsContainer.innerHTML = displayText;
}

function checkText(){
  if(timeLeft === initialTime && formInput.value.length > 0){
    start();
  }
  
  let rightText = text[index];
  if(formInput.value === rightText.slice(0,formInput.value.length)){
    wordsContainerDone.innerHTML = rightText.slice(0,formInput.value.length);
    wordsContainer.innerHTML = rightText.slice(formInput.value.length);
  }
  if(formInput.value === rightText){
    generateText(text);
    formInput.value = '';
    score += rightText.length*100;
  }
}

function setIntervalAndExecute(fn, t) {
  fn();
  return(setInterval(fn, t));
}

function timer(){
  if(timeLeft > 0) timeLeft--;
  console.log(timeLeft)
  let percentage = ((initialTime-timeLeft)/initialTime)*100+'%'
  timeLoad.style.width = percentage;
  if(timeLeft <= 0){
    finish();
  }
}
