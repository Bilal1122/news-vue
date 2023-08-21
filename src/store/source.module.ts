import { Module } from 'vuex';
import { RootState } from '@/store';
import { createUrl } from '@/utils/global';

export type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

// Utilities
export interface SourceProps {
  list: Source[];
  selectedSource: Source | null;
  loading: boolean;
}

const GET_SOURCES_URL = createUrl('sources');

const sourceModule: Module<SourceProps, RootState> = {
  state: {
    list: [],
    selectedSource: null,
    loading: false,
  },
  actions: {
    async fetchSources({ commit }) {
      try {
        commit('SET_LOADING', true);
        const { sources } = await fetch(GET_SOURCES_URL).then((response) =>
          response.json(),
        );
        commit('SET_SOURCES', sources);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
  mutations: {
    SET_SOURCES(state, sources: Source[]) {
      state.list = sources;
    },
    SET_SELECTED_SOURCES(state, source: Source) {
      state.selectedSource = source;
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },
  },
};

export default sourceModule;
