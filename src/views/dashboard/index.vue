<template>
  <div class="dashboard-container">
    <div class="dashboard-text">账号:{{ phone }}</div>
    <div class="dashboard-text">身份:{{role>=11?"管理员":"普通用户" }}</div>
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'phone',
      'role'
    ])
  },
  mounted() {
   // console.log("1111111111111",this.phone)
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
