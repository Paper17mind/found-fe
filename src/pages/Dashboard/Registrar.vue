<template>
  <div>
    <q-table
      :columns="headers"
      :rows="data"
      :loading="loading"
      class="sticky-table"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
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
              v-model="filter.search"
              debounce="500"
              @update:model-value="initialize"
              label="Search..."
              rounded
              filled
              dense
            />
          </div>
          <q-select
            class="col-2"
            rounded
            filled
            clearable
            :options="status"
            label="Filter Status"
            v-model="filter.status"
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
            :options="['SD', 'SMP', 'SMA', 'Pesantren']"
            label="Filter Jenjang"
            v-model="filter.level"
            @update:model-value="initialize"
            dense
          ></q-select>
          <!-- <q-btn
            elevation="0"
            color="primary"
            dark
            class="rounded-lg"
            @click="dialog = true"
          >
            New forms
          </q-btn> -->
        </div>
      </template>
      <template #body-cell-student_image="{ row }">
        <q-td align="center">
          <q-btn
            round
            flat
            dense
            target="_blank"
            :href="row.student_image || undefined"
            :icon="
              row.student_image ? 'download_for_offline' : 'file_download_off'
            "
          ></q-btn>
        </q-td>
      </template>
      <template #body-cell-transfer_image="{ row }">
        <q-td align="center">
          <q-btn
            flat
            round
            dense
            class="q-mx-auto"
            target="_blank"
            :href="row.transfer_image || undefined"
            :icon="
              row.transfer_image ? 'download_for_offline' : 'file_download_off'
            "
          ></q-btn>
        </q-td>
      </template>
      <template #body-cell-report_image="{ row }">
        <q-td align="center">
          <q-btn
            flat
            round
            dense
            target="_blank"
            :href="row.report_image || undefined"
            :icon="
              row.report_image ? 'download_for_offline' : 'file_download_off'
            "
          ></q-btn>
        </q-td>
      </template>
      <template #body-cell-actions="{ row }">
        <q-td class="text-right">
          <q-btn-group rounded flat>
            <q-btn
              color="primary"
              flat
              round
              icon="info"
              target="_blank"
              :to="`/dashboard/registrar/${row.id}`"
            />
            <q-btn
              color="red"
              flat
              round
              @click="deleteItem(row)"
              icon="delete"
            />
          </q-btn-group>
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import moment from "moment";
import { usePaginate, status } from "src/compose/utils";
export default defineComponent({
  setup() {
    const $q = useQuasar();
    const dialog = ref(false);
    const loading = ref(false);
    const valid = ref(true);
    const page = ref({});
    const headers = ref([
      {
        label: "Thn Ajaran",
        name: "periode",
        field: "periode",
        sortable: true,
        align: "left",
      },
      {
        label: "Nama Siswa",
        name: "name",
        field: "name",
        sortable: true,
        align: "left",
      },
      {
        label: "Kode",
        name: "code",
        field: "code",
        sortable: true,
        align: "left",
      },
      {
        label: "Sekolah/Pesantren",
        name: "sop",
        field: "sop",
        sortable: false,
        align: "left",
        format: (v, r) => (r.level === "Pesantren" ? "Pesantren" : "Sekolah"),
      },
      {
        label: "Jenjang",
        name: "level",
        field: "level",
        sortable: true,
        align: "left",
        format: (v, r) => (r.level === "Pesantren" ? "-" : v),
      },
      {
        label: "Tanggal",
        name: "created_at",
        field: "created_at",
        sortable: true,
        align: "left",
        format: (v) => moment(v).format("ll"),
      },
      {
        label: "Status",
        name: "status",
        field: "status",
        sortable: true,
        align: "left",
      },
      {
        label: "Foto Siswa",
        name: "student_image",
        field: "student_image",
        sortable: true,
        align: "center",
      },
      {
        label: "Foto Rapor",
        name: "report_image",
        field: "report_image",
        sortable: true,
        align: "center",
      },
      {
        label: "Bukti Transfer",
        name: "transfer_image",
        field: "transfer_image",
        sortable: true,
        align: "center",
      },
      {
        label: "SourceInfo",
        name: "source_info",
        field: "source_info",
        sortable: true,
        align: "left",
        format: (v, r) => v?.join(","),
      },
      { label: "Actions", name: "actions", field: "actions", align: "right" },
    ]);
    const rules = [(v) => !!v || "field is required"];
    const data = ref([]);
    const editedIndex = ref(-1);
    const editedItem = ref({});
    const filter = ref({});
    const periodes = ref([]);
    // methods
    function notif(title, color, e) {
      $q.notify({
        message: title,
        caption: e.response && e.response.data ? e.response.data.message : e,
        color: color,
        position: "top-right",
      });
    }
    function initialize() {
      loading.value = true;
      api
        .get("/forms", {
          params: filter.value,
        })
        .then((res) => {
          data.value = res.data.data;
          loading.value = false;
          page.value = {
            next: 2,
            last: res.data.last_page,
          };
        })
        .catch((e) => notif("Error :(", "red", e));
      if (periodes.value.length == 0) {
        api.get("periode").then((res) => (periodes.value = res.data));
      }
    }

    function editItem(item) {
      editedIndex.value = data.value.indexOf(item);
      editedItem.value = Object.assign({}, item);
      dialog.value = true;
    }

    function deleteItem(item) {
      const index = data.value.indexOf(item);
      $q.dialog({
        title: "Please Confirm",
        message: "Are you sure you want to delete this item ?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          loading.value = true;
          api
            .delete("/forms/" + item.id)
            .then((res) => {
              loading.value = false;
              data.value.splice(index, 1);
            })
            .catch((e) => notif("Error :(", "red", e));
        })
        .onCancel(() => {});
    }

    function close() {
      dialog.value = false;
      editedItem.value = Object.assign({}, {});
      editedIndex.value = -1;
      loading.value = false;
    }

    function save() {
      loading.value = true;
      if (editedIndex.value > -1) {
        const id = editedItem.value.id;
        api
          .put("/forms/" + id, editedItem.value)
          .then((res) => {
            Object.assign(data.value[editedIndex.value], res.data.data);
            close();
          })
          .catch((e) => notif("Error", "red", e));
      } else {
        api
          .post("/forms", editedItem.value)
          .then((res) => {
            data.value.push(res.data.data);
            close();
          })
          .catch((e) => notif("Error", "red", e));
      }
    }

    onMounted(() => initialize());
    // response
    return {
      dialog,
      loading,
      valid,
      headers,
      rules,
      data,
      editedIndex,
      editedItem,
      filter,
      periodes,
      status,
      //computed
      formTitle: computed({
        get: () => (editedIndex.value === -1 ? "Create forms" : "Edit forms"),
      }),
      //methods
      initialize,
      save,
      close,
      editItem,
      deleteItem,
      onScroll({ to, ref }) {
        // console.log(to, ref);
        usePaginate(to, ref, page, loading, data, "forms", filter.value);
      },
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
});
</script>
