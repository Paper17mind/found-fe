<template>
  <div class="row q-col-gutter-sm">
    <q-card class="col-12 col-md-6 mx-auto">
      <q-card-section>
        <q-form>
          <q-input label="Email" v-model="form.email" outlined dense></q-input>
          <q-input
            label="Password"
            v-model="form.password"
            dense
            outlined
          ></q-input>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const form = ref({});
    return {
      form,
    };
  },
};
</script>

<style>
</style>
