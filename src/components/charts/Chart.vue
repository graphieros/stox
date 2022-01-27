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
      :width="windowWidth * 0.7"
      height="400"
      :type="chartType"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<style lang="scss">
.chart {
  padding: 20px;
  background: radial-gradient(at top, rgba(255, 255, 255, 0.356), white);
  border-radius: 3px;
  box-shadow: 0px 10px 20px -10px var(--blue);
  svg {
    background: white !important;
    border-radius: 3px !important;
  }
}
</style>
