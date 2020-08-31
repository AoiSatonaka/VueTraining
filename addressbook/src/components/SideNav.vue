<template>
  <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
    <v-list class="pa-1">
      <v-list-item>
        <v-list-item-avatar>
          <img :src="photoURL" v-if="photoURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-item v-for="item in items" :key="item.title" :to="item.link">
        <v-list-item-action>
          <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  data() {
    return {
      items: [
        { title: "連絡先一覧", icon: "format-list-bulleted", link: {name: "addresses"} },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "userName",
      "photoURL"
    ])
  }
}
);
</script>