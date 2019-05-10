//component for the navbar
Vue.component('navbar', {
  template: '<div id="navbar"><h1>Welcome to the NYT Most Viewed!</h1></div>'
})

//create a new Vue instance
var app = new Vue({
  //point to the main div
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
