import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

interface Address {
  id:       string;
  name:     string;
  tel:      string;
  email:    string;
  address:  string;
}

export default new Vuex.Store({
  state: {
    loginUser:  null as firebase.User | null,
    drawer:     false,
    addresses:  [] as Address[],
  },
  mutations: {
    setLoginUser:     (state, user: firebase.User) => state.loginUser = user,
    deleteLoginUser:  state => state.loginUser = null,
    changeDrawer:     state => state.drawer = !state.drawer,
    addAddress:       (state, {id, address}) => {
                        address.id = id;
                        state.addresses = [...state.addresses, address];
                      },
    updateAddress:    (state, {id,address}) => state.addresses = [...state.addresses.filter( address => address.id !== id ),address],
    deleteAddress:    (state, id) => state.addresses = state.addresses.filter( addr => addr.id !== id )
  },
  actions: {
    // アクションメソッドにはcontextオブジェクトが渡ってくる
    // 引数の、{ commit }という書き方は、context.commitのみを受け取るという意味になる
    toggleSideNav:    ({ commit }) => commit("changeDrawer"),
    addAddress:       async ({ getters, commit }, address: Address) => {
                        if(getters.uid) {
                          const doc = await firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address);
                          commit("addAddress", {id: doc.id, address});
                        }
                      },
    updateAddress:   async ({ getters, commit }, {id, address}) => {
                        if(getters.uid) {
                          await firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address);
                          commit("updateAddress", { id, address });
                        }
                      },
    deleteAddress:    ({ getters, commit }, id ) => {
                        if(getters.uid) {
                          firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).delete();
                          commit("deleteAddress", id);
                        }
                      },
    fetchAddresses:   async ({ getters, commit }) => {
                        const snapshot = await firebase.firestore().collection(`users/${getters.uid}/addresses`).get();
                        snapshot.forEach( doc => commit("addAddress", {id:doc.id, address:doc.data()}));
                      },
    login:            (): void => {
                        const googleAuthProvider: firebase.auth.AuthProvider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithRedirect(googleAuthProvider);
                      },
    setLoginUser:     ({ commit }, user) => commit("setLoginUser",user),
    deleteLoginUser:  ({ commit }) => commit("deleteLoginUser"),
    logout:           () => firebase.auth().signOut(),
  },
  getters: {
    userName: state => state.loginUser?.displayName ?? "",
    photoURL: state => state.loginUser?.photoURL ?? "",
    uid:      state => state.loginUser?.uid,
    getAddressById: state => ( id: string ) => state.addresses.find(address => address.id === id),
  }
});
