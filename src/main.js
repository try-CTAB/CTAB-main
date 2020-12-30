import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import promotionalPage from "./components/promotionalPage";
import CtabEditor from "./components/CtabEditor";
import plainCTAB from "./components/plainCTAB";

Vue.config.productionTip = false;
Vue.use(VueRouter);


const routes = [
  { path: '/', component: promotionalPage, name: 'promotional' },
  { path: '/editor', component: CtabEditor, name: 'editor' },
  { path: '/plain-CTAB', component: plainCTAB, name: 'html-CTAB', props: true }
];

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
