<template>
  <div>
    <GNavBar />
    <ClassInfo
      :detail-data="detailData"
      :is-edit="isEdit"
    />
    <div
      v-if="palyerNumber > 0"
      class="active-info"
    >
      <p>签到人数: {{ palyerNumber }}</p>
    </div>
    <ul class="student-list">
      <li
        v-for="player in palyerList"
        :key="player.name"
      >
        <div class="avatar">
          <span>
            <img
              :src="player.icon"
              alt=""
            >
          </span>
        </div>
        <span class="name">
          {{ player.name }}
        </span>
        <span class="time">
          {{ player.signin_time }}
        </span>
        <span class="time">
          {{ player.opt_user_id == player.user_id ? '本人签到':(player.opt_user_name+'代签') }}
        </span>
      </li>
      <li
        style="justify-content: center; font-size: 12px;"
        v-if="palyerList.length === 0"
      >
        暂时没有记录
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ClassInfo from './ClassInfo';
import GNavBar from '@/layout/GNavBar';

export default {
  components: {
    ClassInfo,
    GNavBar,
  },
  data() {
    return {
      palyerList: [],
      detailData: {},
      palyerNumber: 0,
    };
  },
  computed: {
    ...mapGetters([
      'roleData',
    ]),
    isEdit() {
      return this.roleData.role_id === 1;
    },
  },
  created() {
    const sendData = {
      activity_id: this.$route.query.id,
    };
    this.$axios.post('/api/activity/detail', sendData).then(response => {
      if (response.data.code === 0) {
        this.detailData = response.data.res;
        this.palyerList = response.data.res.players;
        if (!!this.palyerList && this.palyerList.length > 0) {
          this.palyerNumber = this.palyerList.length;
        }
      } else {
        this.$toast(response.data.msg);
      }
    });
  },
  methods: {
    onClickLeft() {
      // this.$router.go(-1);
      this.$router.push({
        name: 'classList',
      });
    },
    onClickRight() {
      this.$router.push({ path: '/' });
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.roleData.role_id === 1 || vm.$store.getters.roleData.role_id === 2) {
        next();
      } else {
        const sendData = {
          activity_id: vm.$route.query.id,
        };
        vm.$axios.post('/api/signin/info', sendData).then(response => {
          if (response.data.code === 0) {
            if (response.data.res.result === 0) {
              vm.$router.replace({
                name: 'orderConfirm',
                query: {
                  id: vm.$route.query.id,
                },
              });
            } else {
              next();
            }
          }
        });
      }
    });
  },

};
</script>

<style lang="scss" scoped>

  .student-list {
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-bottom: 1px solid rgba(230, 230, 230, 0.2);

      .avatar {
        width: 40px;
        height: 40px;
        border: 3px solid $color-light-yellow;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .name {
        font-size: 15px;
        font-weight: 400;
      }

      .time {
        font-size: 10px;
      }
    }
  }

  .active-info {
    font-size: 15px;
    border-bottom: 1px solid rgba(230, 230, 230, 0.2);
    p {
      padding: 12px 20px;
    }
  }
</style>
