<template>
  <div class="vue-test">
    <button class="vue-test__button" @click="buttonTestClick()">test</button>
  </div>
</template>

<script>
export default {
  name: "vue-test",
  methods: {
    buttonTestClick() {
      alert(1);
    },
  },
}
</script>

<style lang="less">
  .vue-test {
    width: 200px;

    background: blue;
    display: flex;

    &__button {
      display: block;

      margin: 0 auto;
    }
  }

</style>

