import { Scatter, mixins } from 'vue-chartjs'
import 'chartjs-plugin-colorschemes'
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
        },
        plugins: {
          colorschemes: {
            scheme: 'brewer.PastelTwo8'

          }
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
        // NOTE: showLine: true など、固有の設定を追加して描画に用いる
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