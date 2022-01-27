<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import fetchStock from "../functions/fetchStock";
import { store } from "../store";
import Chart from "../components/charts/Chart.vue";
import functions from "../functions";

let isLoaded = ref(false);

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
    return el[1]["5. volume"];
  });
});

const dataSourceOHLC = computed<any>(() => {
  const OHLC = timeSeries.value.map((el, i) => {
    return [
      el[1]["1. open"],
      el[1]["2. high"],
      el[1]["3. low"],
      el[1]["4. close"],
    ];
  });
  const timeOHLC = [...timeSeries.value].map((el) => new Date(el[0]).getTime());

  return OHLC.map((el, i) => {
    return {
      x: functions.toFrenchDate(timeOHLC[i]),
      y: el,
    };
  });
});

const candleOptions = ref({});

let candleSeries = ref([
  {
    name: "Loading...",
    data: [0],
  },
]);

function updateCharts() {
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
.charts {
  height: 100%;
  padding-top: 60px;
  background: radial-gradient(at top, var((--blue)), white);
}
.chart-wrapper {
  display: flex;
  justify-content: center;
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
