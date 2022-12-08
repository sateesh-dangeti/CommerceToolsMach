<template>
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="staticBackdropLabel" class="modal-title">JSON Preview</h2>
          <div
            class="tooltip-wrapper"
            v-on:click="copyObject(JSON.stringify(response))"
          >
            <div class="tooltip-copy">
              <img src="/copy.svg" class="copyIcon" alt="copy icon" />
              <div class="tooltip-top-copy" v-if="this.componentKey > 0">
                {{ this.messageCopied }}
              </div>
              <div class="tooltip-top-copy" v-else>
                {{ this.messageCopy }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <pre id="jsonViewer">
            <json-viewer id="jsonViewer">{{response}}</json-viewer>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

interface Header {
  local: string;
  logo: string;
  navigation_menu: [];
  notification_bar: string;
  title: string;
}

interface Footer {
  local: string;
  logo: string;
  copyright: string;
  navigation: [];
  social: string;
  title: string;
}

interface Response {
    page?: string;
    blog_post?: string;
    headers: Header;
    footer: Footer;
}

import '@alenaksu/json-viewer';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      messageCopy: 'Copy',
      messageCopied: 'Copied',
      componentKey: 0
    };
  },
  computed: {
    response() {
      const { header, footer, page, blogPost } = this.$store.state;
      const response: Response = {
        headers: header,
        footer: footer
      };

      page && (response.page = page);
      blogPost && (response.blog_post = blogPost);
      const jsonData: any = this.filterObject(response);
      return jsonData;
    }
  },
  methods: {
    copyObject: function(response: string) {
      navigator.clipboard.writeText(response);
      this.componentKey++;
    },
    filterObject: function(inputObject: any) {
      const unWantedProps = [
        'uid',
        '_version',
        'ACL',
        '_in_progress',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'publish_details'
      ];
      for (const key in inputObject) {
        unWantedProps.includes(key) && delete inputObject[key];
        if (typeof inputObject[key] !== 'object') {
          continue;
        }
        inputObject[key] = this.filterObject(inputObject[key]);
      }
      return inputObject;
    }
  },
  mounted: function mounted() {
    const jsonData = this.filterObject(this.response);
    this.response = JSON.stringify(jsonData);
  },
  updated() {
    this.componentKey &&
      setTimeout(() => {
        this.componentKey = 0;
      }, 300);
  }
});
</script>
<style></style>
