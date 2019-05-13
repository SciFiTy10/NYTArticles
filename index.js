//component for the navbar
Vue.component('navbar', {
  //build a template which we will refer to in html
  //header text refers to data below
  template: '<div id="navbar"><h1> {{ header }} </h1></div>',
  //data has to be a function in component
  //header text is in component so it can be reactive
  data: function() {
    return {
      header: 'Welcome to the NYT Articles App!'
    }
  }
})

//component for the dropdown
Vue.component('dropdown', {
  template:
  `<div class="dropdown">
    <button class="dropbtn">Select a time period</button>
    <div class="dropdown-content">
      <a href="#">Yesterday</a>
      <a href="#">Last 7 Days</a>
      <a href="#">Last 30 Days</a>
    </div>
   </div>`
})

//create a new Vue instance
var app = new Vue({
  //point to the main div
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
