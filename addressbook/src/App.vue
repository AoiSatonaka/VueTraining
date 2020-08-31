<template>
  <v-app>
    <v-app-bar app color="#38a068" dark>
      <v-app-bar-nav-icon v-show="$store.state.loginUser" @click="toggleSideNav"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span>マイアドレス帳</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.loginUser" @click.stop="logout" justify-end color="error">ログアウト</v-btn>
    </v-app-bar>
    <SideNav />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from "vuex";
import firebase from "firebase";
import SideNav from "@/components/SideNav.vue";

export default Vue.extend({
  name: 'App',
  components: {
    SideNav,
  },
  created(){
    firebase.auth().onAuthStateChanged( async user => {
      if(user){
        this.setLoginUser(user)
        await this.fetchAddresses();
        if(this.$router.currentRoute.name === "home") this.$router.push({name: "addresses"});
      }
      else{
        this.deleteLoginUser();
        this.$router.push({name: "home"});
      }
    })
  },
  methods: {
    ...mapActions([
      "toggleSideNav",
      "setLoginUser",
      "deleteLoginUser",
      "logout",
      "fetchAddresses"
    ])
  },
  data: () => ({
    //
  }),
});
</script>
