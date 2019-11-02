import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
        player: "",
        maxRound: "",
        chip:"",
        minBet: "",
        ranking: [],
      },
      mutations: {
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
      }
    }
  }
})
