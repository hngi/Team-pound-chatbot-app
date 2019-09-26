var enterListener = window;
var startListener = document.getElementById("startButton");
var sendListener = document.getElementById("sendButton");
var composer = document.getElementById("composer");

// Listen for the enter key on the start screen to start the chat
if (count == 0) {
  listenFor()
}

function listenFor() {
  console.log("🔈 Starting to listen for Enter Key or Mouse Click.");
  
  enterListener.addEventListener("keydown", listen);
  startListener.addEventListener("click", listen);
  sendListener.addEventListener("click", listen);
}

function listen(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!e.shiftKey) {
      console.log("⌨ Listen Event: " + e + ", Type: " + e.type + ", Keycode: " + e.keyCode);
      pauseListening();
      lookForChat();
    }
  }
  if (e.type == "click") {
    console.log("🖱 Listen Event: " + e + ", Type: " + e.type + ", Button: " + e.which);
    pauseListening();
    lookForChat(); 
  }
}
                                  
// To avoid double submitting on enter key if someone clicks the button we have top stop listening for enter until the robot sends a question.
function pauseListening() {
  enterListener.removeEventListener("keydown", listen);
  startListener.removeEventListener("click", listen);
  sendListener.removeEventListener("click", listen);
  console.log("🔇 Stop listening for enter or click.");
}

