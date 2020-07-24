<template>
  <div>
    <b-row>
      <b-col cols="2" class="p-4">
        <b-form-group description="複数選択できます">
          <b-form-select v-model="selectedPrefCodes" :options="prefectures" multiple value-field="prefCode" text-field="prefName" :select-size="20" class="chart-container_pref-select">
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <PrefecturePopulationChart v-if="!!populations" :chartData="populations" class="chart-container_pref-population-chart"></PrefecturePopulationChart>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import PrefecturePopulationChart from "../components/PrefecturePopulationChart"

export default Vue.extend({
  components: {
    PrefecturePopulationChart,
  },
  data: function() {
    return {
      prefectures: [],
      selectedPrefCodes: [],
      populations: null,
      apiCache: new Map()
    };
  },
  mounted: async function() {
    this.prefectures = await this.loadPrefectures()
  },
  watch: {
    selectedPrefCodes: async function(newPrefCodes) {
      const datasets = await Promise.all(newPrefCodes.map(async (prefCode) => {
        return {
          label: this.findPrefName(prefCode),
          data: await this.loadPopulations(prefCode),
        };
      }));

      this.populations = {
        datasets
      };
    }
  },
  methods: {
    findPrefName: function(prefCode) {
      return this.prefectures.find((prefecture) => prefecture.prefCode === prefCode).prefName;
    },
    loadPrefectures: async function() {
      return await this.cachedGet('/api/v1/prefectures');
    },
    loadPopulations: async function(prefCode) {
      const data = await this.cachedGet(`/api/v1/prefectures/${prefCode}/populations`);
      return data.map((item) => { return { x: item.year, y: item.value } });
    },
    cachedGet: async function(path) {
      if(this.apiCache.has(path)) {
        return this.apiCache.get(path);
      }

      const { data } = await axios.get(path);
      this.apiCache.set(path, data);
      return data;
    }
  }
})

</script>

<style lang="scss">

.chart-container_pref-select {
  height: 500px;
}

.chart-container_pref-population-chart {
  width: 600px;
}

</style>
