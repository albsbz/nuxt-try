<template>
        <div>
            <canvas ref="canvas" width="900" style="height: 30vh" class="mb2"></canvas>  
        </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
export default {
    extends: Bar,
    props:{
        labels: {
            type: Array,
            required:true,
            default(){
                return[]
            }
        },
        data: {
            type: Array,
            required:true,
            default(){
                return[]
            }
        },
        name: {
            type: String,
            required:true
        }
    },
    data(){
        return{
            chartdata: {
            labels: this.$props.labels,
            datasets: [
                {
                label: this.$props.name,
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: this.$props.data
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }},
    mounted() {
        this.renderChart(this.chartdata, this.options)
        
    }
}
</script>