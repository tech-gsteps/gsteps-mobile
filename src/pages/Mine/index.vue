<template>
  <div>
    <div class="my-box">
      <div class="my-box__info">
        <div class="my-box__user-info">
          <div class="avatar">
            <img
              :src="membership.icon"
              alt=""
            >
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
        <div>
          <p class="font--larger">
            {{ membership.total_counts }}次
          </p>
          <p class="font--medium">
            累计剩余
          </p>
        </div>
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
  </div>
</template>
<script>
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      membership: {},
    };
  },
  created() {
    this.$axios.post('/api/membership/detail').then(response => {
      this.membership = response.data.res;
      console.log(this.membership);
    });
  },
  methods: {
    logout() {
      this.$axios.post('/api/user/logout').then(response => {
      });
    },
  },

};
</script>

<style lang="scss">
.my-box {
  background-color: $color-yellow;
  color: rgba($color-black, 0.7);
  margin: 20px;
  border-radius: 10px 10px 0 0;
  padding: 20px;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid $color-light-yellow;
    margin-right: 10px;
    img {
      width: 100%;
    }
  }
  .my-box__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .my-box__user-info {
      display: flex;
      align-items: center;
    }
    .my-box__logout {
      font-size: 10px;
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
