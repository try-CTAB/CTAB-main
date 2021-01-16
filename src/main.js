import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import promotionalPage from "./components/promotionalPage";
import CtabEditor from "./components/CtabEditor";
import plainCTAB from "./components/plainCTAB";
import svgCTAB from "./components/svgCTAB";
import CTABchecker from "./components/CTABchecker";

Vue.config.productionTip = false;
Vue.use(VueRouter);


const routes = [
  { path: '/', component: promotionalPage, name: 'promotional' },
  { path: '/editor', component: CtabEditor, name: 'editor' },
  { path: '/plain-CTAB', component: plainCTAB, name: 'html-CTAB', props: true },
  { path: '/svg-CTAB', component: svgCTAB, name: 'svg-CTAB', props: true },
  { path: '/check-CTAB', component: CTABchecker, name: 'CTAB-checker' }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
