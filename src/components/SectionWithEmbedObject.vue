<template>
  <div v-if="data">
    <div
      v-if="data.html_code_alignment === 'Left'"
      class="contact-page-section max-width"
    >
      <div class="contact-page-content">
        <h1>{{ data.title }}</h1>
        <p v-html="data.description.children[0].children[0].text" />
      </div>
      <div class="contact-page-form" v-html="data.html_code" />
    </div>
    <div
      v-if="data.html_code_alignment === 'Right'"
      class="contact-maps-section max-width"
    >
      <div class="maps-details" v-html="data.html_code" />
      <div class="contact-maps-content">
        <h2>{{ data.title }}</h2>
        <p v-html="data.description.children[0].children[0].text" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import Data from '../typescript/data';

export default defineComponent({
  props: {
    data:{
      required: true,
      type: Object as PropType<Data>
    }
  }
});
</script>
