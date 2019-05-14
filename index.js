var sections = ['Health','Magazine','Opinion','Smarter Thinking', 'U.S.', 'World'];

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
   methods: {
      changeTitle: function(){

      }
   },
   //set my text in data function so it can be reactive
   data: function() {
     return {
       dropdownLabel: 'Select a time period',
       content: [
         { text: 'Last 1 Days' },
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
    <h3 id="filter-header">{{ header }}</h3>
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

//component for the graph section
Vue.component('graph', {
  template:
  //filter parent container, filter-main area, and filter-checkbox container as children
  //used tick marks so I could write on multiple lines
  //v-for is used so I can loop through content array in data
  `<div class="graph-container">
    <h3 id="graph-header">{{ header }}</h3>
    <h4 id="graph-subHeader">{{ subHeader }}</h4>
    <canvas id = "viewGraph"></canvas>
   </div>`,

   //start of mounted
   mounted: function(){
     var ctx = document.getElementById('viewGraph').getContext('2d');
     var myChart = new Chart(ctx, {
       type: 'bar',
       data: {
         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
         datasets: [{
           label: '# of Votes',
           data: [12, 19, 3, 5, 2, 3],
           backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
         }]
       },
       options: {
         responsive: true,
         maintainAspectRatio: false,
         scales: {
           yAxes: [{
             ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  fontStyle: "bold",
                  fontColor: 'black',
                  fontSize: 20,
                  labelString: 'Views'
                }//end of scaleLabel
              }],//end of yAxes

            xAxes: [{
                scaleLabel: {
                  display: true,
                  fontStyle: "bold",
                  fontColor: 'black',
                  fontSize: 20,
                  labelString: 'Section'
                }//end of scaleLabel
              }]//end of xAxes
            }//end of scales
          }//end of options
        });//end of chart instance

      },//end of mounted function

   //set my text in data function so it can be reactive
   data: function() {
     return {
       header: 'Most Popular NYT Articles the Last ___ Days',
       subHeader: 'Health / Opinion / U.S.'
     }//end of return
   }//end of data
})//end of component

//component for the top-news
Vue.component('best-of-section', {
  template:
  //dropdown parent element, button and content as children
  //used tick marks so I could write on multiple lines
  //v-for is used so I can loop through content array in data
  `<div class="best-of-section-container">
      <h3 id ="best-of-section-header">{{ header }}</h3>
      <table>
        <tr>
          <th v-for="c in content">{{ c.text }}</th>
        </tr>
      </table>
   </div>`,
   //set my text in data function so it can be reactive
   data: function() {
     return {
       header: 'Best Articles by Section for the last _____days',
       content: [
         { text: 'Title' },
         { text: 'Views' },
         { text: 'Section' },
         { text: 'Link' }
       ]
     }
   }
})

//create a new Vue instance
var app = new Vue({
  //point to the main div
  el: '#app',
  data () {
    return {
      info: null,
      days: 1
    }
  },
  mounted () {
    axios

      //.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=snmdoMKyQOEYiyJdWwg8F6xodSq8uU7y')
      .get('https://api.nytimes.com/svc/mostpopular/v2/mostviewed/U.S./1.json?api-key=snmdoMKyQOEYiyJdWwg8F6xodSq8uU7y')
      //.then(response => (this.info = response))
      .then(response => console.log(response))

  }
  /*
  data: {
    results: []
  }*/
})
