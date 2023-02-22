
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
        <div class="row q-col-gutter-sm" style="width: 100%">
          <q-input
            class="col-8 col-md-5"
            v-model="search"
            label="Search..."
            rounded
            filled
            dense
          />
          <div class="col-4 col-md-7 flex justify-end">
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
        <q-td align="right">
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
          <q-form ref="form" class="row q-gutter-sm">
            <div class="col-12">
              <q-input
                v-model="editedItem.name"
                required
                :rules="rules"
                hide-bottom-space
                label="Name"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.bank"
                required
                :rules="rules"
                label="Bank"
                hide-bottom-space
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.no_rek"
                required
                :rules="rules"
                label="NoRek"
                hide-bottom-space
                filled
                rounded
                dense
              />
            </div>
          </q-form>
        </q-card-section>
        <q-separator />
        <q-card-section align="right">
          <q-btn-group>
            <q-btn color="orange" @click="close"> Cancel </q-btn>
            <q-btn :loading="loading" color="primary" @click="save"> Save </q-btn>
          </q-btn-group>
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
    const form = ref(null);
    const headers = ref([
      {
        label: "Name",
        name: "name",
        field: "name",
        sortable: true,
        align: "left",
      },
      {
        label: "Bank",
        name: "bank",
        field: "bank",
        sortable: true,
        align: "left",
      },
      {
        label: "NoRek",
        name: "no_rek",
        field: "no_rek",
        sortable: true,
        align: "left",
      },
      { label: "Actions", name: "actions", field: "actions", align: "right" },
    ]);
    const rules = [(v) => !!v || "Mohon diisi dengan benar"];
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
        .get("/bank_account")
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
            .delete("/bank_account/" + item.id)
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

    async function save() {
      const valid = await form.value.validate();
      if (!valid) return;
      loading.value = true;
      if (editedIndex.value > -1) {
        const id = editedItem.value.id;
        api
          .put("/bank_account/" + id, editedItem.value)
          .then((res) => {
            Object.assign(data.value[editedIndex.value], res.data.data);
            close();
          })
          .catch((e) => notif("Error", "red", e));
      } else {
        api
          .post("/bank_account", editedItem.value)
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
      form,
      editedIndex,
      editedItem,
      //computed
      formTitle: computed({
        get: () =>
          editedIndex.value === -1
            ? "Create bank_account"
            : "Edit bank_account",
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
