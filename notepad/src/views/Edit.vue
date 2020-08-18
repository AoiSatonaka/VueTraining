<template>
  <div class="editor">
    <Header>Edit Memo</Header>
    <textarea name="memo" v-model="memoBody"></textarea>
    <button @click="save">保存</button>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "edit",
  components: {
    Header,
  },
  data: function () {
    return {
      memoBody: "",
    };
  },
  mounted: function () {
    // URLパラメータの値はStringで入ってくる。
    // 比較の際に厳密比較をしたいならint型にキャストしてあげないとうまく行かない
    const id = this.$route.params["id"];
    const memo = this.$store.state.memos.find(
      (memo) => memo.id === parseInt(id)
    );
    this.memoBody = memo.body;
  },
  methods: {
    save() {
      this.$store.commit("update", {
        id: this.$route.params["id"],
        body: this.memoBody,
      });
      this.$router.push("/");
    },
  },
};
</script>

<style>
textarea {
  width: 100%;
  height: 10em;
}
button {
  border: 1px solid #333;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  margin-top: 10px;
}
</style>