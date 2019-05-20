<template>
  <div>
    <div class="my-box">
      <div class="my-box__info">
        <div class="my-box__user-info">
          <div class="user-info-1">
            <div class="avatar" >
              <img v-if="!!membership.icon && membership.icon.length > 10"
                      :src="membership.icon"
                      alt=""
              >
              <p v-else-if="!!membership.name">{{membership.name.split('')[0]}}</p>
            </div>
            <div>
              <p class="font--larger">
                {{ membership.name }}
              </p>
              <p class="font--medium">
                会员ID {{ membership.member_id }}
              </p>
            </div>
          </div>
          <div class="other-user" v-if="otherUserList.length > 0" >
            <VanCell
                    title="切换账号"
                    is-link
                    arrow-direction="down"
                    @click="handlePopup('user')"
            />
          </div>
        </div>
        <!-- <div
          class="my-box__logout"
          @click="logout"
        >
          退出
        </div> -->
      </div>
      <div class="my-box__times">
        <div>
          <p class="font--larger">
            {{ membership.join_time }}
          </p>
          <p class="font--medium">
            加入时间
          </p>
        </div>
        <div>
          <p class="font--larger">
            {{ membership.class_counts }}节
          </p>
          <p class="font--medium">
            上课节数
          </p>
        </div>
<!--        <div>-->
<!--          <p class="font&#45;&#45;larger">-->
<!--            {{ membership.total_counts }}次-->
<!--          </p>-->
<!--          <p class="font&#45;&#45;medium">-->
<!--            累计剩余-->
<!--          </p>-->
<!--        </div>-->
      </div>
    </div>
    <div>
      <h3 class="my-card-title">
        我的会员卡
      </h3>
    </div>
    <Card
      v-for="(card, index) in membership.cards"
      :key="index"
      :card="card"
    />

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
import Card from './Card.vue';
import { Dialog } from 'vant';

export default {
  components: {
    Card,
  },
  data() {
    return {
      membership: {},
			otherUserList: [],
			exchangeUser: null,
			pickerType: '',
			showPicker: false,
			pickerConfig: {
				columns: [],
				title: '',
			},
    };
  },
  created() {
    this.$axios.post('/api/membership/detail').then(response => {
      this.membership = response.data.res;
      // this.currentUser =
    });
    // 获取账户关系,子账号,母账户等
    this.$axios.post('/api/user/info').then(response => {
      // this.membership = response.data.res;
      this.otherUserList = [];
      if( response.data.res) {
        if(response.data.res.child_list && response.data.res.child_list.length > 0) {
          this.otherUserList = [...this.otherUserList, ...response.data.res.child_list];
        }
      	if (response.data.res.parent_list && response.data.res.parent_list.length > 0) {
          this.otherUserList = [...this.otherUserList, ...response.data.res.parent_list];
        }
      	// 兄弟账号
        if (response.data.res.siblings_list && response.data.res.siblings_list.length > 0) {
          this.otherUserList = [...this.otherUserList, ...response.data.res.siblings_list];
        }
      }
    });
  },
  methods: {
    logout() {
      this.$axios.post('/api/user/logout').then(response => {
      });
    },
		handlePopup(type) {
			this.showPicker = true;
			this.pickerType = 'user';
			if(type === 'user') {
				this.pickerConfig.title = '请选择要切换的账号';
				this.pickerConfig.columns = [{
					values: this.otherUserList.map(item => item.name),
					defaultIndex: 0,
				}];
      }
    },
		onCancel() {
			this.showPicker = false;
		},
		onConfirm(value, index) {
			switch (this.pickerType) {
				case 'user': {
					const user = this.otherUserList[index];
                    this.exchangeUser = user;
                    // 切换登录
                    this.$axios.post('/api/user/relationlogin', { relation_user_id: this.exchangeUser.id }).then(response => {
                      window.location.reload();
                    });
					// Dialog.confirm({
					// 	title: '确认切换',
					// 	message: `切换到【${user.name}】`,
					// }).then(() => {
					// 	this.exchangeUser = user;
					// 	// 切换登录
					// 	this.$axios.post('/api/user/relationlogin', { relation_user_id: this.exchangeUser.id }).then(response => {
                    //       window.location.reload();
					// 	});
					// }).catch(() => {
					// 	// on cancel
					// });

					break;
				}
				default:
					break;
			}
			this.showPicker = false;
		},
  },
	computed: {

  }

};
</script>

<style lang="scss">
.my-box {
  background-color: $color-yellow;
  color: rgba($color-black, 0.7);
  margin: 20px;
  border-radius: 10px 10px 0 0;
  padding: 20px;
  box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, 0.5) inset;

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid $color-light-yellow;
    margin-right: 10px;
    background: #fff1cc;
    box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 0.5);
    img {
      width: 100%;
    }
    p {
      width: 100%;
      height: 100%;
      line-height: 60px;
      text-align: center;
      font-size: 30px;
      color: #e6a06d;
      font-weight: 600;
    }
  }
  .my-box__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .my-box__user-info{
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;

      .user-info-1 {
        display: flex;
        align-items: center;
      }
    }
    .my-box__logout {
      font-size: 10px;
    }

    .other-user {
      .van-cell {
        background: none;
        padding: 0;
      }
    }

  }
  .font--larger {
      font-size: 17px;
      font-weight: 500;
      line-height: 24px;
    }
    .font--medium {
      font-size: 12px;
      font-weight: 400;
      line-height: 17px;
    }
  .my-box__times {
    display: flex;
    justify-content: space-between;
  }

}
.my-card-title {
  font-size: 15px;
  color: $color-yellow;
  text-align: center;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left:50%;
    width: 34px;
    transform: translateX(-50%);
    border-top: 3px solid $color-yellow;
    border-radius: 10px;

  }
}
</style>
