
<template>
  <div>
    <q-table
      :columns="headers"
      :rows="data"
      :loading="loading"
      :filter="search"
      class="sticky-table"
      row-key="id"
      flat
      dense
      bordered
      virtual-scroll
    >
      <template #top>
        <q-bar flat>
          <div>Forms</div>
          <q-separtor class="q-mx-md" vertical></q-separtor>
          <q-input v-model="search" label="Search..." rounded filled dense />
          <q-space></q-space>
          <q-btn
            elevation="0"
            color="primary"
            dark
            class="rounded-lg"
            @click="dialog = true"
          >
            New forms
          </q-btn>
        </q-bar>
      </template>
      <template #body-cell-actions="{ row }">
        <q-btn-group rounded flat>
          <q-btn
            color="primary"
            flat
            round
            icon="edit"
            @click="editItem(row)"
          />
          <q-btn
            color="red"
            flat
            round
            @click="deleteItem(row)"
            icon="delete"
          />
        </q-btn-group>
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
export default defineComponent({
  setup() {
    const $q = useQuasar();
    const dialog = ref(false);
    const search = ref(null);
    const loading = ref(false);
    const valid = ref(true);
    const headers = ref([
      {
        label: "Status",
        name: "status",
        field: "status",
        sortable: true,
        align: "left",
      },
      {
        label: "Approval",
        name: "approval",
        field: "approval",
        sortable: true,
        align: "left",
      },
      {
        label: "StudentImage",
        name: "student_image",
        field: "student_image",
        sortable: true,
        align: "left",
      },
      {
        label: "ReportImage",
        name: "report_image",
        field: "report_image",
        sortable: true,
        align: "left",
      },
      {
        label: "TransferImage",
        name: "transfer_image",
        field: "transfer_image",
        sortable: true,
        align: "left",
      },
      {
        label: "SourceInfo",
        name: "source_info",
        field: "source_info",
        sortable: true,
        align: "left",
      },
      { label: "Actions", name: "actions", field: "actions", align: "right" },
    ]);
    const rules = [(v) => !!v || "field is required"];
    const data = ref([]);
    const editedIndex = ref(-1);
    const editedItem = ref({});
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
        .get("/forms")
        .then((res) => {
          data.value = res.data.data;
          loading.value = false;
        })
        .catch((e) => notif("Error :(", "red", e));
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
      search,
      loading,
      valid,
      headers,
      rules,
      data,
      editedIndex,
      editedItem,
      //computed
      formTitle: computed({
        get: () => (editedIndex.value === -1 ? "Create forms" : "Edit forms"),
      }),
      //methods
      save,
      close,
      editItem,
      deleteItem,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
});
</script>
