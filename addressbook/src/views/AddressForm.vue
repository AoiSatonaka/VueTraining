<template>
 <v-container text-xs-center>
   <v-layout row wrap justify-center>
     <v-flex xs12>
       <h1>連絡先編集</h1>
     </v-flex>

     <v-flex xs5 mt-5>
       <v-card>
         <v-card-text>
           <v-form>
            <v-text-field v-model="address.name" label="名前"></v-text-field>
            <v-text-field v-model="address.tel" label="電話番号"></v-text-field>
            <v-text-field v-model="address.email" label="メールアドレス"></v-text-field>
            <v-text-field v-model="address.address" label="住所"></v-text-field>
            <v-btn @click.stop="$router.push({name: 'addresses'})" >キャンセル</v-btn>
            <v-btn color="info" @click.stop="submit">保存</v-btn>
          </v-form>
         </v-card-text>
       </v-card>
     </v-flex>
   </v-layout>
 </v-container>
</template>
<script lang="ts">
import {mapActions, mapGetters} from 'vuex';
import Vue from "vue";

export default Vue.extend({
  created() {
    this.id = this.$route.params.address_id;
    if(!this.id) return;

    const address = this.getAddressById(this.id);
    address
      ? this.address = address
      : this.$router.push({ name: "addresses" })
    
  },
  data() {
    return {
      id : "",
      address: {}
    }
  },
  methods: {
    submit() {
      this.id
        ? this.updateAddress({id: this.id, address: this.address})
        : this.addAddress(this.address);
      this.$router.push({name: "addresses"});
      this.id = "";
      this.address = {};
    },
    ...mapActions(["addAddress", "updateAddress"])
  },
  computed: {
    ...mapGetters(["getAddressById"])
  }
})
</script>

<style lang="sass" scoped>
h1
  text-align: center
</style>