<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style>
  body {
    background-color: var(--theme-white);
  }

  /*::-webkit-scrollbar {*/
  /*  display: none;*/
  /*}*/

  :root {
    --theme-white: #E3E2DF;
    --theme-soft-pink: #E3AFBC;
    --theme-oxblood: #5D001E;
    --theme-brightpink: #EE4C7C;
    --theme-deep-red: #9A1750;
    --theme-brown: #2d231c;
    --theme-reddish: #E40044;
    --keyboard-white: white
  }

  ::selection {
    background: var(--theme-soft-pink); /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
    background: var(--theme-soft-pink); /* Gecko Browsers */
  }
</style>
