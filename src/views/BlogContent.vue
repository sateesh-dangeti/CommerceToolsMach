<template>
  <main v-if="banner">
    <BlogBanner :data="banner.page_components[0].hero_banner" />
    <div
      class="blog-container"
      :data-pageref="banner.uid"
      data-contenttype="page"
      :data-locale="banner.locale"
    >
      <div class="blog-column-left">
        <div v-for="(list, index) in recentBlog" :key="index" class="blog-list">
          <router-link :to="list.url">
            <img
              alt="blog img"
              class="blog-list-img"
              :src="list.featured_image.url"
            />
          </router-link>
          <div class="blog-content">
            <router-link :to="list.url">
              <h3>{{ list.title }}</h3>
            </router-link>
            <p>
              {{ moment(list.date) }},
              <strong>{{ list.author[0].title }}</strong>
            </p>
            <p v-html="list.body.slice(0, 250)" />
            <router-link :to="list.url">
              <span>Read more --&gt;</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="blog-column-right">
        <h2>{{ banner.page_components[1].widget.title_h2 }}</h2>
        <router-link
          v-for="(component, index) in archivedList"
          :key="index"
          :to="component.url"
        >
          <div>
            <h4>{{ component.title }}</h4>
            <p v-html="component.body.slice(0, 80)" />
          </div>
        </router-link>
      </div>
    </div>
  </main>
  <Skeletor v-else height="100vh" />
</template>

<script lang="ts">

interface List {
    author: Array<any>;
    body: string;
    date: string;
    featured_image:object;
    is_archived: boolean;
    related_post: Array<any>;
    locale: string;
    seo: object;
    title: string;
    url: string;
}

import { defineComponent } from 'vue';
import moment from 'moment';
import Stack from '../plugins/contentstack';
import BlogBanner from '../components/BlogBanner.vue';
import { onEntryChange } from '../plugins/contentstack';
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';

export default defineComponent({
  components: {
    BlogBanner,
    Skeletor
  },
  data() {
    return {
      banner:  null,
      archivedList: null,
      recentBlog: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const archived = [] as any;
      const recentPost = [] as any;
      const data = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: `${this.$route.fullPath}`
      });
      const list: [List] = await Stack.getEntries({
        contentTypeUid: 'blog_post',
        referenceFieldPath: [`author`, `related_post`],
        jsonRtePath: ['body']
      });
      list.forEach(item => {
        if (item.is_archived) {
          archived.push(item);
        } else {
          recentPost.push(item);
        }
      });
      this.banner = data[0];
      this.recentBlog = recentPost;
      this.archivedList = archived;
      this.$store.dispatch('setPage', data[0]);
      this.$store.dispatch('setBlogpost', list);
      const element: any = document.getElementsByClassName('cslp-tooltip');
      element[0] ? (element[0].outerHTML = null) : '';
    },
    moment(param: string) {
      return moment(param).format('ddd, MMM D YYYY');
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
