import { Module } from 'vuex';
import { RootState } from '@/store';

export enum ErrorType {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export type Error = {
  message: string;
  type?: ErrorType;
};

// Utilities
export interface ErrorProps {
  errors: Error[];
}

const errorModule: Module<ErrorProps, RootState> = {
  state: {
    errors: [],
  },
  getters: {
    getErrors(state) {
      return state.errors;
    },
  },
  actions: {
    async setError(
      { state, commit },
      { message, type = ErrorType.Error }: Error,
    ) {
      commit('SET_ERROR', { message, type });

      const errorIndexToRemove =
        state.errors.length > 0 ? state.errors.length - 1 : 0;
      setTimeout(() => {
        commit('REMOVE_ERROR', errorIndexToRemove);
      }, 4000);
    },
  },
  mutations: {
    SET_ERROR(state, error: Error) {
      if (error) {
        state.errors.push(error);
      }
    },
    REMOVE_ERROR(state, idx: number) {
      if (idx !== undefined && idx !== null) {
        state.errors.splice(idx, 1);
      }
    },
  },
};

export default errorModule;
