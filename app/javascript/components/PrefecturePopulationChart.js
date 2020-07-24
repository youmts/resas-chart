import { Scatter, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  extends: Scatter,
  mixins: [reactiveProp],
  data: function() {
    return {
      options: {
        title: {
          display: true,
          text: '総人口'
        }
      }
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    chartData() {
      this.render();
    }
  },
  methods: {
    render: function() {
      this.renderChart(
        this.transformChartData(this.chartData),
        this.options
      );
    },
    transformChartData: function(chartData) {
      return {
        datasets: chartData.datasets.map((dataset) => this.transformDataset(dataset))
      };
    },
    transformDataset: function(dataset) {
      return {
        ...dataset,
        showLine: true
      };
    }
  }
}