<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import fetchStock from "../functions/fetchStock";
import { store } from "../store";
import Chart from "../components/charts/Chart.vue";

const dataSet = computed(() => {
  return store.state.dataSet;
});

const timeSeries = computed(() => {
  const ts = dataSet.value.timeSeries;
  return (
    Object.keys(ts)
      .reverse()
      .map((key) => [key, ts[key]]) || []
  );
});

const volume = computed(() => {
  return timeSeries.value.map((el) => {
    return el[1]["1. open"];
  });
});

const options = ref({});
let isLoaded = ref(false);

let series = ref([
  {
    name: "Volume",
    data: [...volume.value],
  },
]);

function updateCharts() {
  setTimeout(() => {
    series.value = [
      {
        name: "Volume",
        data: [...volume.value],
      },
    ];
    options.value = {
      ...options.value,
      chart: {
        id: "vuechart-example",
        height: 300,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [...timeSeries.value].map((el) =>
          new Date(el[0]).toLocaleTimeString()
        ),
      },
      noData: {
        text: "Loading...",
      },
    };
    isLoaded.value = true;
  }, 1500);
}

onMounted(() => {
  fetchStock();
  updateCharts();
});
</script>

<template>
  <div class="charts">
    <w-flex class="my5 justify-center align-center">
      <w-button
        v-if="isLoaded"
        @click="
          fetchStock();
          updateCharts();
        "
        ><w-icon class="mr1">mdi mdi-reload</w-icon>Actualiser</w-button
      >
      <w-spinner v-else />
    </w-flex>

    <w-flex wrap v-if="isLoaded">
      <w-flex class="xs12 md6 pa10">
        <w-card class="chart-wrapper">
          <Chart chartType="area" :options="options" :series="series" />
        </w-card>
      </w-flex>
      <w-flex class="xs12 md6 pa10">
        <w-card class="chart-wrapper">
          <Chart chartType="line" :options="options" :series="series" />
        </w-card>
      </w-flex>
    </w-flex>
  </div>
</template>

<style lang="scss" scoped>
.charts {
  padding-top: 60px;
}
.chart-wrapper {
  align-items: center;
  position: relative;

  width: 100%;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#stox-chart {
  max-width: 650px;
}
</style>
