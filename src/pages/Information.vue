<template>
  <div>
    <q-table
      :columns="headers"
      :rows="data"
      :loading="loading"
      :filter="filter.search"
      class="sticky-table"
      :rows-per-page-options="[0]"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      @virtual-scroll="onScroll"
      row-key="id"
      flat
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
              @update:model-value="getData"
              dense
            />
          </div>
          <q-select
            class="col-4 col-md-3"
            rounded
            filled
            clearable
            :options="status"
            label="Filter Status"
            v-model="filter.status"
            @update:model-value="getData"
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
            @update:model-value="getData"
            dense
          ></q-select>
          <q-select
            class="col-2"
            rounded
            filled
            clearable
            :options="['SD', 'SMP', 'SMA', 'Pesantren']"
            label="Filter Jenjang"
            v-model="filter.level"
            @update:model-value="getData"
            dense
          ></q-select>
        </div>
      </template>
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>
import moment from "moment";
import { api } from "src/boot/axios";
import { defineComponent, onMounted, ref } from "vue";
import { usePaginate, status } from "src/compose/utils";
import collect from "collect.js";

export default defineComponent({
  setup() {
    const data = ref([]);
    const periodes = ref([]);
    const filter = ref({});
    const page = ref({});
    const loading = ref(false);
    const headers = [
      {
        label: "Periode",
        name: "periode",
        field: "periode",
        sortable: true,
        align: "left",
      },
      {
        label: "Nama Siswa",
        name: "siswa",
        field: "siswa",
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
        name: "class",
        field: "class",
        sortable: true,
        align: "left",
      },
      {
        label: "Status",
        name: "status",
        field: "status",
        sortable: true,
        align: "left",
      },
      {
        label: "Tgl Daftar",
        name: "created_at",
        field: "created_at",
        sortable: true,
        align: "left",
        format: (v, r) => moment(v).format("lll"),
      },
    ];
    async function getData() {
      if (periodes.value.length == 0) {
        const prd = await api.get("periode"); //.then((res) => (periodes.value = res.data));
        periodes.value = prd?.data;
        filter.value.periode = collect(periodes.value).last();
      }
      api.get("milestone", { params: filter.value }).then((res) => {
        data.value = res.data.data;
        loading.value = false;
        page.value = {
          next: 2,
          last: res.data.last_page,
        };
      });
    }
    onMounted(() => getData());
    return {
      data,
      headers,
      loading,
      filter,
      status,
      periodes,
      getData,
      onScroll({ to, ref }) {
        usePaginate(
          to,
          ref,
          page,
          loading,
          data,
          "milestone",
          filter.value
        );
      },
    };
  },
});
</script>

<style></style>
