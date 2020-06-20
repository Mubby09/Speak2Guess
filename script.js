const messageElement = document.getElementById("msg");
const randomNumber = getRandomNumber();

//This uses the speech recognition API built into the browser!!!
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition in game
recognition.start();

// capture user speak
function onSpeak(e) {
  //   console.log(e);
  const message = e.results[0][0].transcript;
  writeMessage(message);
  check(message);
}

function writeMessage(message) {
  messageElement.innerHTML = `<div>You said : <span class='box'>${message}</span></div>`;
}

//check message against number
function check(message) {
  const number = +message;
  //check if number
  if (Number.isNaN(number)) {
    messageElement.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  if (number > 100 || number < 1) {
    messageElement.innerHTML += `<div>Number must be between 1 and 1000</div>`;
    return;
  }

  if (number === randomNumber) {
    messageElement.innerHTML += `<div>Congratulations😀😀😀,You guessed the Right answer</div>
    <div>The number was ${number}</div>
    <div>Click the button below to play again.</div>
    <button class='play-again' onclick='playAgain()'>Play Again</button>
    `;
  } else if (number > randomNumber) {
    messageElement.innerHTML += `<div>Number too High, Go lower</div>`;
  } else {
    messageElement.innerHTML += `<div>Number too Low, Go Higher</div>`;
  }
}

function playAgain() {
  window.location.reload();
}

recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => recognition.start());

//GEnerate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
getRandomNumber();
