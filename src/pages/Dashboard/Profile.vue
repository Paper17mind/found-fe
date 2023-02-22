<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12 col-md-8">
      <pre>{{ form }}</pre>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { api } from "src/boot/axios";
export default {
  setup() {
    const form = ref({});
    function getData() {
      api.get("auth/user").then((res) => {
        form.value = res.data;
      });
    }
    onMounted(() => getData());
    return {
      form,
    };
  },
};
</script>

<style>
</style>
