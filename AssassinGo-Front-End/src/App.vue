<template>
  <div id="app">
    <Aside :menu="menu"></Aside>
    <router-view id="main" @menu="changeAside"/>
  </div>
</template>

<script>
import Aside from './components/Aside';
export default {
  name: 'App',
  components: {
    Aside,
  },
  data() {
    return {
      menu: "home",
    }
  },
  methods: {
    changeAside (msg) {
      this.menu = msg;
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
#main {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-left: 120px;
  background: #FFFFFF url('../static/images/back.jpg') no-repeat;
  background-size: cover;
}
</style>
