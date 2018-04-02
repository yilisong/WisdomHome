import * as types from './type/menu-type';

const state = {
  // url: 'http://192.168.0.5:8083',
  url: 'http://10.168.4.105:8083',
  activeArr: ['active', '', '', '', '', ''],
  showEquipmentStatus: true
};
const actions = {
  setMenuStatus ({ commit, state }, params) {
    commit(types.SET_MENU_STATUS, { params });
  },
  showEquipment ({ commit, state }, params) {
    commit(types.SHOW_EQUIPMENT, { params });
  }
};
const mutations = {
  [types.SET_MENU_STATUS] (state, { params }) {
    state.activeArr = params
  },
  [types.SHOW_EQUIPMENT] (state, { params }) {
    state.showEquipmentStatus = params
  }
};

export default {
    state,
    actions,
    mutations
};
