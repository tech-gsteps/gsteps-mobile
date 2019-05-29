<template>
  <div>
    <GNavBar />
    <ClassForm
      v-if="visible"
      :relate-data="relateData"
      :current-data="currentData"
      type="create"
    />
  </div>
</template>
<script>
import { formatAllDate } from '@/utils';
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
      showPicker: false,
      showDatePicker: false,
      showCardTypePicker: false,
      courseLevelValue: '',
      danceTypeValue: '',
      studioValue: '',
      classroomValue: '',
      teacherValue: '',
      cardValue: '',
      card_types: [],
      pickerConfig: {
        columns: [],
        title: '',
      },
      datePickerConfig: {
        minHour: 10,
        maxHour: 20,
        minDate: new Date(),
        maxDate: new Date(2019, 10, 1),
        currentDate: new Date(),
      },
      currentData: {
        course_level_id: 0,
        course_kind_id: 0,
        course_name: '',
        start_time: '',
        studio_id: 0,
        classroom_id: 0,
        card_types: [],
        cardList: [],
        teacher_id: 0,
      },
      pickerType: '',
      list: ['a', 'b', 'c'],
      result: ['a', 'b'],
    };
  },
  created() {
    this.$axios.post('/api/activity/related').then(response => {
      this.relateData = response.data.res;
      this.initCurrentData();
      this.visible = true;
    });
  },
  methods: {
    initCurrentData() {
      const currentData = this.currentData;
      const { relateData } = this;
      currentData.course_level_id = relateData.course_level[0].id;
      currentData.course_kind_id = relateData.dance_type[0].id;
      currentData.studio_id = relateData.studio[0].id;
      currentData.classroom_id = relateData.classroom[0].id;
      currentData.teacher_id = relateData.teacher[0].id;
    },
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onCancel() {
      this.showPicker = false;
    },
    onDateCancel() {
      this.showDatePicker = false;
    },
    handleCreateClass() {
      console.log(this.currentData);
      const {
        course_level_id,
        course_kind_id,
        course_name,
        start_time,
        classroom_id,
        teacher_id,
        card_types,
        spend,
      } = this.currentData;
      const sendData = {
        course_level_id,
        course_kind_id,
        course_name,
        start_time,
        classroom_id,
        teacher_id,
        card_types,
        spend,
      };

      this.$axios.post('/api/activity/add', sendData).then(response => {
        // this.relateData = response.data.res;
        if (response.data.code === 0) {
          this.$toast('创建成功');
          this.$router.push({
            name: 'classDetail',
            query: {
              id: response.data.res.activity_id,
            },
          });
        }
        // console.log(this.relateData);
      });
    },
  },
};
</script>
