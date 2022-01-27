<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import fetchStock from "../functions/fetchStock";
import { store } from "../store";
import Chart from "../components/charts/Chart.vue";
import functions from "../functions";
import { UnknownObj } from "../types";

let isLoaded = ref(false);

const dataRanges = [
  { label: "5" },
  { label: "10" },
  { label: "15" },
  { label: "20" },
  { label: "30" },
  { label: "50" },
  { label: "75" },
  { label: "100" },
];

let rangeSelection = ref<string | number>();

const dataSet = computed(() => {
  return store.state.dataSet;
});

const timeSeries = computed<any>(() => {
  const series = dataSet.value.timeSeries;
  return (
    Object.keys(series)
      .reverse()
      .map((key) => [key, series[key]]) || []
  );
});

const dataSourceOHLC = computed<any>(() => {
  const OHLC: string[][] = timeSeries.value
    .map((el: { [x: string]: any }[]) => {
      return [
        el[1]["1. open"],
        el[1]["2. high"],
        el[1]["3. low"],
        el[1]["4. close"],
      ];
    })
    .slice(-Number(rangeSelection.value));

  const timeOHLC = [...timeSeries.value]
    .map((el) => new Date(el[0]).getTime())
    .slice(-Number(rangeSelection.value));

  return OHLC.map((ohlc, i) => {
    return {
      x: functions.toFrenchDate(timeOHLC[i]),
      y: ohlc,
    };
  });
});

const candleOptions = ref<UnknownObj>({});

let candleSeries = ref([
  {
    name: "Loading...",
    data: [0],
  },
]);

function updateCharts(time: number): void {
  const title = () => {
    const stockName = dataSet.value.metaData["2. Symbol"];
    const stockInfo = dataSet.value.metaData["1. Information"];
    return `${stockName} - ${stockInfo}`;
  };

  setTimeout(() => {
    candleSeries.value = [
      {
        name: "High",
        data: dataSourceOHLC.value,
      },
    ];
    candleOptions.value = {
      ...candleOptions.value,
      chart: {
        id: "candles",
        height: 300,
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#1B3366",
            downward: "#FF6347",
          },
        },
      },

      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          style: {
            fontSize: "8px",
          },
        },
      },
      noData: {
        text: "Loading...",
      },
      title: {
        text: title(),
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Times New Roman",
          color: "#263238",
        },
      },
    };

    isLoaded.value = true;
  }, time);
}

onMounted(() => {
  fetchStock();
  updateCharts(1500);
});
</script>

<template>
  <div class="charts">
    <w-flex class="my5 justify-center align-center">
      <div v-if="isLoaded">
        <w-button
          @click="
            fetchStock();
            updateCharts(1500);
          "
          ><w-icon class="mr1">mdi mdi-reload</w-icon>Actualiser</w-button
        >
        <w-select
          class="mt5"
          :items="dataRanges"
          bg-color="blue-light5"
          color="blue-dark3"
          v-model="rangeSelection"
          @input="updateCharts(1)"
        >
          Nombre de données
        </w-select>
      </div>

      <w-spinner v-else />
    </w-flex>

    <w-flex wrap v-if="isLoaded">
      <w-flex class="xs12 pa10">
        <div class="chart-wrapper">
          <Chart
            chartType="candlestick"
            :options="candleOptions"
            :series="candleSeries"
          />
        </div>
      </w-flex>
    </w-flex>
  </div>
</template>

<style lang="scss" scoped>
#stox-chart {
  max-width: 650px;
}
.charts {
  background: radial-gradient(at top, var((--blue)), white);
  height: 100%;
  padding-top: 60px;
}
.chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.spinner {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
