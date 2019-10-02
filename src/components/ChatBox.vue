<template>
	<div class="chat-box pound-scrollbar" id="mychat-box">
		<div v-for="(chat, id) in chats" class="chat" :class="chat.person == 'bot' ? 'bot-chat' : 'user-chat'" key="id">
			<div class="bot-img" v-if="chat.person == 'bot' && ( id - 1 >= 0 ? chats[id-1].person !== 'bot' : true )">
                <img src="@/assets/pound-logo.png" alt="">
            </div>
            <div v-if="chat.person == 'bot'" class="bot-message message">
            	<span v-html="chat.message"></span>

            	<div class="message-list" v-if="chat.list && chat.list.length > 0">
                    <h4>You can try</h4>
                    <ul>
                    	<li v-for="item in chat.list" @click="$emit('option-clicked', [item.command, item.text])" key="item.command">
                    		{{item.text}}
                    	</li>
                    </ul>
                </div>

            	<div v-if="chat.weather" class="weather">
            		<div class="weather-img">
                        <img :src="'http://openweathermap.org/img/w/' + chat.weather.icon + '.png'" alt="">
                    </div>
                    <h3>{{(chat.weather.temprature - 273.15).toFixed(2)}}&deg;C</h3>
                    <p class="weather-summary">{{chat.weather.description}}</p>
            	</div>
            </div>
            <div class="user-message message" v-else>
            	{{chat.message}}
            </div>
		</div>	
    </div>
</template>

<script>
	export default{
		name: "chatbox",
		props: {
			chats: {
				required: true,
				type: Array
			}
		},
		updated(){
			let chatBoxEl= document.getElementById("mychat-box");
    		chatBoxEl.scrollTo({
				  top: chatBoxEl.scrollHeight,
				  left: 0,
				  behavior: 'smooth'});
		}
	}
</script>