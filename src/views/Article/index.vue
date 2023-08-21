<template>
  <FilterComp
    :sources="sources"
    :onChangeSearchHandler="debouncedOnChangeSearchHandler"
    :onSourceSelect="onSourceSelect"
    :selectedSources="selectedSources"
    :onErrorCall="onErrorCall"
    :query="queryStr"
    :historyModelHandler="historyModelHandler"
  />
  <History
    :showHistoryModal="showHistoryModal"
    :articles="visitedArticles"
    :onArticleClick="onArticleClick"
    :historyModelHandler="historyModelHandler"
  />
  <ArticleList
    :loading="loading"
    :articles="articles"
    :onArticleClick="onArticleClick"
    :error="articleListError"
  />
</template>

<script lang="ts">
// @ts-ignore
import FilterComp from './Filter.vue';
// @ts-ignore
import debounce from 'lodash/debounce';
// @ts-ignore
import ArticleList from './ArticleList.vue';
// @ts-ignore
import History from './History.vue';
import { ref } from 'vue';
import { ErrorType } from '@/store/errorHandler.module';

//** NOTE */
// this could be a boolean as well
// OR this could be handled inside the article module.
let articleListError = ref<string>();
let showHistoryModal = ref(false);

export default {
  name: 'Home',
  components: { ArticleList, FilterComp, History },
  async beforeCreate() {
    // fetch both in seperate try/catch to show seperate errors

    // fetch articles
    try {
      await this.$store.dispatch(
        'fetchArticleList',
        this.$store.state.article.query,
      );
    } catch (error: any) {
      articleListError.value = error;
      this.$store.dispatch('setError', {
        message: error,
        type: ErrorType.Error,
      });
    }
    // fetch sources
    try {
      await this.$store.dispatch('fetchSources');
    } catch (error: any) {
      this.$store.dispatch('setError', {
        message: 'Something went wrong while fetching Sources.',
        type: ErrorType.Error,
      });
    }
  },
  methods: {
    onChangeSearchHandler(e: InputEvent) {
      this.$store.dispatch(
        'fetchArticleList',
        (e.target as HTMLInputElement).value,
      );
    },
    onSourceSelect(sourceId: string) {
      this.$store.commit('SET_SELECTED_SOURCES', sourceId);
    },
    onArticleClick(id: string) {
      showHistoryModal.value = false;
      this.$router.push(`/articles/${id}`);
      this.$store.dispatch('markArticleAsVisited', id);
    },
    async onErrorCall() {
      try {
        await this.$store.dispatch('errorCall');
      } catch (err) {
        this.$store.dispatch('setError', {
          message: err,
          type: ErrorType.Error,
        });
      }
    },
    historyModelHandler() {
      showHistoryModal.value = !showHistoryModal.value;
    },
  },
  data() {
    return {
      debouncedOnChangeSearchHandler: debounce(
        this.onChangeSearchHandler as (e: InputEvent) => void,
        300,
      ),
      articleListError,
      showHistoryModal,
    };
  },
  computed: {
    articles() {
      const sourceId = this.$store.state.source.selectedSource?.id;
      return this.$store.getters.getArticleBySource(sourceId);
    },
    queryStr() {
      return this.$store.state.article.query || '';
    },
    loading() {
      return this.$store.state.article.loading;
    },
    sources() {
      return this.$store.state.source.list;
    },
    selectedSources() {
      return this.$store.state.source.selectedSource;
    },
    visitedArticles() {
      return this.$store.state.article.list.filter(({ id }) => {
        return this.$store.state.article.visitedArticleIds.has(id);
      });
    },
  },
};
</script>
