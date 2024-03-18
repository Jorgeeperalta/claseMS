<template>
  <v-card class="justify-center" width="400px">
    <v-card-text>
      <Radar :data="data" :options="options" />
      </v-card-text>

  </v-card>
   
  </template>
  
  <script lang="ts">
  import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Radar } from 'vue-chartjs'
  import * as chartConfig from '../charConfig'
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  )
  
  export default {
    name: 'App',
    components: {
      Radar
    },
    data() {
      return chartConfig
    }
  }
  </script>
  