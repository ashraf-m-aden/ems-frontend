<template>
  <div>
    <vue-frappe
      id="test"
      :labels="labels"
      :title="title"
      type="axis-mixed"
      :height="300"
      :colors="['purple', '#ffa3ef', 'light-blue']"
      :dataSets="data"
            :discreteDomains="true"
            :tooltipOptions="tooltipOptions"

    >
    </vue-frappe>
  </div>
</template>

<script>
import { VueFrappe } from 'vue2-frappe'

export default {
  components: {
    VueFrappe
  },
  props: ['data', 'labels', 'title', 'id', 'colors'],
  data () {
    return {
      output: null,
      tooltipOptions: {
        required: false,
        type: Object,
        default: () => {
          return {
            formatTooltipX: (d) => (d + '').toUpperCase(),
            formatTooltipY: (d) => d + ' fdj'
          }
        }
      }

    }
  }
}
</script>
