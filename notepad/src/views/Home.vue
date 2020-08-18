<template>
  <div class="home">
    <ul>
      <li v-for="memo in newest" :key="memo.id">
        {{ memo.body }}
        <router-link :to="{name: 'Edit', params: {id:memo.id}}" tag="button">変更</router-link>
        <button @click='remove' :value="memo.id">削除</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    newest(){
      return this.$store.state.memos.slice().reverse();
    }
  },
  methods: {
    remove(event){
      if (event) this.$store.commit('remove', event.currentTarget.value)
    }
  }
}
</script>

<style scoped>
li {
  margin: 15px 0;
}
button {
  border: 0;
  padding: 10px 13px;
  margin: 0 10px;
  font-size: 10pt;
  color: #fff;
  background-color: #4c8;
  border-radius: 5px;
}
button:hover {
  background-color: #3b7;
}
</style>
