<template>
  <v-app class="main">
    <Alert :alerts="alerts" :onAlertClick="onAlertClick" />
    <DefaultView />
  </v-app>
</template>

<script lang="ts">
// @ts-ignore
import DefaultView from './View.vue';
// @ts-ignore
import Alert from '@/components/Alert.vue';
import store from '@/store';

export default {
  name: 'Default',
  components: { DefaultView, Alert },
  methods: {
    onAlertClick(idx: number) {
      store.commit('REMOVE_ERROR', idx);
    },
  },
  computed: {
    alerts() {
      return store.state.errors.errors;
    },
  },
};
</script>

<style scoped>
.v-main {
  width: 1500px;
  margin: auto;
}
</style>
