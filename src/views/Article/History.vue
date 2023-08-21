<template>
  <v-dialog v-model="dialogVisible" width="1200" activator="parent">
    <v-card>
      <v-card-text> Visited Articles </v-card-text>
      <v-container>
        <ArticleList
          :loading="false"
          :articles="props.articles"
          :onArticleClick="props.onArticleClick"
        />
      </v-container>
      <v-card-actions>
        <v-btn color="primary" block @click="props.historyModelHandler"
          >CLOSE</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { Article } from '@/store/article.module';
import { ref } from 'vue';
// @ts-ignore
import ArticleList from './ArticleList.vue';

const props = defineProps<{
  articles: Article[];
  showHistoryModal: boolean;
  onArticleClick: (id: string) => void;
  historyModelHandler: () => void;
}>();

const dialogVisible = ref(props.showHistoryModal);
</script>

<script lang="ts">
export default { name: 'History' };
</script>
