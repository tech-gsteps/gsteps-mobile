<template>
  <div class="class-detail-info-wrapper">
    <div class="avatar">
      <img
        :src="detailData.teacher_icon"
        alt=""
      >
    </div>
    <div class="class-detail-info">
      <h3 class="class-title">
        {{ detailData.course_name }}（{{ detailData.teacher_name }}）
      </h3>
      <p class="class-info">
        {{ detailData.start_time }}
      </p>
      <p class="class-info">
        {{ detailData.city }}{{ detailData.zone }} {{ detailData.studio_name }} {{ detailData.classroom_name }}
      </p>
      <p class="class-info">
        {{getShowCardInfo}}
      </p>
      <button
        v-if="isEdit"
        class="edit-class"
        @click="editClass"
      >
        编辑课程
      </button>
    </div>
    <div
      v-if="isQrcode"
      class="qrcode"
      :class="{'qrcode-large': large}"
      @click="large=!large"
    >
      <img
        :src="src"
        alt=""
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detailData: {
      type: Object,
      required: true,
    },
    isQrcode: {
      type: Boolean,
      default: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      large: false,
      src: '',
    };
  },
  created() {
    this.src = `/api/activity/qrcode?url=${escape(window.location.href)}`;

  },
	computed: {
  	getShowCardInfo() {
			let list = [];
			if(this.detailData && this.detailData.card_list) {
				list = this.detailData.card_list.map(card=>{
					return `${card.card_name}:${card.spend}`;
				});
			}
			return `  ${list.join(' | ')}`;
    }
  },
  methods: {
    editClass() {
      console.log(this.$route.query.id);
      this.$router.push({
        name: 'editClass',
        query: {
          id: this.$route.query.id,
        },
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.class-detail-info-wrapper {
  background-color: $color-yellow;
  padding: 24px;
  display: flex;
  position: relative;
  .avatar {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    border: 3px solid $color-light-yellow;
    img {
      width: 100%;
    }
  }
  .class-detail-info {
    color: $color-black;
    .class-title {
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      margin-bottom: 6px;
    }
    .class-info {
      font-size: 10px;
      line-height: 14px;
      font-weight: 400;
      margin-bottom: 4px;
    }
  }
  .qrcode {
    width: 40px;
    position: absolute;
    right: 24px;
    bottom: 24px;
    img {
      width: 100%;
    }
    &.qrcode-large {
      width: 80px;
      right: 5px;
    }
  }
  .edit-class {
    color: $color-white;
    font-size: 12px;
    border: 1px solid $color-white;
    background: transparent;
    padding: 5px;
  }
}
</style>
