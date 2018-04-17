<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  watch:{
    $route(to){
      if(to.path === '/home'){
        this.updateActiveTab({
          name: to.name,
          path: to.path,
          title: to.meta.title
        })
      }
    }
  },
  methods:{
    ...mapMutations(["updateActiveTab"])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
  background-color: #f9f9f9;
}
html,body{
  width:100%;
  height:100%;
}
</style>
