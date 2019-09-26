function send(sender, message) {
    console.log("🗨 " + sender + ": " + message);
  
    // Insert the nextMessage into the HTML.
    chatArea.insertAdjacentHTML("beforeend", "<div id='chat-" + count + "' class='chat-container'><div class='chat-wrapper' id='chat-a-" + count + "'><p id='a-' class='chat-" + sender + "'>" + message + "</p><div class='avatar avatar-" + sender + "'></div></div></div>");
  
    document.getElementById('chat-' + count).scrollIntoView();
  
    // Count one more message that has been sent.
    count += 1;
  }
  
