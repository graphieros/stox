<script setup lang="ts">
import Header from "./components/atoms/Header.vue";
import { store } from "./store/index";
import { ref } from "vue";

let debounceTimer = ref();

(function onResize(): void {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    const windowWidth = window.innerWidth;
    store.commit("UPDATE_FIELD", {
      field: "isMobile",
      val: windowWidth <= 600,
    });
    store.commit("UPDATE_FIELD", {
      field: "isTablet",
      val: windowWidth <= 1200 && windowWidth > 600,
    });
  }, 250);
})();
</script>

<template>
  <w-app id="app">
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </w-app>
</template>

<style>
:root {
  --blue: rgb(27, 51, 102);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

.title {
  font-family: "Source Code Pro", monospace;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
