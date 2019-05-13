//component for the navbar
/*Vue.component('navbar', {
  template: '<div id="navbar"><h1>Welcome to the NYT Most Viewed!</h1></div>'
})
*/
//component for the navbar
Vue.component('navbar', {
  //build a template which we will refer to in html
  //header text refers to data below
  template: '<div id="navbar"><h1> {{ header }} </h1></div>',
  //data has to be a function in component
  //header text is in component so it can be reactive
  data: function() {
    return {
      header: 'Hello from Vue data!'
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
