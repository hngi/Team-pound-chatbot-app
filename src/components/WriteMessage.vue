<template>
    <div class="write-message">
<!--         <div class="suggestions">
            <span class="suggestion">Basic arithmetic</span>
            <span class="suggestion">Today in history</span>
            <span class="suggestion">Number facts</span>
        </div> -->
        <div class="form-input">
            <form action="" @submit.prevent="newMessage">
                <input type="text" placeholder="Say something" v-model="message">
                <button class="btn btn-round"><span data-feather="send"></span></button>
            </form>                  
        </div>
    </div>
</template>

<script>
	export default{
		name: "writeMessage",
		data: function(){
			return {
				message: ""
			}
		},
		methods:{
			newMessage(){
				this.$emit('new-message', this.message);
				this.message = "";
			}
		},
		mounted(){
			feather.replace ();
		}
	}
</script>