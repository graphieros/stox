import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { StoreProp, UnknownObj } from "../types";

export const key: InjectionKey<Store<State>> = Symbol();

export interface State {
  [key: string]: string | number | any;
}

export const store = createStore<State>({
  state: {
    isMobile: false,
    isTablet: false,
    dataSet: {
      metaData: {},
      timeSeries: [],
    },
  },
  mutations: {
    LOAD_DATASET(state, payload: UnknownObj) {
      console.log(payload);
      state.dataSet.metaData = payload["Meta Data"] || {};
      state.dataSet.timeSeries = payload["Time Series (5min)"] || [];
    },
    UPDATE_FIELD(state, { field, val }: StoreProp): void {
      if (field) state[field.toString()] = val;
    },
  },
  actions: {},
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
