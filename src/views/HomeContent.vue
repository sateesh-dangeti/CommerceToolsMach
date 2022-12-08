<template>
  <RenderComponent
    v-if="data"
    :components="data.page_components"
    :page="data.title"
    :entryUid="data.uid"
    :locale="data.locale"
  />
  <NotFound v-else-if="data !== null" />
  <Skeletor v-else height="100vh" />
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Stack from '../plugins/contentstack';
import RenderComponent from '../components/RenderComponents.vue';
import { onEntryChange } from '../plugins/contentstack';
import NotFound from './NotFound.vue';
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';
import Data from "../typescript/pages";

export default defineComponent({
  name: 'HomeContent',
  components: {
    RenderComponent,
    NotFound,
    Skeletor
  },
  data() {
    return {
      data: {} as Data
    };
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      const response = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: `${this.$route.fullPath}`,
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: [
          'page_components.section_with_buckets.buckets.description'
        ]
      });
      this.data = response[0];
      this.$store.dispatch('setPage', response[0]);
      this.$store.dispatch('setBlogpost', null);
      document.title = this.data.title;
      const element = document.getElementsByClassName('cslp-tooltip');
      element[0] ? (element[0].outerHTML) : '';
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