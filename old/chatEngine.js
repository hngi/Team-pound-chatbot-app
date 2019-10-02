/*

This JavaScript file has all of the code to find chats from the bot and user and create the chat interface. Because the chat window will change as you type we need to manipulate the DOM (Document Object Model) and add HTML to display on the screen.

*/

function lookForChat() {
    // If there have been no chats yet, start the bot.
    if (count == 0) {
      startBot();
    }
    
    console.log("🌀 Looking for chat " + (count + 1));
    
    // check who sent the last chat
    last = nextMessage.sender; 
    
    if (last == "bot") {
      // if the bot chatted last wait for the user to send a chat
      userChat();
      
    } else {
      // Send the cursor to the compose text area.
      composer.focus();
      
      // If botSilent is true the bot is done chatting
      // Set nextMessage.sender to "bot" to make the user chat next
      // Run listenFor() to wait for the user to chat.
      if (botSilent) {
        nextMessage.sender = "bot";
        nextMessage.message = "";
        listenFor();
        
      } else {
        
        // If the user chatted last or the chat just started have the bot send a chat.
        // Set the appropriate wait time to make the bot feel realistic.
        // Then run the botChat function which will find the right message for the bot
        if (count == 0) {
          wait = 100;
        } else {
          wait = 500;
        }
        setTimeout(function(){
          console.log("🕙 Waiting for bot");
          botChat();
        }, wait);
      }
    }
  }
  
  
  // startBot is a function that starts the bot for the first time. It clears away the start button from the HTML.
  function startBot(){
    console.log("🤖 Starting bot . . .");
    chatArea.innerHTML = '';
    document.getElementById('compose-area').style.display = 'block';
  }
  
  // The comment below tells this file about variables we define in other files.
  /*
    global count
    global last
    global nextMessage
    global userChat
    global composer
    global botSilent
    global listenFor
    global wait
    global botChat
    global chatArea
  */
  
  
  
  