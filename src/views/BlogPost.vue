<template>
  <main>
    <BlogBanner v-if="banner" :data="banner.page_components[0].hero_banner" />
    <div
      class="blog-container"
      :data-pageref="data?.uid"
      data-contenttype="blog_post"
      :data-locale="data?.locale"
    >
      <div v-if="data" class="blog-detail">
        <h2>{{ data.title }}</h2>
        <p>
          {{ moment(data.date) }}, <strong>{{ data.author[0].title }}</strong>
        </p>
        <p v-html="data.body" />
      </div>
      <div v-if="data" class="blog-column-right">
        <div class="related-post">
          <h2>{{ banner.page_components[2].widget.title_h2 }}</h2>
          <div v-for="(blog, index) in data.related_post" :key="index">
            <a :key="index" :href="blog.url"
              ><h4>{{ blog.title }}</h4></a
            >
            <p v-html="blog.body.slice(0, 80)" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import moment from 'moment';
import Stack from '../plugins/contentstack';
import BlogBanner from '../components/BlogBanner.vue';
import { onEntryChange } from '../plugins/contentstack';

export default defineComponent({
  components: {
    BlogBanner
  },
  data() {
    return {
      data: null,
      banner: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    moment(param: string) {
      return moment(param).format('ddd, MMM D YYYY');
    },
    async getData() {
      try {
        const banner = await Stack.getEntryByUrl({
          contentTypeUid: 'page',
          entryUrl: `/blog`
        });
        const data = await Stack.getEntryByUrl({
          contentTypeUid: 'blog_post',
          entryUrl: `${this.$route.fullPath}`,
          referenceFieldPath: [`related_post`, `author`],
          jsonRtePath: ['body', 'related_post.body']
        });
        this.data = data[0];
        this.banner = banner[0];
        this.$store.dispatch('setPage', banner[0]);
        this.$store.dispatch('setBlogpost', data[0]);
        const element: any = document.getElementsByClassName('cslp-tooltip');
        element[0] ? (element[0].outerHTML = null) : '';
      } catch (e) {
        return false;
      }
    }
  },
  mounted() {
    onEntryChange(() => {
      if (process.env.VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        this.getData();
      }
    });
  }
});
</script>
