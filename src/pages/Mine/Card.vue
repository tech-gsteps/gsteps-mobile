<template>
  <div
    class="card"
    :class="classObject"
  >
    <h1 class="brand">
      G-STEPS CREW
    </h1>
    <div
      class="feature"
    >
      <div class="card--type card--text-color">
        {{ card.name }}
      </div>
    <div class="card--timesleft card--text-color" v-if="card.card_type_id !==1">
        {{ getRemainsInfo.remains }}
      </div>
      <div class="card--timesall card--text-color" v-if="card.card_type_id !==1">
        <span>{{ getRemainsInfo.limit }}</span>
      </div>
    </div>
    <div class="decorator card--text-color">
      /////////////////////////////////
    </div>
    <div class="footer card--text-color">
      <span>有效期至：{{ card.deadline }}</span>
      <span>卡号：{{ card.entity_card_id }}</span>
      <span>{{ card.status }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    classObject() {
      return {
        normal: this.card.status === '已激活',
        passive: this.card.status !== '已激活',
      };
    },
    getRemainsInfo(){
			// 价格显示字段
			let t = '';
			if (this.card.card_type_id === 2) {
				t = '元';
			} else {
				t = '次';
			}
			return {
				remains: `剩余${this.card.remains}${t}`,
				limit: `${this.card.limit}${t}`,
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin:20px;
   border-radius: 9px;
   padding: 20px;
   &.normal,{
     background-color: $color-yellow;
   }
   &.normal .card--text-color{
     color: rgba($color-black, 0.5)
   }
   &.passive {
     background-color: $color-grey;
   }
   &.passive .card--text-color{
     color: rgba($color-black, 0.5)
   }
 .brand {
   font-size: 30px;
   line-height: 36px;
   color: $color-white;
 }
 .feature{
   display: flex;
   justify-content: space-between;
   align-items: center;
   .card--type {
     font-size: 17px;
     font-weight: 400;
     letter-spacing: 6px;
   }
   .card--timesleft {
     font-size:12px;
     font-weight:400;
   }
   .card--timesall {
     span {
      font-size: 52px;
     }

   }
 }
 .decorator {
   text-align: right;
   margin-top: 10px;
   margin-bottom: 20px;
   color:$color-black;
 }
 .footer {
   display: flex;
   justify-content: space-between;
   font-size: 10px;
 }
}
</style>
