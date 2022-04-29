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
    state.questdata = { ...questdata, [item.name]: item.obj }
  },
}

export const actions = {
  addQuestItem({ commit }) {
    const item = {
      name: 'hhh',
      obj: { x: 500, y: 200, reqs: ['abc', 'def'] },
    }
    commit('addQuest', item)
  },
}
