<template>
  <div class="community-section">
    <div v-if="data" class="community-head">
      <h2>{{ data.title_h2 }}</h2>
      <router-link
        class="btn secondary-btn article-btn"
        :to="data.view_articles.href"
      >
        {{ data.view_articles.title }}
      </router-link>
    </div>
    <div v-if="data" class="home-featured-blogs">
      <div
        v-for="index in data.featured_blogs"
        :key="index"
        class="featured-blog"
      >
        <img
          :src="index.featured_image.url"
          class="blog-post-img"
          :alt="index.featured_image.title"
        />
        <div class="featured-content">
          <h3>{{ index.title }}</h3>
          <p
            v-if="typeof index.body === 'string'"
            v-html="index.body.slice(0, 255)"
          />
          <p>
            <router-link class="blogpost-readmore" :to="index.url">
              Read More -->
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Data from '../typescript/data';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props:{
    data:{
      required: true,
      type: Object as PropType<Data>
    }
  }
});
</script>