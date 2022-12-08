<template>
  <div v-if="data" class="home-advisor-section">
    <template v-if="data.image_alignment === 'Left'">
      <img :src="data.image.url" :alt="data.image.filename" />
      <div class="home-content">
        <h2>{{ data.title_h2 }}</h2>
        <p>
          {{ data.description }}
        </p>
        <router-link
          v-if="data.call_to_action.title"
          aria-current="page"
          class="btn secondary-btn"
          to="/"
        >
          {{ data.call_to_action.title }}
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="home-content">
        <h2>{{ data.title_h2 }}</h2>
        <p>
          {{ data.description }}
        </p>
        <router-link
          v-if="data.call_to_action.title"
          aria-current="page"
          class="btn secondary-btn"
          to="/"
        >
          {{ data.call_to_action.title }}
        </router-link>
      </div>
      <img :src="data.image.url" :alt="data.image.filename" />
    </template>
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
