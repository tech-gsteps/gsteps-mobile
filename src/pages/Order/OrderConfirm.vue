<template>
  <div>
    <ClassInfo
      :detail-data="detailData"
      :is-qrcode="false"
      :is-edit="false"
    />
    <ul class="confirm-list">
      <li>
        <span class="label">
          总价：
        </span>
        <span class="info">
          {{ activeData.name }}{{ detailData.spend }}次
        </span>
      </li>
      <li>
        <span class="label">
          支付卡：
        </span>
        <span
          class="info"
          v-if="Object.keys(cardData).length !== 0"
        >
          {{ cardData.name }}（剩余{{ cardData.remains }}次）
        </span>
        <span
          class="info"
          v-else
        >
          无可用卡
        </span>
      </li>
    </ul>
    <div class="confirm-tip">
      <h3>温馨提示</h3>
      <p>确认消费后，不支持退款，请您在规定时间内准时上课哦~</p>
    </div>
    <VanButton
      type="primary"
      @click="onClickConfirm"
      class="confirm-button"
      :disabled="isDisabled"
      :class="{'disabled':isDisabled}"
    >
      确认消费
    </VanButton>
  </div>
</template>
<script>
import ClassInfo from '@/pages/ClassList/ClassInfo.vue';

export default {
  components: {
    ClassInfo,
  },
  data() {
    return {
      detailData: {},
      activeData: {},
    };
  },
  computed: {
    cardData() {
      return this.activeData.card || {};
    },
    isDisabled() {
      if (Object.keys(this.cardData).length !== 0 && this.detailData.spend <= this.cardData.remains) {
        return false;
      }
      if (this.cardData && this.cardData.type === '期限卡') {
        return false;
      }
      return true;
    },
  },
  async created() {
    const sendData = {
      activity_id: this.$route.query.id,
    };
    const responseDetail = await this.$axios.post('/api/activity/detail', sendData);
    const responseActive = await this.$axios.post('/api/membership/active');
    this.detailData = responseDetail.data.res;
    this.activeData = responseActive.data.res;
  },
  methods: {
    onClickConfirm() {
      const sendData = {
        activity_id: this.$route.query.id,
        membership_id: this.activeData.membership_id,
      };
      this.$axios.post('/api/signin/add', sendData).then(response => {
        if (response.data.code === 0) {
          this.$toast.success('消费成功');
          this.$router.push({
            name: 'classDetail',
            query: {
              id: this.$route.query.id,
            },
          });
        } else {
          this.$toast(response.data.msg);
        }
      });
    },
  },
};

</script>
<style lang="scss" scoped>
.confirm-list {
  li {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: $border-bottom;
    .info {
      font-size: 14px;
      color: $color-yellow;
    }
  }
}
.confirm-tip {
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  width: 200px;
  margin: 30px auto;
}
</style>
