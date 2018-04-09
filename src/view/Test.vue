<template>
  <button type="button" @click="updateParent">click</button>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      
    };
  },
  computed:{
    name(){
      return this.$router.name
    }
  },
  methods:{
    updateParent(){
      this.$emit('update');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
