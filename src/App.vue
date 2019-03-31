<template>
  <div id="app">
    <h1>The Care Kiosk</h1>
    <button v-if="state.num == 0" v-on:click="needHelp()">Need Help?</button>
    <button v-if="state.num == 0" v-on:click="giveHelp()">Looking to give help?</button>
    <p v-if="state.num == 1 || state.num == 2">Please leave your name here</p>
    <input v-model="personName" placeholder="Name" v-if="state.num == 1 || state.num == 2">
    <input v-model="number" placeholder="Phone Number" v-if="state.num == 1 || state.num == 2">
    <input v-model="email" placeholder="Email Address" v-if="state.num == 1 || state.num == 2">
    <button v-if="state.num == 1 || state.num == 2" v-on:click="addInfo()">Next</button>
    <p v-if="state.num == 3">How do you need help?</p>
    <p v-if="state.num == 4">How would you like to provide help?</p>
    <textarea v-model="message" v-if="state.num == 3 || state.num == 4" />
    <button v-if="state.num == 3 || state.num == 4" v-on:click="addMessage()">Next</button>

  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  personName = "";
  number = "";
  email = "";
  message = "";
  state = {
    num: 0,
    value: ""
  };

  needHelp() {
    this.state.num = 1;
  }

  giveHelp() {
    this.state.num = 2;
  }

  addInfo() {
    console.log(this.personName);
    if(this.state.num == 1){
      this.state.num = 3; //need help
    }
    else if(this.state.num == 2) {
      this.state.num = 4; //give help
    }
  }

  addMessage() {
    
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 3em;
  color: black;
  text-align: center;
  margin: 0.5em;
  text-shadow: 3px 2px black;
}
</style>
