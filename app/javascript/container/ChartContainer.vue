<template>
  <div>
    <b-form-select v-model="selectedPrefCode" :options="prefectures" value-field="prefCode" text-field="prefName" class="chart-container_pref-select">
    </b-form-select>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data: function() {
    return {
      prefectures: [],
      selectedPrefCode: null,
    };
  },
  mounted: async function() {
    await this.loadPrefectures()
  },
  methods: {
    loadPrefectures: async function() {
      const { data } = await axios.get('/api/v1/prefectures')
      this.prefectures = data
    }
  }
})

</script>

<style lang="scss">

.chart-container_pref-select {
  width: 300px;
}

</style>
