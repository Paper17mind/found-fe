<template>
  <div
    class="row q-col-gutter-sm justify-center"
    :class="{ 'q-mx-xl q-mt-lg': $q.screen.gt.sm }"
  >
    <div class="col-12 col-md-4">
      <q-img :src="form.profile"></q-img>
    </div>
    <div class="col-12 col-md-8">
      <q-form>
        <q-input label="Nama" v-model="form.name" dense outlined></q-input>
        <q-input
          label="Email"
          type="email"
          v-model="form.email"
          outlined
          dense
          class="q-mt-sm"
        ></q-input>
        <q-input
          label="No Handphone"
          v-model="form.phone"
          outlined
          dense
          class="q-mt-sm"
        ></q-input>
        <q-file
          label="Foto Profile"
          v-model="form.file"
          outlined
          dense
          class="q-mt-sm"
        />
        <q-input
          label="Password"
          v-model="form.password"
          outlined
          dense
          class="q-mt-sm"
          hint="Isi untuk merubah password"
        ></q-input>
      </q-form>
      <q-btn
        class="q-mt-md q-mx-xl"
        style="width: 90%"
        color="primary"
        @click="update"
      >
        Simpan
      </q-btn>
      <!-- <pre>{{ form }}</pre> -->
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
        form.value = res.data?.data;
      });
    }
    function update() {
      const fd = new FormData();
      Object.keys(form.value)
        .filter((x) => form.value[x])
        .forEach((e) => fd.append(e, form.value[e]));
      api.post("users/" + form.value.id, fd).then((res) => {
        form.value = res.data?.data;
      });
    }
    onMounted(() => getData());
    return {
      form,
      update,
    };
  },
};
</script>

<style>
</style>
