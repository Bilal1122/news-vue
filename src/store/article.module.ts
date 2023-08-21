import { Module } from 'vuex';
import { RootState } from '@/store';
import { createUrl, stringToUUID } from '@/utils/global';

export type Article = {
  id: string;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source?: {
    id?: string;
    name?: string;
  };
};

// Utilities
export interface ArticleProps {
  loading: boolean;
  list: Article[];
  error?: string;
  visitedArticleIds: Set<string>;
  query?: string;
}

const GET_ARTICLES_URL = createUrl('top-headlines');
const ERROR_CALL = createUrl('sources', true);

const newsModule: Module<ArticleProps, RootState> = {
  state: {
    loading: false,
    list: [],
    visitedArticleIds: new Set(),
    query: '',
  },
  getters: {
    getArticleBySource: (state) => (sourceId: string) =>
      state.list.filter(({ source }) =>
        sourceId ? source?.id === sourceId : true,
      ),
    // make hash with key as id for easier and faster accessibility.
    articlesById: (state) => {
      return state.list.reduce(
        (obj: { [key: string]: Article }, art: Article) => {
          obj[art.id] = art;
          return obj;
        },
        {},
      );
    },
  },
  actions: {
    async fetchArticleList({ commit }, query = '') {
      try {
        commit('SET_LOADING', true);
        commit('SET_QUERY', query);
        let { articles } = await fetch(`${GET_ARTICLES_URL}&q=${query}`).then(
          (response) => response.json(),
        );

        // add id property to articles;
        articles = articles.map((art: Article) => {
          art.id = stringToUUID(art.title);
          return art;
        });

        commit('SET_NEWS_LIST', articles);
      } catch (err) {
        throw `Something went wrong while fetching Articles ${err}`;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async errorCall() {
      const { status } = await fetch(`${ERROR_CALL}`).then((response) =>
        response.json(),
      );
      if (status === 'error') {
        throw new Error('Something went wrong');
      }
    },
    updateTitle({ commit, state }, newArticle: Article) {
      const idx = state.list.findIndex((obj) => obj.id === newArticle.id);
      commit('UPDATE_ARTICLE', { idx, newArticle });
    },
    markArticleAsVisited({ commit, state }, id: string) {
      // NOTE:
      // as this does not presisits we can also save it in localstorage
      if (!state.visitedArticleIds.has(id)) {
        commit('SET_VISITED_ARTICLE_ID', id);
      }
    },
  },
  mutations: {
    SET_NEWS_LIST(state, articles) {
      state.list = articles;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    UPDATE_ARTICLE(
      state,
      { idx, newArticle }: { idx: number; newArticle: Article },
    ) {
      state.list.splice(idx, 1, newArticle);
    },
    SET_VISITED_ARTICLE_ID(state, id) {
      state.visitedArticleIds.add(id);
    },
    SET_QUERY(state, str: string) {
      state.query = str;
    },
  },
};

export default newsModule;
