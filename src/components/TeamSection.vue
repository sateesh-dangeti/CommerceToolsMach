<template>
  <div class="about-team-section">
    <div v-if="data" class="team-head-section">
      <h2>{{ data.title_h2 }}</h2>
      <p>
        {{ data.description }}
      </p>
    </div>
    <div class="team-content">
      <div v-for="index in data.employees" :key="index" class="team-details">
        <img :src="index.image.url" :alt="index.name" />
        <div class="team-details">
          <h3>{{ index.name }}</h3>
          <p>{{ index.designation }}</p>
        </div>
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
