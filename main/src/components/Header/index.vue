<template>
  <div>
    <!-- 用户信息 -->
    <UserInfo />
    <!-- 导航 -->
    <MainNav />
  </div>
</template>

<script lang="ts">
import UserInfo from './UserInfo';
import MainNav from './MainNav';

export default {
  name: 'header',
  components: {
    UserInfo,
    MainNav,
  },
};
</script>

<style lang="scss" scoped></style>
