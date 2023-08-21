<template>
  <v-dialog v-model="props.showHistoryModal" width="1200">
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
// @ts-ignore
import ArticleList from './ArticleList.vue';

const props = defineProps<{
  articles: Article[];
  showHistoryModal: boolean;
  onArticleClick: (id: string) => void;
  historyModelHandler: () => void;
}>();
</script>

<script lang="ts">
export default { name: 'History' };
</script>
