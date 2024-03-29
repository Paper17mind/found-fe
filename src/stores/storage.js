import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCommon = defineStore("common", {
  state: () => ({
    counter: 0,
    user: {},
    levels: [],
    permissions: [],
    token: null,
    student: {},
    va: {},
    info: {
      categories: [],
      periode: [],
    },
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    getInfo() {
      api.get("info").then(({ data }) => {
        this.info = data;
      });
    },
  },
});
