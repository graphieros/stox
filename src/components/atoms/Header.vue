<script setup lang="ts">
import { ref } from "vue";
import router from "../../router";

let isModalVisible = ref(false);

function goHome() {
  router.push("/");
}
</script>

<template>
  <header class="header px5">
    <h1 class="white title" @click="goHome()">
      <w-icon class="white">mdi mdi-chart-box-outline</w-icon>
      blueStox
    </h1>
    <w-button outline color="white" @click="isModalVisible = !isModalVisible"
      >à propos</w-button
    >
  </header>
  <w-dialog v-model="isModalVisible" width="400px">
    <w-card class="card-about">
      <w-button
        @click="isModalVisible = !isModalVisible"
        icon="mdi mdi-close"
        absolute
        top
        right
        outline
        color="white"
      ></w-button>
      <h1 class="title mb5">blueStox</h1>
      <h4>
        Réalisé par
        <a href="https://portfolio-alp.graphieros.com" target="_blank"
          >Alec Lloyd Probert</a
        >
      </h4>
      <h4>
        API: <a href="https://alphavantage.co" target="_blank">alpha vantage</a>
      </h4>
      <h6 class="mt10">Alec Lloyd Probert - {{ new Date().getFullYear() }}</h6>
    </w-card>
  </w-dialog>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: var(--blue);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-about {
  background: var(--blue);
  color: white;
  clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 6% 60%, 0% 0%);
}
a {
  color: inherit;
  text-decoration: underline;
}
</style>
