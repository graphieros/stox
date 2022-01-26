<script setup lang="ts">
import router from "../router";

function goToChart() {
  router.push("/charts");
}
</script>

<template>
  <section class="home">
    <div class="side-decoration"></div>
    <w-flex wrap class="justify-center align-center home-pannel-wrapper">
      <w-flex class="xs12 md6 align-center justify-center home-pannel-left">
        <w-card class="left-card">
          <div>
            <h1 class="title blue-dark5">
              <w-icon class="home-card-icon" size="100"
                >mdi mdi-chart-bar</w-icon
              >
            </h1>
          </div>
        </w-card>
      </w-flex>
      <w-flex class="xs12 md6 align-center justify-center home-pannel-right">
        <w-flex wrap class="xs12">
          <w-flex class="xs12 justify-start mb12">
            <h1 class="blue-dark5" align="left">
              <strong class="title-level-1">L'ACTU</strong><br />
              <span class="title-level-2">sur les dernières valeurs</span>
              <br />
              <span class="title-level-3">de l'action Big Blue</span>
            </h1>
          </w-flex>
          <w-flex class="xs12 justify-start">
            <w-button
              @click="goToChart()"
              shadow
              class="home-cta"
              height="70"
              width="270"
            >
              <h1><w-icon class="mr2">mdi mdi-eye</w-icon>Voir les graphes</h1>
            </w-button>
          </w-flex>
        </w-flex>
      </w-flex>
    </w-flex>
  </section>
</template>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 60px);
}
.home-pannel-wrapper {
  height: 100%;
}

.side-decoration {
  background: var(--blue);
  clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 60% 60%, 0% 0%);
  display: block;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  width: 80px;
}

.home-pannel-left {
  perspective: 500px;
  .left-card {
    align-items: center;
    animation: flip 3s infinite linear alternate;
    background: radial-gradient(at top right, white, rgb(211, 222, 231));
    box-shadow: 0 20px 20px -10px grey;
    display: flex;
    height: 300px;
    justify-content: center;
    transform-style: preserve-3d;
    transform: rotateY(-25deg);
    width: 300px;

    div {
      align-items: center;
      display: flex;
      height: 100%;
      justify-items: center;
    }

    h1 {
      font-size: 3rem;
    }
  }
  .home-card-icon {
    color: var(--blue);
    text-shadow: -2px 5px 2px white !important;
  }
}

.home-pannel-right {
  padding: 50px;

  .home-cta {
    background: var(--blue);
    transition: transform 0.3s ease-in clip-path 0.3s ease-in;
  }

  .home-cta:hover {
    transform: translateX(10px);
    clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0% 100%, 0 50%, 0% 0%);
  }

  h1 {
    text-shadow: 0 0px 2px white;
  }
  .title-level-1 {
    color: var(--blue);
    font-size: 4.8rem;
  }
  .title-level-2 {
    color: grey;
    font-size: 1.4rem;
  }
  .title-level-3 {
    color: var(--blue);
    font-size: 1.8rem;
  }
}

@keyframes flip {
  0% {
    transform: rotateY(-25deg) rotateX(-10deg);
  }
  100% {
    transform: rotateY(25deg) rotateX(10deg);
  }
}

@media screen and (max-width: 600px) {
  .home-pannel-left {
    margin-top: 90px;
    .left-card {
      height: 200px !important;
      width: 200px !important;
    }
  }
  .side-decoration {
    clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 60% 85%, 0% 0%);
    background: var(--blue);
    display: block;
    width: 40px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
