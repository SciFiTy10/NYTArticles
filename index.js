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
  //v-for is used so I can loop through content array in data
  `<div class="dropdown">
    <button class="dropbtn">{{ dropdownLabel }}</button>
    <div class="dropdown-content">
      <a href="#" v-for="c in content">{{ c.text }}</a>
    </div>
   </div>`,
   //set my text in data function so it can be reactive
   data: function() {
     return {
       dropdownLabel: 'Select a time period',
       content: [
         { text: 'Yesterday' },
         { text: 'Last 7 Days' },
         { text: 'Last 30 Days' }
       ]
     }
   }
})

//component for the filter section
Vue.component('section-filter', {
  template:
  //filter parent container, filter-main area, and filter-checkbox container as children
  //used tick marks so I could write on multiple lines
  //v-for is used so I can loop through content array in data
  `<div class="filter-container">
    <h3>{{ header }}</h3>
    <div class="filter-main">
      <label class="filter-checkbox" v-for="c in content">{{ c.text }}
        <input type="checkbox">
        <span class="checkmark"></span>
      </label>
    </div>
   </div>`,

   //set my text in data function so it can be reactive
   data: function() {
     return {
       header: 'Choose your sections',
       content: [
         { text: 'Health' },
         { text: 'Magazine' },
         { text: 'Opinion' },
         { text: 'Smarter Living' },
         { text: 'U.S.' },
         { text: 'World' }
       ]
     }
   }
})

//create a new Vue instance
var app = new Vue({
  //point to the main div
  el: '#app',
  data: {
    results: []
  },
  mounted() {
    axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=hmNzQpMlkLSsTGvnR8tpAOmibGDHwicU")
    .then(response => {this.results = response.data.results})
  }
})
