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
      row-key="id"
      flat
      dense
      bordered
      virtual-scroll
    >
      <template #top>
        <div flat class="row q-col-gutter-sm" style="width: 100%">
          <div class="col-12 col-md-5">
            <q-input
              v-model="filter.search" outlined
              debounce="500"
              placeholder="Pencarian . . ."
              rounded
              dense
            >
            <template #append>
              <q-icon name="search"></q-icon>
            </template>
            </q-input>
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import moment from "moment";
import { api } from "src/boot/axios";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const data = ref([]);
    const filter = ref({});
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
    function getData() {
      api.get("milestone").then((res) => {
        data.value = res.data.data;
      });
    }
    onMounted(() => getData());
    return {
      data,
      headers,
      filter,
      getData,
    };
  },
});
</script>

<style>
</style>
