<template>
  <div class="home">
    <div class="logo-display">
        <img src="@/assets/pound-logo.png" alt="">
    </div>

    <div class="onboarding">
        <h1>Welcome to poundbot</h1>
        <p>Pound bot can help you with a few things like basic arithmetic, checking the time, telling jokes and more</p>
        
        <div class="next">
            <router-link to="chat" class="btn btn-lg">Get started</router-link>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>
