<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>連絡先一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 text-xs-right>
        <router-link :to="{name: 'address_edit'}" tag="button">
          <v-btn color="info">連絡先追加</v-btn>
        </router-link>  
      </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table
          :headers="headers"
          :items="addresses"
        >
          <template v-slot:item.action="{ item }">
            <router-link :to="{ name: 'address_edit', params: { address_id: item.id}}" >
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
              <v-icon small class="mr-2" @click.stop="deleteConfirm(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      headers:[
        { text: "名前", value:"name", align: "center"},
        { text: "電話番号", value:"tel", align: "center"},
        { text: "メールアドレス", value:"email", align: "center"},
        { text: "住所", value:"address", align: "center"},
        { text: "操作", value: "action", sortable: false, align: "center" }
      ],
      // addresses:[],
    }
  },
  // created() {
  //   this.addresses = this.$store.state.addresses.;
  // },
  computed: {
    addresses() {return this.$store.state.addresses;}
  },
  methods: {
    deleteConfirm(id: string) {
      if(confirm("削除してもよろしいですか？")) this.deleteAddress(id)
    },
    ...mapActions(["deleteAddress"]),
  },
})
</script>

<style lang="sass">
a
  text-decoration: none
</style>