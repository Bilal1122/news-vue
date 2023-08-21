<template>
  <v-container :style="{ textAlign: 'center' }" v-show="loading">
    <v-progress-circular indeterminate color="black" />
  </v-container>

  <li class="articles-container">
    <ul
      v-show="!loading || articles.length > 0"
      v-for="(item, index) in articles"
      :key="index"
    >
      <Card
        :id="item.id"
        :publishedAt="item.publishedAt"
        :title="item.title"
        :imageUrl="item.urlToImage"
        :author="item?.author"
        :source="item?.source?.name"
        :onClickHandler="() => onArticleClick(item.id)"
        :toolbarActions="toolbarActions"
      />
    </ul>

    <v-dialog v-model="showModal" width="400">
      <v-card>
        <v-card-text> Edit Headline Title </v-card-text>
        <v-container>
          <v-textarea
            label="Title"
            :model-value="selectedArticle?.title"
            :rules="rules"
            @input="onArticleTitleChange"
          ></v-textarea>
        </v-container>
        <v-card-actions>
          <v-btn color="primary" block @click="onArticleSave">SAVE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <h1 v-show="!loading && !articleListError && articles.length === 0">
      No Results Found.
    </h1>
    <h1 v-show="!loading && !!articleListError">{{ articleListError }}</h1>
  </li>
</template>

<script setup lang="ts">
import Card from '../../components/Card.vue';
import { Article } from '../../store/article.module';
import { computed, ref } from 'vue';
import { Action } from '@/components/ToolBar.vue';
import store from '@/store';
import { checkStringLength } from '@/utils/global';

const props = defineProps<{
  loading: boolean;
  articles: Article[];
  articleListError?: string;
  onArticleClick: (id: string) => void;
}>();

// EDIT FEATURE - START
let selectedArticle = ref<Article | null>(null);
let showModal = ref(false);
const ErrorMessage = 'Max 255 characters';
const rules = [(v: string) => !checkStringLength(v, 255) || ErrorMessage];

const showModalHandler = (id: string) => {
  const article = store.getters.articlesById[id];
  if (article) {
    showModal.value = true;
    selectedArticle.value = { ...article };
  }
};

const onArticleTitleChange = (e: any) => {
  if (!selectedArticle.value) return;
  selectedArticle.value.title = e.target.value;
};

const onArticleSave = () => {
  const title = selectedArticle.value?.title;
  if (!title) return;
  if (checkStringLength(title, 255)) {
    alert(ErrorMessage);
    return;
  }
  showModal.value = false;
  store.dispatch('updateTitle', selectedArticle.value);
};
// EDIT FEATURE - END

const loading = computed(() => props.loading);
const articles = computed(() => props.articles || []);
const articleListError = computed(() => props.articleListError);
const toolbarActions = [
  { icon: 'mdi:mdi-pencil-outline', onClick: showModalHandler },
  { icon: 'mdi:mdi-open-in-new', onClick: props.onArticleClick },
] as Action[];
</script>

<style scoped>
.articles-container {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin: auto;
  padding: 0px 50px;
  margin-bottom: 20px;
}
</style>
