/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { aliases, fa } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';

// Composables
import { createVuetify } from 'vuetify';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VSkeletonLoader,
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          background: '#fdfdfd',
          // color: 'white'
          // primary: '#1867C0',
          // secondary: '#5CBBF6',
        },
      },
    },
  },
});
