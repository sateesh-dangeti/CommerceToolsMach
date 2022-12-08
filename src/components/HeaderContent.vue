<template>
  <header v-if="data" class="header">
    <div class="note-div" v-if="data.notification_bar.show_announcement">
      <span
        v-if="typeof data.notification_bar.announcement_text === 'string'"
        v-html="data.notification_bar.announcement_text"
      />
    </div>
    <div class="max-width header-div">
      <div class="wrapper-logo">
        <router-link
          aria-current="page"
          class="logo-tag"
          title="Contentstack"
          to="/"
        >
          <img
            class="logo"
            :src="data.logo.url"
            :alt="data.logo.title"
            :title="data.logo.title"
          />
        </router-link>
      </div>
      <input id="menu-btn" class="menu-btn" type="checkbox" /><label
        class="menu-icon"
        for="menu-btn"
        ><span class="navicon"
      /></label>
      <nav class="menu">
        <ul class="nav-ul header-ul">
          <li
            v-for="navItems in data.navigation_menu"
            :key="navItems.title"
            class="nav-li"
          >
            <router-link
              :to="navItems.page_reference[0].url"
              active-class="active"
            >
              {{ navItems.label }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="json-preview">
        <Tooltip content="JSON Preview" direction="top"> </Tooltip>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
interface navHeaderList {
  title: string;
  url: string;
}

import { defineComponent } from 'vue';
import Stack from '../plugins/contentstack';
import { onEntryChange } from '../plugins/contentstack';
import Tooltip from '../components/ToolTip.vue';
import Links from '../typescript/data';

export default defineComponent({
  name: 'HeaderContent',
  components: {
    Tooltip,
  },
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
        contentTypeUid: 'header',
        referenceFieldPath: `navigation_menu.page_reference`,
        jsonRtePath: ['notification_bar.announcement_text'],
      });
      const responsePages: [navHeaderList] = await Stack.getEntries({
        contentTypeUid: 'page',
      });
      const navHeaderList = response[0].navigation_menu;
      if (responsePages.length !== response.length) {
        responsePages.forEach((entry) => {
          const hFound = response[0].navigation_menu.find(
            (navLink: Links) => navLink.label === entry.title
          );

          if (!hFound) {
            navHeaderList.push({
              label: entry.title,
              page_reference: [{ title: entry.title, url: entry.url }],
            });
          }
        });
      }
      this.data = response[0];
      this.$store.dispatch('setHeader', response[0]);
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
