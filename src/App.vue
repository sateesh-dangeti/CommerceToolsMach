<template>
  <div>
    <HeaderComponent />
    <router-view :key="$route.path" />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderContent.vue';
import FooterComponent from '@/components/FooterContent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>
