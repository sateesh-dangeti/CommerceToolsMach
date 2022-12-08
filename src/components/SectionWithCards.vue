<template>
  <div v-if="data" class="demo-section">
    <div v-for="index in data.cards" :key="index" class="cards">
      <h3>{{ index.title_h3 }}</h3>
      <p>{{ index.description }}</p>
      <div class="card-cta">
        <router-link class="btn primary-btn" :to="index.call_to_action.href">
          {{ index.call_to_action.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Data from '../typescript/data';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
    data:{
      required: true,
      type: Object as PropType<Data>
    }
  }
});
</script>
