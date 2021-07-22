<template>
  <div class="index-container">
    <div class="index-content">
      <NavTitle />
      <IndexAd />
      <CarSwapper />
      <IndexAd />
      <NewsList />
    </div>
  </div>
</template>

<script lang="ts">
import NavTitle from './components/navTitle.vue';
import IndexAd from './components/ad.vue';
import CarSwapper from './components/carSwapper.vue';
import NewsList from './components/newsList.vue';

export default {
  name: 'index',
  components: {
    NavTitle,
    IndexAd,
    CarSwapper,
    NewsList,
  },
};
</script>

<style lang="scss">
.index {
  &-container {
    width: 100%;
  }
  &-content {
    width: 1200px;
    margin: 40px auto 0;
  }
}
</style>
