import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import customer from './modules/customer'
import newpaper from './modules/newpaper'
import interaction from './modules/interaction'
import expreience from './modules/expreience'
import Thoughtreport from './modules/Thoughtreport'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    customer,
    newpaper,
    interaction,
    expreience,
    Thoughtreport,
  },
  getters
})

export default store
