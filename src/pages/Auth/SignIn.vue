<template>
  <div class="auth-wrapper">
    <div class="avatar">
      <img
        :src="roleData.logo_url"
        alt=""
      >
    </div>
    <div class="auth-input-wrapper">
      <VanCellGroup>
        <VanField
          v-model="name"
          placeholder="填写用户名"
          left-icon="contact"
          :error="isNameError"
          :error-message="nameMsg"
        />
        <VanField
          v-model="phone"
          placeholder="填写手机号"
          left-icon="phone-o"
          :error="isPhoneError"
          :error-message="phoneMsg"
        />
      </VanCellGroup>
    </div>
    <VanButton
      type="primary"
      @click="onSignIn"
      class="confirm-button"
    >
      注册
    </VanButton>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      name: '',
      phone: '',
      isNameError: false,
      isPhoneError: false,
      nameMsg: '',
      phoneMsg: '',
    };
  },
  computed: {
    ...mapGetters([
      'roleData',
    ]),
  },

  methods: {
    onSignIn() {
      const { name, phone } = this;
      if (name === '') {
        this.isNameError = true;
      } else if (phone === '') {
        this.isPhoneError = true;
      } else {
        const sendData = {
          name,
          phone,
        };
        this.$axios.post('/api/user/add', sendData).then(response => {
          // this.relateData = response.data.res;
          if (response.data.code === 0) {
            // this.$toast('创建成功');
            this.$toast.success('注册成功！');
            this.$router.push({
              name: 'classList',
            });
          } else {
            this.$toast(response.data.msg);
          }
          // console.log(this.relateData);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.auth-wrapper {
  background: url('~@/assets/bg.png');
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  left: 0;
  bottom: 0;
  background-size: contain;
  display: flex;
  flex-direction: column;
  .avatar {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 25vh;
    border: 3px solid $color-light-yellow;
    img {
      width: 100%;
    }
  }
  .auth-input-wrapper {
    padding: 40px;
    input {
      color: $color-yellow;
    }
    .van-cell-group {
      background-color: transparent;
      .van-cell {
        background-color: transparent;
        color: $color-yellow;
      }
    }
    .van-cell:not(:last-child)::after {
      border-color: $color-yellow;
    }
    [class*=van-hairline]::after {
      border-color: $color-yellow;
    }
  }
}
</style>
