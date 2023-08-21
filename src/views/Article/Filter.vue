<template>
  <div class="filters">
    <div class="container">
      <v-text-field
        label="Search"
        v-model="queryStr"
        placeholder="Search"
        variant="solo"
        prepend-inner-icon="mdi:mdi-magnify"
        class="field"
        @input="props.onChangeSearchHandler"
      />
      <v-autocomplete
        label="Select Source"
        placeholder="Select Source"
        :items="props.sources"
        v-model="selectedVal"
        item-title="name"
        item-value="id"
        return-object
        variant="solo"
        autocomplete
        class="field"
      ></v-autocomplete>
      <!-- <text-button class="reset-button text-decoration-underline text-blue-lighten-1">
        clear
      </text-button> -->
    </div>
    <div>
      <v-btn elevated color="red" @click="props.onErrorCall" class="mr-4">
        Error Call
      </v-btn>
      <v-btn elevated color="primary" @click="props.historyModelHandler">
        Show History
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Source } from '@/store/source.module';

const props = defineProps<{
  sources: Source[];
  query?: string;
  selectedSources: Source | null;
  onChangeSearchHandler: (e: InputEvent) => void;
  onSourceSelect: (e: any) => void;
  onErrorCall: () => void;
  historyModelHandler: () => void;
}>();

const selectedVal = ref<Source | null>(props.selectedSources);
const queryStr = ref(props.query);

watch(selectedVal, (val) => {
  props.onSourceSelect(val);
});
</script>

<style scoped>
.container {
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
}

.filters {
  padding: 30px 30px 10px 50px;
  position: sticky;
  justify-content: space-between;
  top: 0;
  z-index: 10;
  background: rgb(var(--v-theme-background));
  margin-bottom: 50px;
}

.field {
  min-width: 300px;
  flex: 1;
  margin-right: 20px;
}

/* .reset-button {
  display: flex;
  align-items: center;
  cursor: pointer;
} */
</style>
