//component for the navbar
Vue.component('navbar', {
  //build a template which we will refer to in html
  //header text refers to data below
  template: '<div id="navbar"><h1> {{ header }} </h1></div>',
  //data has to be a function in a component
  //header text is in this component so it can be reactive if changed
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
  //v-for directive is used so I can loop through content array in data
  `<div class="dropdown">
    <button class="dropbtn">{{ dropdownLabel }}</button>
    <div class="dropdown-content">
      <a href="#" v-for="c in content" v-model="dropdownLabel" @click="newTime(c.id)">{{ c.text }}</a>
    </div>
   </div>`,
   //methods property for storing our reusable methods
   methods: {
     //onclick we catch the id of the object from the content array
     newTime: function(id){
       //pass this value on to the parent method in our main vue instance
       this.$parent.newTime(id);
     }
   },
   //data option holds our dropdownLabel text, and the content array
   data: function() {
     return {
       dropdownLabel: 'Select a time period',
       content: [
         {
           id: 1,
           text: 'Yesterday'
         },
         {
           id: 7,
           text: 'Last 7 Days'
          },
         {
           id: 30,
           text: 'Last 30 Days'
          }
       ]
     }
   }
})

//component for the filter section
Vue.component('section-filter', {
  template:
  //filter parent container, filter-main area, and filter-checkbox container as children
  //used tick marks so I could write on multiple lines
  //v-for is used so I can loop through content array in data option
  `<div class="filter-container">
    <h3 id="filter-header">{{ header }}</h3>
    <div class="filter-main">
      <label id = "checkboxLabel" class="filter-checkbox" v-for="c in content">{{ c.text }}
        <input id = "input" type="checkbox" checked @change="onChange">
        <span class="checkmark"></span>
      </label>
    </div>
   </div>`,
   methods: {
     //onChange, receive data as input
     onChange: function(e){
       //capture whether the checkbox was checked
       var checked = e.target.checked;
       //store the parent label's text element so we know which section
       var text = e.target.parentElement.textContent;
       //pass these values to the parent's (main vue instance) onChange method
       this.$parent.onChange(checked, text);
     }
   },
   //set the text in data function so it can be reactive
   data: function() {
     return {
       header: 'Choose your sections',
       //text for the filter section labels
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
    <h4 id="graph-subHeader">{{ slashed }}</h4>
    <canvas id = "viewGraph"></canvas>
   </div>`,
   //watch property is used to listen for a change in the loaded variable (below in main vue instance)
   //had to use this variable to account for asynchronous calls to API
   //if there was no loaded variable, the call to the API would start, but
   //my props and other data reliant on the API would return prior to the response data being returned
   watch:{
     loaded: function(){
       //if loaded is set to true (response has come back)
       if(this.loaded){
         //call our drawChart function for buildng the myChart object with config settings
         this.drawChart();
       }//end of if
     },//end of loaded
     data: function(){
       this.drawChart();
     }
  },
  //computed property caches this information, so it's helpful have the header and subHeader
  //quickly react to changes made in the vue instance
  computed: {
    // function for taking the subheader and inputting slashes inbetween
    slashed: function () {
      var newString = '';
      newString = this.labels.join(' / ');
      return newString
    },
    //setting our chart data to computed provides quick reactivity for the data coming in as props
    chartData: function(){
      return this.data;
    },
    header: function(){
      return 'Most Popular NYT Articles ' + this.text;
    }
  },
  //call drawChart when the component is mounted
  mounted: function(){
    this.drawChart();

  },//end of mounted function
    //props passed from the main vue instance below
    props: ['labels', 'data', 'loaded', 'text'],
    methods: {
      //drawChart function referenced above
      drawChart: function(){
        //create a connection between this function and the id in the canvas element above
        var ctx = document.getElementById('viewGraph').getContext('2d');
        //create chart object and begin config detail
        var myChart = new Chart(ctx, {
          //bar chart
          type: 'bar',
          data: {
            //set labels passed as props
            labels: this.labels,
            datasets: [{
              //label above in the legend
              label: '# of Views',
              //reference to chartData from above
              data: this.chartData,
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
            //set events to empty so that the graphs would stop glitching on mouseover
            events: [],
            responsive: true,
            maintainAspectRatio: true,
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
                     //label for the yAxes
                     labelString: 'Total Views'
                   }//end of scaleLabel
                 }],//end of yAxes

               xAxes: [{
                   scaleLabel: {
                     display: true,
                     fontStyle: "bold",
                     fontColor: 'black',
                     fontSize: 20,
                     //label for the xAxes
                     labelString: 'Section'
                   }//end of scaleLabel
                 }]//end of xAxes
               }//end of scales
             }//end of options
           });//end of chart instance
      }
    }//end of methods
})//end of component

//component for the top-news
Vue.component('best-of-section', {
  template:
  //dropdown parent element, button and content as children
  //used tick marks so I could write on multiple lines
  //v-for is used so I can loop through content array in data
  //used v-if and v-else to determine whether the article url was n/a
  //if so, no button is given to open a link
  `<div class="best-of-section-container">
      <table>
        <tr>
          <th class="headerRow" v-for="c in content">{{ c.text }}</th>
        </tr>
        <tr class = "tableRow" v-for="article in articles">
          <td>{{ article.section }}</td>
          <td class="viewsAndURL">{{ article.views }}</td>
          <td id="titleColumn">{{ article.title }}</td>

          <div v-if="article.url === 'N/A'">
            {{ article.url }}
          </div>
          <div v-else>
          <td class="viewsAndURL"><a target="_blank" :href="article.url"><img src="https://img.icons8.com/ios-glyphs/30/000000/arrow.png"></a></td>
          </div>

        </tr>
      </table>
   </div>`,
   //similar to loaded up top, we use ready for the API call made for the article section
   props: ['ready', 'articles'],
   //here we check whether our ready variable has been set to true before proceeding
   watch: {
     ready: function(){
       if(this.ready){
         console.log(this.articles);
       }
     }
   },
   //set my text in data function so it can be reactive
   data: function() {
     return {
       content: [
         { text: 'Section' },
         { text: 'Views' },
         { text: 'Title' },
         { text: 'Link' }
       ],
       articles: this.articles
     }
   }
})

//create a main Vue instance
var app = new Vue({
  //point to the main div in our html
  el: '#app',
  data () {
    return {
      info: '',
      loading: true,
      errored: false,
      //labels and backup labels are intentionally matched as is data and backupData
      //the main labels and data properties are reduced when the user unchecks in the filter
      //the backupLabels and backupData are there so when the user checks a box
      //labels are reinserted, and the data stays with the correct label
      labels: ['Health', 'Magazine', 'Opinion', 'Smarter Living', 'U.S.', 'World'],
      backupLabels: ['Health', 'Magazine', 'Opinion', 'Smarter Living', 'U.S.', 'World'],
      data: [],
      backupData: [],
      //here are our boolean flags mentioned above
      //loaded is for the main graph api call
      //ready is for the article api call
      loaded: false,
      ready: false,
      //default text for the end of the string in the graph header
      text: 'from Yesterday',
      articles: []
    }
  },
  //on the created property, we launch the loadData method which calls the API for our main graph data
  created: function(){
    this.loadData(1);
  },
  mounted: function(){
    this.ready = true;
  },
  //this method is for when a new time is selected in the dropdown
  //this changes the graph text and pushes the number required in the api for time
  methods: {
    newTime: function(id){
      //we are taking this id and setting the new text for the header
      //as well as passing this on to the API call for a new time setting
      var newText = '';
      //change the text
      switch(id){
        //if id is 1
        case 1:
        //set the text = 'from Yesterday'
        newText = 'from Yesterday';
        this.text = newText;
        break;
        //if id is 7
        case 7:
        //set the text = 'from Yesterday'
        newText = 'of the Last 7 Days';
        this.text = newText;
        break;
        //if id is 30
        case 30:
        //set the text = 'from Yesterday'
        newText = 'of the Last 30 Days';
        this.text = newText;
        break;
      }//end of switch

      //now we pass this into the API call to get new results
      this.loadData(id);
    },
    //onChange is for checking and unchecking the checkbox filters
    //this manages the bars shown in the graph and the labels on the xAxes
    //a boolean for whether the checkbox is checked, and the label text is passed in
    onChange: function(checked, text){
        //we need if-else logic to decide whether to add this to the array or remove it
        //if checked is false
        if(!checked){
          //trim the spaces to the left
          text = text.trimLeft();
          //trim the spaces to the right
          text = text.trimRight();

          //create a copy of the labels array
          //this is for maintaining good data immutability
          var newLabels = this.labels.slice();

          //create a copy of the  data array
          var newData = this.data.slice();

          //get the index of the passed text
          var index = newLabels.indexOf(text);

          //check if index is > -1 (does this exist in the array)
          if(index > -1){

            //then splice that array to remove the element
            newLabels.splice(index, 1);

            //sort this array now to maintain alphabetical order
            newLabels.sort();
            //add the newLabels and overwrite the initial array
            this.labels = newLabels;

            //remove the data for this section
            newData.splice(index, 1);

            //DO NOT SORT
            //add the newData and overwrite the initial data array
            this.data = newData;

          }


        }
        //otherwise checked is true
        else{

            //trim the spaces to the left
            text = text.trimLeft();
            //trim the spaces to the right
            text = text.trimRight();

            //add the text to the end of the array
            this.labels.push(text);
            //sort the array
            this.labels.sort();

            //overwrite the array to re-include the previous value
            //this.labels = newLabels;
            //get the value at the index specified for the data
            var index = this.backupLabels.indexOf(text);

            var addition = this.backupData[index];

            //now we insert that value into the old data array
            this.data.splice(index, 0, addition);

        }


    },
    //for making the default API call
    loadData: function(time){
      //baseURL string
      const baseURL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/';
      //timeframe
      const timeFrame = String(time);
      //middle middleURL
      const middleURL = '.json?api-key=';
      //API key
      const key = 'snmdoMKyQOEYiyJdWwg8F6xodSq8uU7y';

      axios
        //make the call by putting our api request together
        .get(baseURL + timeFrame + middleURL + key)
        //handle response
        .then(response => {
          //this.info = response.data.results[0].section
          this.info = response.data.results
          //call the getTotalViews method needed in our main graph
          this.getTotalViews(this.info);
          //call the getBestArticles method for using this data to gather top articles
          this.getBestArticles(this.info);
        })
        //catch any errors
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        //set loading property to false
        .finally(() => this.loading = false)
    },//end of loadData

    //for pulling the data from the resulting array
    getTotalViews: function(info){
        //set total variables to 0 before we go into the final data array
        //originally had this as var totalHealth, totalMagazine, etc = 0 but
        //it threw undefined issue when I was checking totals
        var totalHealth = 0;
        var totalMagazine = 0;
        var totalOpinion = 0;
        var totalSmarterLiving = 0;
        var totalUS = 0;
        var totalWorld = 0;
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

        //add these total View values to the array
        this.data = [totalHealth, totalMagazine, totalOpinion, totalSmarterLiving, totalUS, totalWorld];

        //copy over this data to the backup array
        this.backupData = this.data.slice();

        //set loaded to true
        //this is going to be passed as a prop up to our watch property above
        this.loaded = true;
    },//end of defaultData

    //function for taking our original api response and determining the top articles for each section
    //here we create objects for each section, and store them all in one array we read from in the
    //article section under our graph
    getBestArticles: function(info){
      //set defaults for all of the highest views thus far
      //see note above for why I didn't just put in one line
      var highestHealthView = 0;
      var highestMagazineView = 0;
      var highestOpinionView = 0;
      var highestSmarterLivingView = 0;
      var highestUSView = 0;
      var highestWorldView = 0;

      //initialize objects for all sections
      var topHealth = {section: 'Health'};
      var topMagazine = {section: 'Magazine'};
      var topOpinion = {section: 'Opinion'};
      var topSmarterLiving = {section: 'Smarter Living'};
      var topUS = {section: 'U.S.'};
      var topWorld = {section: 'World'};

      //loop through this and find the top viewed stories
      for(var i = 0; i < info.length-1; i++){
        //switch statement to check for each section
        switch(info[i].section) {
          case 'Health':
          //check this article's view count against the highest so far
          if(info[i].views > highestHealthView){
            //if highest so far, set the new highest views
            highestHealthView = info[i].views;
            //push everything to the object
            topHealth.title = info[i].title;
            topHealth.views = info[i].views;
            topHealth.url = info[i].url;
          }
          break;
          case 'Magazine':
          //check this article's view count against the highest so far
          if(info[i].views > highestMagazineView){
            //if highest so far, set the new highest views
            highestMagazineView = info[i].views;
            //push everything to the object
            topMagazine.title = info[i].title;
            topMagazine.views = info[i].views;
            topMagazine.url = info[i].url;
          }
          break;
          case 'Opinion':
          //check this article's view count against the highest so far
          if(info[i].views > highestOpinionView){
            //if highest so far, set the new highest views
            highestOpinionView = info[i].views;
            //push everything to the object
            topOpinion.title = info[i].title;
            topOpinion.views = info[i].views;
            topOpinion.url = info[i].url;
          }
          break;
          case 'Smarter Living':
          //check this article's view count against the highest so far
          if(info[i].views > highestSmarterLivingView){
            //if highest so far, set the new highest views
            highestSmarterLivingView = info[i].views;
            //push everything to the object
            topSmarterLiving.title = info[i].title;
            topSmarterLiving.views = info[i].views;
            topSmarterLiving.url = info[i].url;
          }
          break;
          case 'U.S.':
          //check this article's view count against the highest so far
          if(info[i].views > highestUSView){
            //if highest so far, set the new highest views
            highestUSView = info[i].views;
            //push everything to the object
            topUS.title = info[i].title;
            topUS.views = info[i].views;
            topUS.url = info[i].url;
          }
          break;
          case 'World':
          //check this article's view count against the highest so far
          highestWorldView = info[i].views;
          //if highest so far, set the new highest views
          if(info[i].views > highestWorldView){
            //push everything to the object
            topWorld.title = info[i].title;
            topWorld.views = info[i].views;
            topWorld.url = info[i].url;
          }
          break;
        }//end of switch
      }//end of for


      //handle if none of them had articles with views
      //fill in a default title, views, and url property if so
        if(!(topHealth.hasOwnProperty('views'))){
          topHealth.title = 'N/A';
          topHealth.views = 0;
          topHealth.url = 'N/A';
        }
        if(!(topMagazine.hasOwnProperty('views'))){
          topMagazine.title = 'N/A';
          topMagazine.views = 0;
          topMagazine.url = 'N/A';
        }

        if(!(topOpinion.hasOwnProperty('views'))){
          topOpinion.title = 'N/A';
          topOpinion.views = 0;
          topOpinion.url = 'N/A';
        }
        if(!(topSmarterLiving.hasOwnProperty('views'))){
          topSmarterLiving.title = 'N/A';
          topSmarterLiving.views = 0;
          topSmarterLiving.url = 'N/A';
        }
        if(!(topUS.hasOwnProperty('views'))){
          topUS.title = 'N/A';
          topUS.views = 0;
          topUS.url = 'N/A';
        }
        if(!(topWorld.hasOwnProperty('views'))){
          topWorld.title = 'N/A';
          topWorld.views = 0;
          topWorld.url = 'N/A';
        }


      //load the objects for each section into the main articles array
      this.articles = [topHealth, topMagazine, topOpinion, topSmarterLiving, topUS, topWorld];

    }//end of getBestArticles

  }//end of methods
})
