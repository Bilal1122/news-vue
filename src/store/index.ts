// Utilities
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

import articleModule, { ArticleProps } from './article.module';
import sourceModule, { SourceProps } from './source.module';
import errorModule, { ErrorProps } from './errorHandler.module';

export interface RootState {
  article: ArticleProps;
  source: SourceProps;
  errors: ErrorProps;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

const store: Store<RootState> = createStore({
  modules: {
    article: articleModule,
    source: sourceModule,
    errors: errorModule,
  },
  // plugins: [createPersistedState({
  //   paths: ['article.visitedArticleIds']
  // })],
});

export default store;
