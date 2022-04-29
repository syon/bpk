import questdata from '@/db/questdata.json'
import bonddata from '@/db/bonddata.json'

export const state = () => ({
  questdata,
  bonddata,
})

export const getters = {
  questBoxSet(state) {
    return state.questdata
  },
  questBonds(state) {
    return state.bonddata
  },
}

export const mutations = {
  addQuest(state, item) {
    state.questdata = [...questdata, item]
  },
}

export const actions = {
  async load({ commit }) {},
}
