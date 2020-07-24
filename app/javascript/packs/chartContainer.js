import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ChartContainer from '../containers/ChartContainer.vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(ChartContainer)
  }).$mount()
  document.body.appendChild(app.$el)

  console.log(app)
})
