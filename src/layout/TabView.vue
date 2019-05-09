<template>
  <div class="overflow-wrapper">
    <RouterView />
    <VanTabbar
      v-model="active"
      active-color="#FFBC00"
      @change="handleTabChange"
    >
      <VanTabbarItem icon="records">
        课程记录
      </VanTabbarItem>
      <VanTabbarItem icon="user-circle-o">
        我
      </VanTabbarItem>
    </VanTabbar>
  </div>
</template>

<script>
const ROUTE_MAP = {
  '/class_list': 0,
  '/mine': 1,
};
export default {
  name: 'App',
  data() {
    return {
      active: 0,
      isAdmin: true,
      routes: {
        0: '/class_list',
        1: '/mine',
      },
    };
  },
  created() {
    this.active = ROUTE_MAP[this.$route.path];
  },
  methods: {
    handleTabChange(val) {
      this.$router.push({
        path: this.routes[val],
      });
    },
  },
};
</script>
