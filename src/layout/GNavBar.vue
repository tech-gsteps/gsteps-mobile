<template>
  <VanNavBar
    title=""
    class="g-navbar"
    left-text="返回"
    right-text="首页"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
