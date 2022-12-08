import * as contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';

import ContentstackLivePreview from '@contentstack/live-preview-utils';

const Stack = contentstack.Stack({
  api_key: process.env.VUE_APP_CONTENTSTACK_API_KEY,
  delivery_token: process.env.VUE_APP_CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.VUE_APP_CONTENTSTACK_ENVIRONMENT,
  region: process.env.VUE_APP_CONTENTSTACK_REGION
    ? process.env.VUE_APP_CONTENTSTACK_REGION
    : 'us',
  live_preview: {
    management_token: process.env.VUE_APP_CONTENTSTACK_MANAGEMENT_TOKEN
      ? process.env.VUE_APP_CONTENTSTACK_MANAGEMENT_TOKEN
      : '',
    enable: true,
    host: process.env.VUE_APP_CONTENTSTACK_API_HOST
      ? process.env.VUE_APP_CONTENTSTACK_API_HOST
      : ''
  }
});

if (process.env.VUE_APP_CONTENTSTACK_API_HOST) {
  Stack.setHost(process.env.VUE_APP_CONTENTSTACK_API_HOST);
}

const renderOption = {
  ['span']: (node, next) => {
    return next(node.children);
  }
};

/**
 * initialize live preview
 */
ContentstackLivePreview.init({
  enable: true,
  stackSdk: Stack,
  clientUrlParams: {
    host: process.env.VUE_APP_CONTENTSTACK_APP_HOST
      ? process.env.VUE_APP_CONTENTSTACK_APP_HOST
      : ''
  },
  ssr: false
});

Stack.setHost(process.env.VUE_APP_CONTENTSTACK_API_HOST);

export const onEntryChange = ContentstackLivePreview.onEntryChange;

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntries({ contentTypeUid, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          result => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption
              });
            resolve(result[0]);
          },
          error => {
            reject(error);
          }
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryByUrl({ contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        result => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption
            });
          resolve(result[0]);
        },
        error => {
          reject(error);
        }
      );
    });
  }
};
