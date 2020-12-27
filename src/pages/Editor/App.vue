<template>
  <v-app>
    <heatmap-editor></heatmap-editor>
  </v-app>
</template>

<script>
import HeatmapEditor from "../../components/HeatmapEditor";

export default {
  name: 'App',
  components: {HeatmapEditor},
  data: () => ({
    //
  }),
};
</script>

<style>
  :root {
    --theme-white: #E3E2DF;
    --theme-soft-pink: #E3AFBC;
    --theme-oxblood: #5D001E;
    --theme-brightpink: #EE4C7C;
    --theme-deep-red: #9A1750;
    --keyboard-white: white
  }

  ::selection {
    background: var(--theme-soft-pink); /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
    background: var(--theme-soft-pink); /* Gecko Browsers */
  }
</style>
