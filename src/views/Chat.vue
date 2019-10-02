<template>
	<div style="height: 100%;">
        <chat-box :chats="chats" @option-clicked="takeCommand($event)"></chat-box>
        <write-message @new-message="newUserMessage($event)"></write-message>
    </div>
</template>

<script>
// @ is an alias to /src

import writeMessage from "@/components/WriteMessage.vue";
import chatBox from "@/components/ChatBox.vue";

export default {
  name: 'chat',
  components: {
    writeMessage,
    chatBox
  },
  data: function(){
    return {
        chats: [],
        expecting: "",
        userName: "",
        initialMessage: {
            person: "bot",
            message: `Good afternoon, i’m pound bot. <br>
            I can help you out with so many things, but first what’s your name`
        },
        defaultOptionsList: [
            {
                text: "Tell me a joke",
                command: "tell-joke"
            },
            {
                text: "What is the time?",
                command: "tell-time"
            },
            {
                text: "What is the weather like?",
                command: "tell-weather"
            },
            {
                text: "Where am i?",
                command: "tell-location"
            }
        ]
    }
  },
  created(){
    this.expecting = "name";
    this.showMessage(this.initialMessage);
  },
  methods:{
    newUserMessage(message, handle = true){
        this.chats.push({
            person: "user",
            message: message
        });

        if(handle){
            this.handleResponses(message);
        }
    },
    handleResponses(message){
        if(this.expecting == "name"){
            this.userName = message.trim();
            this.showMessage({
                person: "bot",
                message: `Welcome, ${this.userName} <br>
                What would you like to do?`,
                list: this.defaultOptionsList
            });
            this.expecting = "any";

            return;
        }

        if(this.searchString(message, "the time")){
            this.showTime();
            return;
        }else if(this.searchString(message, "time")){
            this.showTime(false);
            return;
        }

        if(this.searchString(message, "location") || this.searchString(message, "where am i")){
            this.showPlace();
            return;
        }else if(this.searchString(message, "place")){
            this.showPlace(false);
            return;
        }

        if(this.searchString(message, "weather")){
            this.showWeather();
            return;
        }else if(this.searchString(message, "temprature")){
            this.showWeather(false);
            return;
        }

        if(this.searchString(message, "joke")){
            this.showJoke();
            return;
        }

        this.lost();
    },
    showMessage(message){
        setTimeout(()=>{
            this.chats.push(message);
        }, 1000)
    },
    takeCommand(command){
        this.newUserMessage(command[1], false);
        if(command[0] == "tell-joke"){
            this.showJoke();
        }else if(command[0] == "tell-time"){
            this.showTime();
        }else if(command[0] == "tell-weather"){
            this.showWeather();
        }else if(command[0] == "tell-location"){
            this.showPlace();
        }
    },
    searchString(haystack, needle){
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    },
    createMessage(string, sure = true){
        if(!sure){
            this.showMessage({
                message: "I'm not sure what you meant but, " + string,
                person: "bot"
            })
        }else{
            this.showMessage({
                person: "bot",
                message: string
            });
        }
    },
    lost(){
        this.showMessage({
            person: "bot",
            message: "Sorry i don't understand what that meant",
            list: this.defaultOptionsList
        });
    },
    noNetwork(){
        this.showMessage({
            person: "bot",
            message: "There seems to be a problem with your internet connection, please connect and refresh this page"
        });
    },
    showTime(sure = true){
        let time = new Date(Date.now());

        console.log(time)
        let hours = time.getHours();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        let botDate = hours + ":" + time.getMinutes() + " " + ampm;

        this.createMessage("the time is <b>" + botDate + "</b>", sure);
    },
    showWeather(sure = true){
        if(!myLocation.lat){
            this.noNetwork();
        }else{
            axios.get(`https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/weather?lat=${myLocation.lat}&lon=${myLocation.lon}&appid=39944fe43f1decded72ef1c7fbb68547`)
                .then(data => {
                    console.log(data.data);
                    let weather = data.data.weather[0];
                    weather.temprature = data.data.main.temp;
                    this.createMessage("here's the weather for <b>" + myLocation.place + "</b>.", sure);
                    this.showMessage({
                        person: "bot",
                        message: "",
                        weather: weather
                    })
                }).catch(err => {
                    this.noNetwork();
                });
        }
    },
    showJoke(){
        axios.get("https://api.icndb.com/jokes/random")
            .then(data => {
                // console.log(data);
                let joke = data.data.value.joke;
                this.createMessage(joke);
            }).catch(err => {
                console.log(err);
                this.noNetwork();
            });
    },
    showPlace(sure = true){
        this.createMessage("You're currently at <b>" + myLocation.place + "</b>", sure);
    }
  }
}
</script>