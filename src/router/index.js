import Vue from 'vue'
import Router from 'vue-router'

import index from '@/views/index'
import person from '@/views/person'
import house from '@/views/house'
import equipment from '@/views/equipment'
import faceToface from '@/views/faceToface'
import blackNames from '@/views/blackNames'
import houseDetails from '@/views/houseDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/person',
      name: 'person',
      component: person
    },
    {
      path: '/house',
      name: 'house',
      component: house
    },
    {
      path: '/houseDetails',
      name: 'houseDetails',
      component: houseDetails
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: equipment
    },
    {
      path: '/faceToface',
      name: 'faceToface',
      component: faceToface
    },
    {
      path: '/blackNames',
      name: 'blackNames',
      component: blackNames
    }
  ]
})
