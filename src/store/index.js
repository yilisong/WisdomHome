import Vue from 'vue';
import Vuex from 'vuex';

import menuStatus from './menu';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        menuStatus
    }
});

export default store;
