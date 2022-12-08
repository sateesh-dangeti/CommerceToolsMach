<template>
  <main
    v-if="components"
    :data-pageref="entryUid"
    data-contenttype="page"
    :data-locale="locale"
  >
    <ClientOnly>
      <Devtools />
    </ClientOnly>
    <template v-for="(component, index) in components">
      <HeroBanner
        v-if="component.hero_banner && page === 'Home'"
        :key="index"
        title="home-content"
        :data="component.hero_banner"
      />
      <HeroBanner
        v-if="component.hero_banner && page !== 'Home'"
        :key="index"
        title="about-content"
        :data="component.hero_banner"
      />
      <SectionComponent
        v-if="component.section"
        :key="index"
        :data="component.section"
      />
      <BlogSection
        v-if="component.from_blog"
        :key="index"
        :data="component.from_blog"
      />
      <SectionWithCards
        v-if="component.section_with_cards"
        :key="index"
        :data="component.section_with_cards"
      />
      <SectionWithBuckets
        v-if="component.section_with_buckets && page === 'Home'"
        :key="index"
        :data="component.section_with_buckets"
      />
      <AboutSectionBucket
        v-if="component.section_with_buckets && page !== 'Home'"
        :key="index"
        :data="component.section_with_buckets"
      />
      <TeamSection
        v-if="component.our_team"
        :key="index"
        :data="component.our_team"
      />
      <SectionWithEmbedObject
        v-if="component.section_with_html_code && page === 'Contact Us'"
        :key="index"
        :data="component.section_with_html_code"
      />
      <SectionWithEmbedObject
        v-if="component.section_with_html_code && page !== 'Contact Us'"
        :key="index"
        :data="component.section_with_html_code"
      />
    </template>
  </main>
</template>

<script lang="ts">
interface Component {
  HeroBanner: object;
  Section: object;
  SectionWithBuckets: object;
  SectionWithCards: object;
  AboutSectionBucket: object;
  TeamSection: object;
  BlogSection: object;
  SectionWithEmbedObject: object;
  Devtools: object;
}

interface Page {
  page: string;
}

interface EntryUid {
  page: string;
}

interface Locale {
  page: string;
}

import { defineComponent, PropType } from 'vue';
import HeroBanner from '../components/HeroBanner.vue';
import SectionComponent from '../components/SectionContent.vue';
import SectionWithCards from '../components/SectionWithCards.vue';
import AboutSectionBucket from '../components/AboutSectionBucket.vue';
import TeamSection from '../components/TeamSection.vue';
import SectionWithEmbedObject from '../components/SectionWithEmbedObject.vue';
import SectionWithBuckets from '../components/SectionWithBuckets.vue';
import BlogSection from '../components/BlogSection.vue';
import Devtools from '../components/DevTools.vue';
export default defineComponent({
  components: {
    HeroBanner,
    SectionComponent,
    SectionWithBuckets,
    SectionWithCards,
    AboutSectionBucket,
    TeamSection,
    BlogSection,
    SectionWithEmbedObject,
    Devtools,
  },

  props: {
    components: {
      required: true,
      type: Object as PropType<Component>,
    },
    page: {
      required: true,
      type: Object as PropType<Page>,
    },
    entryUid: {
      required: true,
      type: Object as PropType<EntryUid>,
    },
    locale: {
      required: true,
      type: Object as PropType<Locale>,
    },
  },
});
</script>
