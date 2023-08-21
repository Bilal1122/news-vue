<template>
  <v-container class="container">
    <v-btn
      variant="plain"
      prepend-icon="mdi:mdi-arrow-left"
      class="pa-0 absolute top-0"
      absolute
      @click="onBackClick"
    >
      Back
    </v-btn>
    <h1 class="font-weight-black">{{ article?.title }}</h1>
    <p class="font-weight-regular text-uppercase text-subtitle-2 mt-4">
      by {{ article?.author }}
    </p>
    <p class="font-weight-regular text-uppercase text-subtitle-2 mb-6">
      published {{ article && format(new Date(article?.publishedAt), 'PPpp') }}
    </p>
    <div
      class="banner"
      :style="{ backgroundImage: `url(${article?.urlToImage})` }"
    ></div>
    <p class="my-4">{{ article?.description }}</p>
    <v-divider />
    <p class="my-4">{{ article?.content }}</p>
  </v-container>
</template>

<script lang="ts">
import { format } from 'date-fns';
import { onBeforeMount } from 'vue';
import store from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { Article } from '@/store/article.module';
import { ErrorType } from '@/store/errorHandler.module';
export default {
  name: 'ArticleDetails',
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    onBeforeMount(() => {
      const articleId = route?.params?.id as any;
      const article = store.getters.articlesById[articleId];
      if (!article) {
        store.commit('SET_ERROR', {
          message: `Article at index: ${articleId} not found.`,
          type: ErrorType.Error,
        });
        router.push('/');
      }
    });
  },
  methods: {
    onBackClick() {
      this.$router.push('/');
    },
  },
  data() {
    return {
      format,
    };
  },
  computed: {
    article() {
      return store.getters.articlesById[
        this.$route.params.id as any
      ] as Article;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.banner {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: top;
}
</style>
