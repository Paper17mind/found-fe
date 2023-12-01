<template>
  <div>
    <!-- <q-ajax-bar color="green"></q-ajax-bar> -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useCommon } from "./stores/storage";

export default defineComponent({
  name: "App",
  setup() {
    const store = useCommon();
    let tmp = localStorage.getItem("store");
    if (tmp) {
      const last = JSON.parse(tmp);
      store.$patch((state) => {
        Object.keys(last).forEach((e) => {
          state[e] = last[e];
        });
      });
    }
    store.$subscribe((mutation, state) => {
      mutation.payload;
      localStorage.setItem("store", JSON.stringify(state));
    });
  },
});
</script>
