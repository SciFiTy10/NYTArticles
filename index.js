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
      <a href="#" v-for="c in content" v-model="dropdownLabel">{{ c.text }}</a>
    </div>
   </div>`,
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
//props: ['info'],
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
   watch:{
     loaded: function(){
       
       if(this.loaded){
         console.log('check passed');
         this.drawChart();
         console.log('drawing chart');
         console.log('the value of the props is: '+this.data + ' and ' + this.labels);
       }

     }
      /*loaded(isLoaded){
          if(isLoaded){
              this.drawChart();
          }
      }*/
  },

   //ATTEMPTING TO PIN THE PROP VALUES ABOVE TO LABELS AND DATA
    props: ['labels', 'totalViews', 'loaded'],
    //set my text in data function so it can be reactive
    data: function() {
      return {
        header: 'Most Popular NYT Articles of the ',
        subHeader: 'Health / Opinion / U.S.'
        //dataLabels: this.labels,
        //views: this.totalViews

      }//end of return
    },//end of data
    methods: {
      drawChart: function(text){
        //console.log('the value of dataLabels is: '+ this.dataLabels);
        var ctx = document.getElementById('viewGraph').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            labels: this.dataLabels,
            datasets: [{
              label: '# of Views',
              //data: [12, 19, 3, 5, 2, 3],
              data: this.views,
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
      }
    },
   //start of mounted
   //mounted: function(){


   //},//end of mounted function


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
       header: 'Best Articles by Section for the ',
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
      info: '',
      loading: true,
      errored: false,
      labels: ['Health', 'Magazine', 'Opinion', 'Smarter Living', 'U.S.', 'World'],
      totalViews: [],
      loaded: false
    }
  },
  created: function(){
    this.loadData(1, this.labels);
  },
  methods: {
    //for making the default API call
    loadData: function(time, labels){
      //baseURL string
      const baseURL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/';
      //timeframe
      const timeFrame = String(time);
      //middle middleURL
      const middleURL = '.json?api-key=';
      //API key
      const key = 'snmdoMKyQOEYiyJdWwg8F6xodSq8uU7y';

      axios
        .get(baseURL + timeFrame + middleURL + key)
        //.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=snmdoMKyQOEYiyJdWwg8F6xodSq8uU7y')
        //.get('https://api.nytimes.com/svc/mostpopular/v2/mostviewed/U.S./1.json?api-key=snmdoMKyQOEYiyJdWwg8F6xodSq8uU7y')
        .then(response => {
          //this.info = response.data.results[0].section
          this.info = response.data.results
          console.log(this.info.length)
          this.getTotalViews(this.info);
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },//end of loadData

    //for pulling the data from the resulting array
    getTotalViews: function(info){
        console.log(info);
        //set total variables to stash before we go into the final data array
        //originally had this as var totalHealth, totalMagazine, etc = 0 but
        //it threw undefined issue when I was checking totals
        var totalHealth = 0;
        var totalMagazine = 0;
        var totalOpinion = 0;
        var totalSmarterLiving = 0;
        var totalUS = 0;
        var totalWorld = 0;
        console.log('info length is: ' + info.length);
        //loop through each of the defaultLabels and get their view count
        for(var i = 0; i < info.length-1; i++){
            //if this.info[i].section ==
            switch(info[i].section) {
              case 'Health':
              //add to the total
              totalHealth+=info[i].views
              break;
              case 'Magazine':
              //add to the total
              totalMagazine+=info[i].views
              break;
              case 'Opinion':
              //add to the total
              totalOpinion+=info[i].views
              break;
              case 'Smarter Living':
              //add to the total
              totalSmarterLiving+=info[i].views
              break;
              case 'U.S.':
              //add to the total
              totalUS+=info[i].views
              break;
              case 'World':
              //add to the total
              totalWorld+=info[i].views
              break;
              }
        }//end of for loop
        //console.log('total health views: ' + totalHealth);
        //add these values to the array
        this.totalViews = [totalHealth, totalMagazine, totalOpinion, totalSmarterLiving, totalUS, totalWorld];

        //set loaded to true
        this.loaded = true;
    }//end of defaultData

  }//end of methods
})
