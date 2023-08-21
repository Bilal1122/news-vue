<template>
  <v-card
    class="custom-card"
    :style="cardStyle"
    :key="props.title"
    @click="props.onClickHandler"
  >
    <div class="overlay"></div>

    <div class="overlay-text">
      <div class="d-flex justify-space-between">
        {{ format(new Date(props.publishedAt), 'EE dd MMM') }}
        <ToolBar :actions="props.toolbarActions" :cardId="props.id" />
      </div>
      <h2 class="custom-card-title">
        {{ props.title }}
      </h2>

      <v-card-actions>
        <v-list-item class="custom-card-author">
          <template v-slot:prepend>
            <v-avatar color="grey-darken-3" :image="authorAvatar"></v-avatar>
          </template>
          <v-list-item-title>{{ props.author }}</v-list-item-title>
          <v-list-item-subtitle>{{ props.source }}</v-list-item-subtitle>
        </v-list-item>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
// @ts-ignore
import ToolBar, { Action } from './ToolBar.vue';

interface Props {
  id: string;
  publishedAt: string;
  title: string;
  imageUrl: string;
  author?: string;
  source?: string;
  onClickHandler?: () => void;
  toolbarActions: Action[];
}
const props = defineProps<Props>();
const cardStyle = {
  backgroundImage: `url(${props.imageUrl})`,
};
const authorAvatar =
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light';
</script>

<script lang="ts">
export default {};
</script>

<style scoped>
.custom-card {
  border-radius: 15px;
  width: 280px;
  height: 350px;
  background-size: cover;
  background-position: top;
  position: relative;
  color: white;
  cursor: pointer;
}

.overlay {
  background-color: #000000b5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
}

.overlay-text {
  z-index: 1;
  padding: 14px;
  width: 100%;
  height: 100%;
}

.custom-card-title {
  width: 200px;
  line-height: 1.3;
  margin-top: 10px;
  font-size: 22px;
  /* max-height: 200px; */

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  white-space: normal;
}

.custom-card-author {
  position: absolute;
  bottom: 20px;
  left: 0;
}
</style>
