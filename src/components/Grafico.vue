<template>
  <v-card class="justify-center" width="600px" >
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </v-card>
  
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: [ 'January', 'February', 'March' ],
          datasets: [ { data: [40, 15, 12] } ]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
  </script>