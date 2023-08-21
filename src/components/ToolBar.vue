<template>
  <div :style="{ zIndex: 2 }">
    <v-icon
      v-for="(action, index) in props.actions"
      :key="index"
      :icon="action.icon"
      :size="action.size || 'x-small'"
      @click.stop="() => action.onClick(props.cardId)"
      class="mr-2"
    >
    </v-icon>
  </div>
</template>

<script lang="ts" setup>
export type Action = {
  icon: string;
  size?: string;
  onClick: (title: string) => void;
};

export interface ToolBarProps {
  actions: Action[];
  cardId: string;
}

const props = defineProps<ToolBarProps>();
</script>
