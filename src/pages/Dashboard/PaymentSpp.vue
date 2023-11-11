<template>
  <div class="row q-col-gutter-sm justify-center">
    <div class="col-12 col-md-10">
      <div class="row q-col-gutter-sm">
        <div class="col-12 text-h6 q-my-md text-underline">Pembayaran SPP</div>
        <div class="col-12 col-md-2">Deskripsi</div>
        <div class="col-12 col-md-10">
          <q-input
            placeholder="Deskripsi"
            v-model="form.notes"
            dense
            outlined
          ></q-input>
        </div>
        <div class="col-12 col-md-2">Jumlah Tagihan</div>
        <div class="col-12 col-md-10">
          <q-input
            placeholder="Jml tagihan"
            v-model="form.amount"
            dense
            outlined
            :hint="price(form.amount || 0)"
          ></q-input>
        </div>
        <div class="col-12 col-md-2">Pembayaran</div>
        <q-select
          class="col-6 col-md-2"
          label="Periode"
          v-model="form.periode"
          :options="categories.periodes"
          option-label="name"
          option-value="name"
          emit-value
          map-options
          dense
          outlined
        ></q-select>
        <q-select
          class="col-6 col-md-2"
          label="Type"
          v-model="form.school_type"
          :options="types"
          dense
          outlined
        ></q-select>
        <q-select
          class="col-6 col-md-2"
          label="Jenjang"
          v-model="form.level"
          :options="levels"
          option-label="name"
          option-value="name"
          emit-value
          map-options
          dense
          outlined
        ></q-select>
        <q-select
          class="col-6 col-md-2"
          label="Kelas"
          v-model="form.for_class"
          :options="classes"
          dense
          outlined
        ></q-select>
        <q-select
          class="col-6 col-md-2"
          label="Tagihan Untuk Bulan"
          v-model="form.month"
          :options="months"
          dense
          outlined
        ></q-select>
      </div>
    </div>
    <!-- {{ classes }} -->
    <div class="col-12 text-center">
      <q-btn
        :loading="loading"
        @click="createSpp"
        color="primary"
        class="q-px-xl q-mt-lg"
      >
        Buat
      </q-btn>
    </div>
    <!-- <div class="col-12" v-if="data.length > 0">
      <div class="text-bold">Notifikasi pembayaran SPP berhasil dikirim</div>
      <q-item v-for="x in data" :key="x.id">

      </q-item>
    </div> -->
  </div>
</template>

<script>
import collect from "collect.js";
import { api } from "src/boot/axios";
import { price } from "src/compose/utils";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const form = ref({});
    const data = ref([]);
    const loading = ref(false);
    const categories = ref({
      periodes: [],
      levels: [],
    });
    function getCategories() {
      api
        .get("categories", {
          params: { types: ["periode", "jenjang"] },
        })
        .then((res) => {
          categories.value = {
            levels: res.data?.data?.filter((x) => x.type === "jenjang"),
            periodes: res.data?.data?.filter((x) => x.type === "periode"),
          };
        });
    }
    function createSpp() {
      data.value = [];
      loading.value = true;
      api
        .post("create-spp", form.value)
        .then((res) => {
          data.value = res.data?.data;
          loading.value = false;
        })
        .catch((e) => {
          alert(e.response?.data?.message || e);
          loading.value = false;
        });
    }
    onMounted(() => getCategories());
    return {
      price,
      form,
      data,
      loading,
      categories,
      createSpp,
      levels: computed({
        get: () => {
          if (form.value.school_type === "Sekolah") {
            return categories.value.levels.filter(
              (x) => ["TK", "SD", "SMP"].indexOf(x.name) > -1
            );
          } else if (form.value.school_type === "Pesantren") {
            return categories.value.levels.filter(
              (x) => ["SMP", "SMA"].indexOf(x.name) > -1
            );
          }
          return categories.value.levels;
        },
      }),
      classes: computed({
        get: () => {
          if (form.value.level) {
            return categories.value.levels
              .filter((x) => x.name === form.value.level)
              .map((x) => x.description?.split(","))[0];
          }
          return collect(categories.value.levels)
            .sortBy("id")
            .map((x) => x.description?.split(","))
            .flatten(1)
            .filter((x) => x)
            .values()
            .toArray();
        },
        /* , */
      }),
      types: ["Sekolah", "Pesantren"],
      months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    };
  },
});
</script>

<style></style>
