import Vue from 'vue'
import Vonic from 'vonic'
import VueResource from 'vue-resource'
import moment from 'moment'

// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'

// Routes
const routes = {
  '/': {
    component: Index
  },

  '/about': {
    component: About
  }
}

Vue.use(require('vue-moment'));
Vue.use(Vonic.app, {routes: routes, defaultRouteUrl: '/'})
Vue.use(VueResource);