<script setup lang="ts">
import { UnknownObj } from "../../types";
import { store } from "../../store/index";
import { computed, ref } from "vue";

const isMobile = computed(() => {
  return store.state.isMobile;
});

defineProps<{
  options: UnknownObj;
  series: any;
  chartType: string;
}>();

let windowWidth = ref(0);

(function updateWindowWith() {
  windowWidth.value = window.innerWidth;
})();
</script>

<template>
  <div class="chart">
    <apexchart
      :width="isMobile ? '100%' : windowWidth / 2.5"
      :type="chartType"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<style lang="scss">
.chart {
  background: white;
}
</style>
