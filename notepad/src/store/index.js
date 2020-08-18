import Vue from 'vue';
import Vuex from 'vuex';
import createdPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createdPersistedState(),
    ],
    state: {
        memos: [
            { id: 1, body: "sample memo" }
        ]
    },
    mutations: {
        save(state, memo) {
            const nextId = state.memos.length + 1;
            state.memos.push({ id: nextId, body: memo });
        },
        update(state, data) {
            const x = state.memos.find(memo => memo.id === parseInt(data.id));
            x.body = data.body;
        },
        remove(state, id) {
            state.memos =
                state.memos
                    .filter(memo => memo.id != parseInt(id))
                    .map((memo, ind) => {return {id: ind +1, body:memo.body}});
        }
    }
})