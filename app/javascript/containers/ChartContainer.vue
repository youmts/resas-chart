<template>
  <div>
    <b-row>
      <b-col cols="2" class="p-4">
        <b-list-group>
          <b-list-group-item v-for="pref in prefectures" :key="pref.prefCode" :active="pref.selected" button @click="handleSelectPref(pref)">
            {{pref.prefName}}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>
        <PrefecturePopulationChart v-if="populations.datasets.length > 0" :chartData="populations" class="chart-container_pref-population-chart"></PrefecturePopulationChart>
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
      populations: null,
      apiCache: new Map()
    };
  },
  mounted: async function() {
    this.prefectures = await this.loadPrefectures()
  },
  computed: {
    selectedPrefectures: function () {
      return this.prefectures.filter((pref) => pref.selected)
    }
  },
  watch: {
    selectedPrefectures: async function(newPrefs) {
      // NOTE: computed内でasyncが使えないので、watchでpopulationsをリアクティブに更新する
      const datasets = await Promise.all(newPrefs.map(async (pref) => {
        return {
          label: pref.prefName,
          data: await this.loadPopulations(pref.prefCode),
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
      const data = await this.cachedGet('/api/v1/prefectures');
      return data.map((item) => { return { ...item, selected: false } });
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
    },
    handleSelectPref: function(pref) {
      pref.selected = !pref.selected;
    },
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
