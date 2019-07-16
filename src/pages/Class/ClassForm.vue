<template>
  <div class="class-input-wrapper">
    <VanCellGroup>
      <VanCell
        title="课程类型"
        is-link
        arrow-direction="down"
        :value="courseLevelValue"
        @click="handlePopup('course_level')"
      />
      <VanCell
        title="舞种"
        is-link
        arrow-direction="down"
        :value="danceTypeValue"
        @click="handlePopup('dance_type')"
      />
      <VanField
        v-model="currentData.course_name"
        label="课程名称"
        placeholder="请输入课程名称"
        class="class-name"
      />
      <VanCell
        title="上课时间"
        is-link
        arrow-direction="down"
        :value="currentData.start_time"
        @click="handleDatePopup()"
      />
      <VanCell
        title="上课地点"
        is-link
        arrow-direction="down"
        :value="studioValue"
        @click="handlePopup('studio')"
      />
      <VanCell
        title="教室"
        is-link
        arrow-direction="down"
        :value="classroomValue"
        @click="handlePopup('classroom')"
      />
      <VanCell
        title="教师"
        is-link
        arrow-direction="down"
        :value="teacherValue"
        @click="handlePopup('teacher')"
      />
      <div class="card-list">
        <VanCell
          title="课卡类型"
          is-link
          arrow-direction="down"
          :value="cardValue"
          @click="handleCardPopup('card')"
        />
        <VanCell
          v-for="(item, index) in cardValueList"
          :key="item.id"
          :title="item.name"
        >
          <VanStepper
            :default-value="item.spend"
            @change="handleSpend($event, item.id)"
          />
        </VanCell>
      </div>
    </VanCellGroup>

    <VanPopup
      v-model="showPicker"
      position="bottom"
    >
      <VanPicker
        :columns="pickerConfig.columns"
        show-toolbar
        :title="pickerConfig.title"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
      />
    </VanPopup>
    <VanPopup
      v-model="showDatePicker"
      position="bottom"
    >
      <VanDatetimePicker
        v-model="datePickerConfig.currentDate"
        type="datetime"
        @confirm="onDateConfirm"
        @cancel="onDateCancel"
      />
    </VanPopup>
    <VanPopup
      v-model="showCardTypePicker"
      position="bottom"
      class="card-popup"
    >
      <VanCheckboxGroup
        v-model="card_types"
        :default-value="card_types"
        @change="hanldeCardChange"
      >
        <VanCellGroup>
          <VanCell
            v-for="(item, index) in relateData.card"
            :key="item.id"
            clickable
            :title="`${item.name}`"
            @click="toggle(index)"
          >
            <VanCheckbox
              :name="item.id"
              shape="square"
              ref="checkboxes"
            />
          </VanCell>
        </VanCellGroup>
      </VanCheckboxGroup>
    </VanPopup>

    <VanButton
      type="primary"
      @click="handleCreateClass"
      class="confirm-button"
    >
      {{ typeCn[type] }}
    </VanButton>
  </div>
</template>

<script>
import { formatAllDate, formatAllDate2 } from '@/utils';

const type_cn = {
  create: '创建课程',
  edit: '确定',
};

