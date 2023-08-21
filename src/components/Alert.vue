<template>
  <div v-for="(alert, index) in alerts" :key="index">
    <v-alert
      border="start"
      elevation="2"
      theme="dark"
      :color="alert.type"
      class="alert"
      @click="() => props.onAlertClick(index)"
      >{{ alert.message }}</v-alert
    >
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Error } from '@/store/errorHandler.module';

interface Props {
  alerts: Error[];
  onAlertClick: (idx: number) => void;
}

const props = defineProps<Props>();

const alerts = computed(() => props.alerts);
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  width: 500px;
  min-height: 100px;
}

@media (max-width: 600px) {
  .alert {
    width: auto;
    max-width: 80vw;
  }
}
</style>
