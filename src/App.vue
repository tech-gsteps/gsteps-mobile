<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
<style lang="scss">
#app {
  background: #1D1E1F;
  color: rgba(255,255,255,0.7);
  font-weight: 300;
  .van-tabbar {
    background-color: #1D1E1F;
  }
}
</style>
