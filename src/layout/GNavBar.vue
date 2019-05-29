<template>
  <VanNavBar
    title=""
    class="g-navbar"
    :left-text="getLeftText"
    right-text="首页"
    :left-arrow="isShowBack"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>
<script>
export default {
  props: {
    isShowBack: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    getLeftText() {
      if (this.isShowBack) {
        return '返回';
      }
      return '';
    },
  },
  methods: {
    onClickLeft() {
    	if (this.isShowBack) {
        this.$router.go(-1);
      }
    },
    onClickRight() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
