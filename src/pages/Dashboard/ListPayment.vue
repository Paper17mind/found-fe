<template>
  <div>
    <q-table
      :columns="headers"
      :rows="data"
      :loading="loading"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      class="sticky-table"
      row-key="id"
      flat
      dense
      bordered
      virtual-scroll
    >
      <template #top>
        <div style="width: 100%" flat class="row q-col-gutter-sm">
          <div class="col-12 col-md-5">
            <q-input
              v-model="filter.search"
              label="Search..."
              rounded
              filled
              debounce="500"
              @update:model-value="initialize"
              dense
            />
          </div>
          <q-select
            class="col-4 col-md-3"
            rounded
            filled
            clearable
            :options="['Sekolah', 'Pesantren']"
            label="Filter type"
            v-model="filter.type"
            @update:model-value="initialize"
            dense
          ></q-select>
          <q-select
            class="col-2"
            rounded
            filled
            clearable
            :options="periodes"
            label="Filter Periode"
            v-model="filter.periode"
            @update:model-value="initialize"
            dense
          ></q-select>
          <q-select
            class="col-2"
            rounded
            filled
            clearable
            :options="['SD', 'SMP', 'SMA']"
            label="Filter Jenjang"
            v-model="filter.level"
            @update:model-value="initialize"
            dense
          ></q-select>
        </div>
      </template>
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template #body-cell-index="{ row }">
        <q-td>
          {{ data.indexOf(row) + 1 }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import { usePaginate, status } from "src/compose/utils";
import collect from "collect.js";
export default defineComponent({
  setup() {
    const $q = useQuasar();
    const dialog = ref(false);
    const loading = ref(false);
    const valid = ref(true);
    const headers = ref([
      {
        label: "No",
        name: "index",
        field: "index",
        sortable: false,
        align: "left",
      },
      {
        label: "Tagihan",
        name: "bill_type",
        field: "bill_type",
        sortable: true,
        align: "left",
      },
      {
        label: "Periode",
        name: "periode",
        field: "periode",
        sortable: false,
        align: "left",
      },
      {
        label: "Nis",
        name: "nis",
        field: "nis",
        sortable: true,
        align: "left",
      },
      {
        label: "Nama",
        name: "name",
        field: "name",
        sortable: true,
        align: "left",
      },
      {
        label: "Sekolah/Pesantren",
        name: "school_type",
        field: "school_type",
        sortable: true,
        align: "left",
      },
      {
        label: "Jenjang",
        name: "level",
        field: "level",
        sortable: true,
        align: "left",
      },
      {
        label: "Kelas",
        name: "class_name",
        field: "class_name",
        sortable: true,
        align: "left",
      },
      {
        label: "L/P",
        name: "gender",
        field: "gender",
        sortable: true,
        align: "left",
      },
      {
        label: "Tgl Bayar",
        name: "payment_date",
        field: "payment_date",
        sortable: true,
        align: "left",
        format: (v) => v?.substring(0, 10),
      },
      {
        label: "Status",
        name: "status",
        field: "status",
        sortable: true,
        align: "left",
      },
    ]);
    const data = ref([]);
    const categories = ref([]);
    const levels = ref([]);
    const filter = ref({
      // status: "Lulus Berkas",
    });
    const periodes = ref([]);
    const page = ref({});
    // methods
    function notif(title, color, e) {
      $q.notify({
        message: title,
        caption: e.response && e.response.data ? e.response.data.message : e,
        color: color,
        position: "top-right",
      });
    }
    function getCategories() {
      api.get("info").then((res) => {
        categories.value = res.data.categories;
        levels.value = collect(categories.value)
          .map((x) => x.children[0] ?? {})
          .values()
          .toArray();
      });
    }
    function initialize() {
      loading.value = true;
      api
        .get("/payment-history", { params: filter.value })
        .then((res) => {
          data.value = res.data.data;
          loading.value = false;
          page.value = {
            next: 2,
            last: res.data.last_page,
          };
        })
        .catch((e) => notif("Error :(", "red", e));
    }
    onMounted(() => {
      initialize();
    });
    // response
    return {
      dialog,
      categories,
      levels,
      loading,
      headers,
      data,
      filter,
      page,
      periodes,
      status,
      //computed
      initialize,
      close,
      onScroll({ to, ref }) {
        usePaginate(
          to,
          ref,
          page,
          loading,
          data,
          "payment-history",
          filter.value
        );
      },
    };
  },
});
</script>
