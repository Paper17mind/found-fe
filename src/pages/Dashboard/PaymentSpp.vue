<template>
  <div class="row q-col-gutter-sm justify-center">
    <div class="col-12 col-md-10">
      <div class="row q-col-gutter-sm">
        <div class="col-12 text-h6 q-my-md text-underline">Pembayaran SPP</div>
        <div class="col-12 col-md-2">Deskripsi</div>
        <div class="col-12 col-md-10">
          <q-input
            placeholder="deskripsi"
            v-model="form.description"
            dense
            outlined
          ></q-input>
        </div>
        <div class="col-12 col-md-2">Jumlah Tagihan</div>
        <div class="col-12 col-md-10">
          <q-input
            placeholder="jml tagihan"
            v-model="form.description"
            dense
            outlined
          ></q-input>
        </div>
        <div class="col-12 col-md-2">Pembayaran</div>
        <q-select
          class="col-6 col-md-2"
          label="Periode"
          v-model="form.periode"
          dense
          outlined
        ></q-select>
        <q-select
          class="col-6 col-md-2"
          label="Type"
          v-model="form.periode"
          dense
          outlined
        ></q-select>
        <q-select
          class="col-6 col-md-2"
          label="Jenjang"
          v-model="form.periode"
          dense
          outlined
        ></q-select>
        <q-select
          class="col-6 col-md-2"
          label="Kelas"
          v-model="form.periode"
          dense
          outlined
        ></q-select>
      </div>
    </div>
    <div class="col-12 text-center">
      <q-btn color="primary" class="q-px-xl q-mt-lg">Buat</q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const form = ref({});
    return {
      form,
    };
  },
});
</script>

<style></style>
