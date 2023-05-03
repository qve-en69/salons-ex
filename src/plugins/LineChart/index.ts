import { Component, Vue, Mixins } from 'vue-property-decorator';
import { Line, mixins } from 'vue-chartjs';
import { Chart, ChartOptions } from 'chart.js';
const { reactiveProp } = mixins

@Component({
  mixins: [ reactiveProp ]
})
export default class LineChart extends Mixins(Vue, Line, reactiveProp) {
  options: ChartOptions | undefined;
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}