<template>
  <footer v-if="data">
    <div class="max-width footer-div">
      <div class="col-quarter">
        <router-link aria-current="page" class="logo-tag" to="/">
          <img
            :src="data.logo.url"
            :alt="data.logo.title"
            :title="data.logo.title"
            class="logo footer-logo"
          />
        </router-link>
      </div>
      <div class="col-half">
        <nav>
          <ul class="nav-ul">
            <li
              v-for="index in data.navigation.link"
              :key="index"
              class="footer-nav-li"
            >
              <router-link aria-current="page" :to="index.href">
                {{ index.title }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-quarter social-link">
        <div class="social-nav">
          <router-link
            v-for="socialLinks in data.social.social_share"
            :key="socialLinks"
            :to="socialLinks.link.href"
            :title="socialLinks.link.title"
            class="footer-social-links"
          >
            <img :src="socialLinks.icon.url" :alt="socialLinks.link.title" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p v-if="typeof data.copyright === 'string'" v-html="data.copyright" />
    </div>
  </footer>
</template>

<script lang="ts">
interface navFooterList {
  title: string;
  url: string;
}

import { defineComponent } from 'vue';
import Stack from '../plugins/contentstack';
import { onEntryChange } from '../plugins/contentstack';
import Links from '../typescript/data';

export default defineComponent({
  name: 'FooterContent',
  data() {
    return {
      data: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const response = await Stack.getEntries({
        contentTypeUid: 'footer',
        jsonRtePath: ['copyright'],
      });
      const responsePages: [navFooterList] = await Stack.getEntries({
        contentTypeUid: 'page',
      });

      const navFooterList = response[0].navigation.link;
      if (responsePages.length !== response.length) {
        responsePages.forEach((entry) => {
          const fFound = response[0].navigation.link.find(
            (link: Links) => link.title === entry.title
          );
          if (!fFound) {
            navFooterList.push({ title: entry.title, href: entry.url });
          }
        });
      }
      this.data = response[0];
      this.$store.dispatch('setFooter', response[0]);
    },
  },
  mounted() {
    onEntryChange(() => {
      if (process.env.VUE_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        this.getData();
      }
    });
  },
});
</script>
