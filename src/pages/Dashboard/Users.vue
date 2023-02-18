
<template>
  <div>
    <q-table
      :columns="headers"
      :rows="data"
      :loading="loading"
      :filter="search"
      :rows-per-page-options="[0]"
      class="sticky-table"
      row-key="id"
      flat
      dense
      bordered
      virtual-scroll
    >
      <template #top>
        <div style="width: 100%" flat class="row q-col-gutter-sm">
          <q-input v-model="search" label="Search..." rounded outlined dense class="col-12 col-md-4" />
          <div class="col-6 col-md-6"></div>
          <div class="col-6 col-md-2 text-right">
            <q-btn
              elevation="0"
              color="primary"
              dark
              class="rounded-lg"
              @click="dialog = true"
            >
              Tambah
            </q-btn>
          </div>
        </div>
      </template>
      <template #body-cell-actions="{ row }">
        <q-td class="text-right">
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
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
    <q-dialog v-model="dialog" min-width="50vw" position="bottom">
      <q-card flat>
        <q-card-section>
          <div class="text-h6">{{ formTitle }}</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input
                v-model="editedItem.name"
                hide-bottom-space
                required
                :rules="rules"
                label="Nama"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.email"
                hide-bottom-space
                required
                :rules="rules"
                label="Email"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.phone"
                hide-bottom-space
                label="No Telp"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-file
                v-model="editedItem.profile"
                hide-bottom-space
                label="Profile"
                filled
                rounded
                dense
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section align="right">
          <q-btn color="warning" flat @click="close"> Cancel </q-btn>
          <q-btn color="success" flat @click="save"> Save </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
} from "@vue/runtime-core";
export default defineComponent({
  setup() {
    const $q = useQuasar();
    const dialog = ref(false);
    const search = ref(null);
    const loading = ref(false);
    const valid = ref(true);
    const headers = ref([
      {
        label: "Nama",
        name: "name",
        field: "name",
        sortable: true,
        align: "left",
      },
      {
        label: "Email",
        name: "email",
        field: "email",
        sortable: true,
        align: "left",
      },
      {
        label: "No Hp",
        name: "phone",
        field: "phone",
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
        .get("/users")
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
            .delete("/users/" + item.id)
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
          .put("/users/" + id, editedItem.value)
          .then((res) => {
            Object.assign(data.value[editedIndex.value], res.data.data);
            close();
          })
          .catch((e) => notif("Error", "red", e));
      } else {
        api
          .post("/users", editedItem.value)
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
        get: () => (editedIndex.value === -1 ? "Tambah Baru" : "Edit data"),
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
