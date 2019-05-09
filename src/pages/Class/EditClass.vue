<template>
  <div>
    <GNavBar />
    <ClassForm
      v-if="visible"
      :relate-data="relateData"
      :current-data="currentData"
      type="edit"
    />
  </div>
</template>
<script>
import GNavBar from '@/layout/GNavBar';
import ClassForm from './ClassForm.vue';

export default {
  components: {
    GNavBar,
    ClassForm,
  },
  data() {
    return {
      relateData: {
        card: [],

      },
      visible: false,
      currentData: {
        course_level_id: 0,
        course_kind_id: 0,
        course_name: '',
        start_time: '',
        studio_id: 0,
        classroom_id: 0,
        card_ids: [],
        spend: 0,
        teacher_id: 0,
      },
    };
  },
  async created() {
    const sendData = {
      activity_id: this.$route.query.id,
    };
    const response = await this.$axios.post('/api/activity/info', sendData);
    const response1 = await this.$axios.post('/api/activity/related');

    this.currentData = response.data.res;
    this.relateData = response1.data.res;
    this.visible = true;
  },
};
</script>
