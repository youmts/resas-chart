<template>
  <div>
    <b-form-select v-model="selectedPrefCode" :options="prefectures" value-field="prefCode" text-field="prefName" class="chart-container_pref-select">
    </b-form-select>
    <PrefecturePopulationChart v-if="!!populations" :chartData="populations"></PrefecturePopulationChart>
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
      selectedPrefCode: null,
      populations: null,
      apiCache: new Map()
    };
  },
  mounted: async function() {
    await this.loadPrefectures()
  },
  watch: {
    selectedPrefCode: async function(newPrefCode) {
      if (!newPrefCode) {
        return;
      }

      const data = await this.cachedGet(`/api/v1/prefectures/${newPrefCode}/populations`);
      const array = data.map((item) => { return { x: item.year, y: item.value } });
      this.populations = {
        datasets: [
          {
            label: newPrefCode,
            data: array,
          }
        ]
      };
    }
  },
  methods: {
    loadPrefectures: async function() {
      this.prefectures = await this.cachedGet('/api/v1/prefectures');
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
  width: 300px;
}

</style>
