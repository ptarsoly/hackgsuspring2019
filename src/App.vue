<template>
  <div id="app">
    <h1>The Care Kiosk</h1>
    <button v-if="state.num == 0" v-on:click="needHelp()">Need Help?</button>
    <br>
    <br>
    <button v-if="state.num == 0" v-on:click="giveHelp()">Looking to give help?</button>
    <h2 v-if="state.num == 1 || state.num == 2">Please leave your name here</h2>
    <br><br>
    <input v-model="personName" placeholder="Name" v-if="state.num == 1 || state.num == 2">
    <br><br>
    <input v-model="number" placeholder="Phone Number" v-if="state.num == 1 || state.num == 2">
    <br><br>
    <input v-model="email" placeholder="Email Address" v-if="state.num == 1 || state.num == 2">
    <br><br>
    <button v-if="state.num == 1 || state.num == 2" v-on:click="addInfo()">Next</button>
    <h2 v-if="state.num == 3">How do you need help?</h2>
    <p v-if="state.num == 4">How would you like to provide help?</p>
    <br><br>
    <textarea v-model="message" v-if="state.num == 3 || state.num == 4" />
    <br><br>
    <button v-if="state.num == 3 || state.num == 4" v-on:click="addMessage()">Next</button>
    <h1 v-if="state.num == 5">Thank you for stopping by! Someone will reach out shortly.</h1>
    <button v-if="state.num == 5" v-on:click="reset()">Finish</button>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

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
  postToDatabase = {
    postid: "",
    name: "",
    phonenumber: "",
    email: "",
    looking: true,
    offering: false,
    message: "",
    imageurl: "https://media.giphy.com/media/bkfedFXLulc8c2ucCI/giphy.gif"
  };

  needHelp() {
    this.state.num = 1;
    this.state.value = "need";
  }

  giveHelp() {
    this.state.num = 2;
  }

  addInfo() {
    console.log(this.personName);
    if (this.state.num == 1) {
      this.state.num = 3; //need help
    } else if (this.state.num == 2) {
      this.state.num = 4; //give help
    }
  }

  addMessage() {
    console.log(this.message);
    if (this.state.num == 3) {
      this.state.num = 5; //need help
    } else if (this.state.num == 4) {
      this.state.num = 5; //give help
    }
  }

  reset() {
    this.postToDatabase.postid = "42";
    this.postToDatabase.name = this.personName;
    this.postToDatabase.phonenumber = this.number;
    this.postToDatabase.email = this.email;
    if (this.state.value == "need") {
      this.postToDatabase.looking = true;
      this.postToDatabase.offering = false;
    } else {
      this.postToDatabase.looking = false;
      this.postToDatabase.offering = true;
    }
    this.postToDatabase.message = this.message;

const b = {
      method: "post",
      url: "http://ab6fa199.ngrok.io/insert",
      data: this.postToDatabase
};
    axios(b)
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    this.state.num = 0;
    this.state.value = "";
  }
}
</script>

<style>

#app {
  font-family: helvetica, arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
}

h1 {
  font-weight:bold;
  font-size: 3em;
  color: white;
  text-align: center;
  margin: 0.5em;
  text-shadow: 2px 2px 4px #000000;
}

h2 {
  font-weight:bold;
  font-size: 20px;
  color: white;
  text-align: center;
  margin: 0.5em;
}

p{
font-weight:bold;
font-size: 16px;
color: white;
text-align: center;
margin: 0.5em;
}

button {
  padding: 8px 10px;
  border-radius: 25px;
  color:white;
  border: 5px solid #493c96;
  margin: 10;
  background: #7967c7;
  font-family: helvetica, arial, sans-serif;
  font-size: 18pt;
}

button:hover {
   background: #5e4eac;
   color:#b09aff;
}

input {
 height:25px;
 background: rgba(0,0,0,0.2);
 border-radius: 25px;
 border: 2px solid #B06AB3;
 color:white;
 padding: 20px;
 width: 200px;
 height: 15px;
}

textarea{
border-radius: 5px;
border: 5px solid #493c96;
background: #7967c7;
width: 200px;
length: 50px;
font-size: 12px;
 height:200px;
}
</style>
