// chatArea is the variable that stores the place on the screen the chats will appear.
var chatArea = document.getElementById('chat-area');

var count = 0;
var botCount = 0;
var userCount = 0;

var nextMessage = {
  message: "",
  sender: ""
};

var sendSpecialChat = [false, ""];

var botSilent = false;


