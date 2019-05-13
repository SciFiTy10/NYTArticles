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
  //dropdown parent element, button and content as children
  //used tick marks so I could write on multiple lines
  `<div class="dropdown">
    <button class="dropbtn">{{ dropdownLabel }}</button>
    <div class="dropdown-content">
      <a href="#">{{ yesterday }}</a>
      <a href="#">{{ last7Days }}</a>
      <a href="#">{{ last30Days }}</a>
    </div>
   </div>`,
   //set my text in data function so it can be reactive
   data: function() {
     return {
       dropdownLabel: 'Select a time period',
       yesterday: 'Yesterday',
       last7Days: 'Last 7 Days',
       last30Days: 'Last 30 Days'
     }
   }
})

//create a new Vue instance
var app = new Vue({
  //point to the main div
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
