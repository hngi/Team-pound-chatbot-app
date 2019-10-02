function userChat() {
    compose_area = document.getElementById('composer');
  
    nextMessage.sender = "user";
  
    nextMessage.message = compose_area.value;
    compose_area.value = "";
        
    uppercase = nextMessage.message.toUpperCase();
  
    console.log("✍ Code for custom prompts goes here");
    
    if (uppercase == "HAPPY BIRTHDAY") { 
      sendSpecialChat = [true, "Thank you! How did you know it's my birthday?!"];
    }
    
  
    // Send user's message.
    send(nextMessage.sender, nextMessage.message);
  
    // Count 1 more chat that the user has sent.
    userCount += 1;
  
    // Ask the bot for another chat.
    lookForChat()
  
  }
  
 