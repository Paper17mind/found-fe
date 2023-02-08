<template>
  <q-form ref="periodic">
    <div class="row q-col-gutter-md">
      <div class="col-12 text-h5">Sumber Info {{ school }}</div>
      <div class="col-12 col-md-3 text-caption">Tahu {{ school }} dari :</div>
      <div class="col-12 col-md-7">
        <q-checkbox
          class="q-ma-sm"
          :false-value="undefined"
          v-for="x in sources"
          :key="x"
          :val="x"
          v-model="selected"
          :label="x"
          dense
        ></q-checkbox>
      </div>
      <!--  -->
      <div class="col-12">
        <div class="text-h5">Data Nilai Dan Absensi</div>
        <div class="text-caption">
          <strong>Note: </strong> Kosongkan jika data belum ada
        </div>
      </div>
      <div class="col-12">
        <div class="text-h5">Apakah Anda Mengininkan Beasiswa ?</div>
      </div>
      <div class="col-12 col-md-2 text-caption">Program Beasiswa * :</div>
      <div class="col-12 col-md-4">
        <q-select :options="['Ya', 'Tidak']" dense outlined></q-select>
      </div>
    </div>
  </q-form>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    item: Object,
    school: {
      type: String,
      default: "Our School",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    return {
      sources: [
        "Website",
        "Keluarga",
        "Instagram",
        "Youtube",
        "Kerabat/Teman",
        "Internet",
        "Facebook",
        "BillBoard",
      ],
      selected: ref([]),
      form: computed({
        get: () => props.item,
        set: (v) => emit("change", v),
      }),
    };
  },
});
</script>

<style>
</style>
