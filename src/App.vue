<template>
  <div id="app" style="height: 100%;">
    <router-view/>
  </div>
</template>

<script>
  export default{
    created(){

    },
    mounted(){
      feather.replace();
      axios.get("http://ip-api.com/json")
        .then(data => {
          data= data.data;

          window.myLocation = {
            lat: data.lat,
            lon: data.lon,
            place: data.city + ", " + data.country
          };

        }).catch(err => function(){
          alert("Please check your internet connection");
        });
    }
  }
</script>

