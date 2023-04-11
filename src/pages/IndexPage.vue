<template>
  <q-page class="flex flex-center">
    <img alt="Loading" src="~assets/logo.png"  style="width: 200px" />
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const router = useRouter();
    onMounted(() => router.push("/register"));
  },
});
</script>
