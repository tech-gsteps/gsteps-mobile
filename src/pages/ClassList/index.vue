<template>
  <div>
    <VanSwipe
      class="banner"
      :autoplay="3000"
      indicator-color="white"
    >
      <VanSwipeItem>
        <div class="banner1">
          <img
            alt="Vue logo"
            src="../../assets/banner.svg"
          >
        </div>
      </VanSwipeItem>
    </VanSwipe>
    <div class="join-info">
      <div>
        <p>{{ classListData.join_time }}</p>
        <p class="join-indo-text">
          加入时间
        </p>
      </div>
      <div
        v-if="roleData.role_id === 1"
        @click="createClass"
      >
        <VanIcon
          name="add-o"
        />
        <p class="join-indo-text">
          创建课程
        </p>
      </div>
      <div>
        <p>{{ classListData.count }}</p>
        <p class="join-indo-text">
          {{ roleData.role_id | roleFilter }}
        </p>
      </div>
    </div>
    <ul
      class="class-list"
      v-if=" classListData.records && classListData.records.length !== 0"
    >
      <li
        class="class-list__li"
        v-for="(item, index) in classListData.records"
        :key="index"
        @click="goToClassDetail(item.id)"
      >
        <div class="avatar">
          <img
            :src="item.logo"
            alt=""
          >
        </div>
        <div class="class-info-box">
          <p class="class-name">
            {{ item.course_name }}
          </p>
          <p class="class-info">
            {{ item.start_time }} {{ item.studio_name }} {{ item.classroom }}
          </p>
        </div>
        <VanIcon name="arrow" />
      </li>
    </ul>
    <div
      class="empty-list"
      v-else
    >
      当前没有课程记录
    </div>
    <div v-if="!noData" class="more-data">
      <VanButton v-if="dataLoading" loading type="default" size="normal" loading-text="加载中..." >加载中</VanButton>
      <van-button @click="getRecordList" v-if="!dataLoading" type="default">加载更多</van-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

const roleObj = {
  1: '已创建',
  2: '已授课',
  3: '已上课',
};
export default {
  data() {
    return {
      classListData: {
        join_time: '',
        role: '',
      },
      page: 1,
      size: 20,
      noData: false,
      dataLoading: false,
    };
  },
  computed: {
    ...mapGetters([
      'roleData',
    ]),
  },
  created() {
    this.getRecordList();
    // this.$axios.post('/api/activity/record').then(response => {
    //   this.classListData = response.data.res;
    // });
  },
  filters: {
    roleFilter(val) {
      return roleObj[val];
    },
  },
  methods: {
    goToClassDetail(id) {
      this.$router.push({
        path: '/class_detail',
        query: {
          id,
        },
      });
    },
    createClass() {
      this.$router.push({ name: 'createClass' });
    },
    getRecordList() {
      if (!this.noData) {
        this.dataLoading = true;
        this.$axios.post('/api/activity/record', { page: this.page, size: this.size }).then(response => {
          this.page ++;
          this.dataLoading = false;
          let data = response.data.res;
          this.classListData.join_time = data.join_time;
          this.classListData.role = data.role;
          if (data.count > 0) {
            this.classListData.count = data.count;
          }
          if (data.records && data.records.length > 0) {
            if (this.classListData.records) {
              this.classListData.records = [...this.classListData.records, ...data.records ];
            } else {
              this.classListData.records = data.records;
            }
          }
          if (!data.records || data.records.length <= 0 || data.records.length < this.size) {
            this.noData = true;
          }
        });
      }

    },
  },

};
</script>
<style lang="scss" scoped>
.banner {
  // background: #FFBC00;
  // text-align: center;
  // height: 130px;
  // line-height: 130px;
  .banner1 {
    // background: #FFBC00;
    background: $color-yellow;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.empty-list {
  text-align: center;
  margin-top: 20px;
}
.join-info {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  height: 60px;
  font-size: 16px;
  border-bottom: 1px solid rgba(230,230,230,0.2);
  .join-indo-text {
    font-size: 12px;
    line-height: 17px;
  }
}
.class-list {
  padding: 0 20px;
}
.class-list__li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(230,230,230,0.2);
  padding: 13px 0;
  .avatar {
    border-radius: 50%;
    overflow: hidden;
    height: 40px;
    width: 40px;
    img {
      width: 100%;
    }
  }
  .class-info-box {
    padding-left: 10px;
    flex: 1;
  }
  .class-name {
    font-size: 15px;
    line-height: 21px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 60vw;
  }
  .class-info {
    font-size: 10px;
    line-height: 14px;
  }
}
.more-data {
  text-align: center;
  margin: 10px 0;

  .van-button {
    background: #FFBC00;
    border: 0;
    &:before{
      content: none;
    }
  }
}
</style>
