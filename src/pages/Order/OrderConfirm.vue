<template>
  <div>
    <GNavBar :is-show-back="false" />
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
          {{ activeData.name }}{{ getCountSpend }}
        </span>
      </li>
      <li class="card-data" v-if="cardData.length > 0">
        <VanCell
                v-if="cardData.length > 0"
                title="支付卡"
                is-link
                arrow-direction="down"
                :value="seclectCardName"
                @click="handlePopup('card')"
        />
      </li>
      <li v-else>
        <span class="label">
          支付卡：
        </span>
        <span
          class="info"
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
      />
    </VanPopup>
  </div>
</template>
<script>
import ClassInfo from '@/pages/ClassList/ClassInfo.vue';
import GNavBar from '@/layout/GNavBar';

export default {
  components: {
    ClassInfo,
		GNavBar,
  },
  data() {
    return {
      detailData: {},
      activeData: {},
			pickerType: '',
			showPicker: false,
      selectCard: null, // 当前选中的支付卡
			pickerConfig: {
				columns: [],
				title: '',
			},
		};
  },
  computed: {
    cardData() {
      return this.activeData.card_list || [];
    },
    getCountSpend(){
    	if(this.selectCard && this.detailData.card_list) {
        for(const card of this.detailData.card_list) {
        	if( card.card_id === this.selectCard.card_id) {
						let t = '';
						if (card.card_type_id === 2) {
							t = `元`;
						} else {
							t = `次`;
						}
        		return (`${card.card_name}${card.spend}${t}`);
          }
        }
      }
			return '请选择消费的卡';

		},
    isDisabled() {
    	if(this.selectCard && (this.selectCard.remains > 0 || this.selectCard.type_id === 1)) {
    		return false;
      }
      return true;
    },
		seclectCardName() {
			return this.getCardShowTitle(this.selectCard);
    },
  },
  async created() {
    const sendData = {
      activity_id: this.$route.query.id,
    };
    const responseDetail = await this.$axios.post('/api/activity/detail', sendData);
    const responseActive = await this.$axios.post('/api/membership/active', {
			show_disabled: 0, // 不显示失效卡
			activity_id: sendData.activity_id,
			get_relation: 1, // 获取相关账号(亲子账号)的可用卡
    });
    this.detailData = responseDetail.data.res;
    this.activeData = responseActive.data.res;
    if(this.activeData.card_list && this.activeData.card_list.length >0) {
    	this.selectCard = this.activeData.card_list[0];
    }
  },
  methods: {
    onClickConfirm() {
      const sendData = {
        activity_id: this.$route.query.id,
        membership_id: this.selectCard.membership_id,
      };
      this.$axios.post('/api/signin/add', sendData).then(response => {
        if (response.data.code === 0) {
          this.$toast.success('消费成功');
          this.$router.replace({
            name: 'classDetail',
            query: {
              id: this.$route.query.id,
            },
          });
        } else {
          this.$toast(response.data.msg);
        }
      });
			this.showPicker = false;
		},
		handlePopup(type) {
			this.pickerType = type;
			this.showPicker = true;
			switch (this.pickerType) {
				case 'card':
					this.pickerConfig.columns = [{
						values: this.cardData.map(item => this.getCardShowTitle(item)),
						defaultIndex: 0,
					}];
					break;
			}
		},
		onCancel() {
			this.showPicker = false;
		},
		onConfirm(value, index) {
			switch (this.pickerType) {

				case 'card': {
					this.selectCard = this.activeData.card_list[index];
					break;
				}
				default:
					break;
			}
			this.showPicker = false;
		},
    // 获得会员卡显示标题
    getCardShowTitle(card) {
    	let ret = '';
    	if(card) {
				ret = `「${card.user_name}」的${card.name}（余额：${card.remains}）`;
      }
			return ret;
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
    &.card-data {
      .van-cell {
        background-color: #0000;
        color: #ffffffb3;
        padding: 0;
      }

      /deep/ .van-cell__value, /deep/ .van-icon-arrow-down {
        color: $color-yellow;
      }

    }
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
