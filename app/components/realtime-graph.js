
import Component from '@ember/component';
import Pusher from 'npm:pusher-js';
import Chart from 'npm:chart.js';

export default Component.extend({
  init() {
    this._super(...arguments);
    
    var chart;
    initializeChart();
    
    function initializeChart() {
      var ctx = document.getElementById('chart').getContext('2d');
      const data = {
        labels: [],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            data: [],
        }]
      };
      chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Time  '
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Price'
                },
                ticks: {
                  min: 504,
                  max: 507
              }
              }
            ]
          }
        }
      })
    }
    // we will update the chart here


    const pusher = new Pusher('734ff5d8f1e5ed1dd419', { // update your APP_KEY
        cluster: 'us2',
        encrypted: true
      })
      
      const channel = pusher.subscribe('trade');
      channel.bind('stock', data => {
      chart.data.labels.push(data.Timestamp.split(' ')[1].split('.')[0]);
      chart.data.datasets[0].data.push(data.Price);
      chart.update();
      })
  }
});