export default {
  props: {
    relateData: {
      type: Object,
      default: () => {},
    },
    currentData: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: 'create',
    },
  },
  computed: {
    courseLevelValue() {
      return this.relateData.course_level.filter(item => item.id === this.currentData.course_level_id)[0].type;
    },
    danceTypeValue() {
      return this.relateData.dance_type.filter(item => item.id === this.currentData.course_kind_id)[0].type;
    },
    studioValue() {
      const arr = this.relateData.studio.filter(item => item.id === this.currentData.studio_id);
      return arr.length === 0 ? '' : arr[0].name;
    },
    classroomValue() {
      const arr = this.relateData.classroom.filter(item => item.id === this.currentData.classroom_id);
      return arr.length === 0 ? '' : arr[0].name;
    },
    teacherValue() {
      const arr = this.relateData.teacher.filter(item => item.id === this.currentData.teacher_id);
      return arr.length === 0 ? '' : arr[0].name;
    },
    cardValue() {
      return this.relateData.card.filter(item => this.currentData.card_types.includes(item.id)).map(item => item.name).join(',');
    },
    cardValueList() {
    	const ret = [];
      this.relateData.card.forEach(item => {
      	if (this.currentData.card_types.includes(item.id)) {
      		// let defultSpend = 1;// 默认消耗次数
          // // let card = this.relateData.cards.find((c)=>{
          // // 	return c.id === item.id;
          // // });
          // // 如果是储值卡,则默认消耗 150
          // if(item.type_id === 2) {
          // 	defultSpend = 150;
          // }
      		const tmp = { ...item, spend: 1 };

      		if (this.currentData.cardList) {
      			for (const c of this.currentData.cardList) {
      				if (c.id === item.id) {
                tmp.spend = c.spend;
              }
            }
          }
          ret.push(tmp);
        }
      });
      return ret;
    },

  },
  data() {
    return {
      showPicker: false,
      showDatePicker: false,
      showCardTypePicker: false,
      card_types: [],
      pickerConfig: {
        columns: [],
        title: '',
      },
      typeCn: type_cn,
      datePickerConfig: {
        minHour: 10,
        maxHour: 20,
        minDate: new Date(),
        maxDate: new Date(2019, 10, 1),
        currentDate: new Date(),
      },
      pickerType: '',
      list: ['a', 'b', 'c'],
      result: ['a', 'b'],
    };
  },
  created() {
    this.card_types = this.currentData.card_types;
  },
  methods: {
    onChange(picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    // 选择课卡类型
    hanldeCardChange(data) {
      this.currentData.card_types = data;
      // 初始化提交的可用卡数据
      let tmpcardList = [];
      const cardList = this.currentData.cardList;
      if (data && data.length > 0) {
        tmpcardList = data.map(id => {
          let spend = 1;// 默认消耗次数
          const card = this.relateData.card.find(c => c.id === id);
          // 如果是储值卡,则默认消耗 150
          if (!!card && card.type_id === 2) {
            spend = 150;
          }
          const obj = cardList.find(i => {
            if (i.id === id) {
              return i;
            }
          });
          if (obj) {
            spend = obj.spend;
          }
          return {
            id,
            spend,
          };
        });
      }
      this.currentData.cardList = tmpcardList;
    },
    handleSpend(spend, id) {
    	for (const item of this.currentData.cardList) {
        if (item.id === id) {
          item.spend = spend;
          break;
        }
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    handlePopup(type) {
      this.pickerType = type;

      this.showPicker = true;
      switch (this.pickerType) {
        case 'course_level':
          this.pickerConfig.columns = [{
            values: this.relateData[this.pickerType].map(item => item.type),
            defaultIndex: this.relateData.course_level.findIndex(item => item.id === this.currentData.course_level_id),
          }];
          break;
        case 'dance_type':
          this.pickerConfig.columns = [{
            values: this.relateData[this.pickerType].map(item => item.type),
            defaultIndex: this.relateData.dance_type.findIndex(item => item.id === this.currentData.course_kind_id),
          }];
          break;
        case 'studio':
          this.pickerConfig.columns = [{
            values: this.relateData[this.pickerType].map(item => item.name),
            defaultIndex: this.relateData.studio.findIndex(item => item.id === this.currentData.studio_id),
          }];
          break;
        case 'classroom': {
          const classroomArr = this.relateData.classroom.filter(item => item.studio_id === this.currentData.studio_id);
          this.pickerConfig.columns = [{
            values: classroomArr.map(item => item.name),
            defaultIndex: classroomArr.findIndex(item => item.id === this.currentData.classroom_id),
          }];

          break;
        }
        case 'teacher': {
          const teacherArr = this.relateData[this.pickerType].filter(item => item.dance_type_id.includes(this.currentData.course_kind_id));
          this.pickerConfig.columns = [{
            values: teacherArr.map(item => item.name),
            defaultIndex: teacherArr.findIndex(item => item.id === this.currentData.teacher_id),
          }];
          break;
        }
        default:
          break;
      }
    },
    handleDatePopup() {
      this.showDatePicker = true;
    },
    handleCardPopup() {
      this.showCardTypePicker = true;
    },

    onDateConfirm(time) {
      this.showDatePicker = false;
      this.currentData.start_time = formatAllDate(time);
    },
    onConfirm(value, index) {
      switch (this.pickerType) {
        case 'course_level':
          this.currentData.course_level_id = this.relateData.course_level[index].id;
          break;
        case 'dance_type': {
          this.currentData.course_kind_id = this.relateData.dance_type[index].id;

          const dance_type = this.currentData.course_kind_id;
          const teacherArr = this.relateData.teacher.filter(item => item.dance_type_id.includes(dance_type)).map(item => item.id);
          if (!teacherArr.includes(this.currentData.teacher_id)) {
            this.currentData.teacher_id = teacherArr[0];
          }
          break;
        }
        case 'studio': {
          this.currentData.studio_id = this.relateData.studio[index].id;
          const studio_id = this.currentData.studio_id;
          if (studio_id !== this.relateData.classroom.filter(item => item.id === this.currentData.classroom_id)[0].studio_id) {
            this.currentData.classroom_id = this.relateData.classroom.filter(item => item.studio_id === studio_id)[0].id;
          }
          break;
        }
        case 'classroom': {
          const studio_id = this.currentData.studio_id;
          this.currentData.classroom_id = this.relateData.classroom.filter(item => item.studio_id === studio_id)[index].id;
          break;
        }
        case 'card':
          // this.cardValue = this.relateData.card[index].name;
          // this.currentData.card_types = this.relateData.card[index].id.toString();
          break;
        case 'teacher':
          this.currentData.teacher_id = this.relateData.teacher.filter(item => item.name === value[0])[0].id;
          break;
        default:
          break;
      }
      this.showPicker = false;
    },
    onCancel() {
      this.showPicker = false;
    },
    onDateCancel() {
      this.showDatePicker = false;
    },
    handleCreateClass() {
      const {
        course_level_id,
        course_kind_id,
        course_name,
        start_time,
        classroom_id,
        teacher_id,
        cardList,
      } = this.currentData;
      let card_list = [];
      if (cardList) {
        card_list = JSON.stringify(cardList);
      }
      const sendData = {
        course_level_id,
        course_kind_id,
        course_name,
        start_time,
        classroom_id,
        teacher_id,
        card_list,
      };
      sendData.start_time = formatAllDate2(sendData.start_time);
      let url;
      const ADD_URL = '/api/course/add';
      const EDIT_URL = '/api/activity/update';
      if (this.type === 'create') {
        url = ADD_URL;
      } else {
        url = EDIT_URL;
        sendData.activity_id = this.$route.query.id;
      }

      this.$axios.post(url, sendData).then(response => {
        if (response.data.code === 0) {
          this.$toast('保存成功');
          if (this.type === 'create') {
            if(response.data.res.activity_id_list && response.data.res.activity_id_list.length > 0) {
              this.$router.replace({
                name: 'classDetail',
                query: {
                  id: response.data.res.activity_id_list[0],
                },
              });
            }else {
              this.$router.go(-1); //
            }
          } else {
            this.$router.go(-1); //
          }

        } else {
          this.$toast(response.data.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.class-input-wrapper {
  // padding-top: 10px;
  .van-cell__value {
    color: $color-white;
  }
}
.class-name {
  .van-field__control {
    color: $color-white;
    text-align: right;
  }
}
.card-popup {
  color: $color-black;
}
  .card-list {
    border: 1px solid #838587;
    margin-top: 30px;
  }
</style>
