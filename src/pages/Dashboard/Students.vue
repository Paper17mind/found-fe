
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
          <q-input v-model="search" label="Search..." rounded filled dense />
          <q-space></q-space>
          <q-btn
            elevation="0"
            color="primary"
            dark
            class="rounded-lg"
            @click="dialog = true"
          >
            New form_students
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
    <q-dialog v-model="dialog" min-width="50vw" position="bottom">
      <q-card flat>
        <q-card-section>
          <div class="text-h6">{{ formTitle }}</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input
                v-model="editedItem.periode"
                required
                :rules="rules"
                hide-bottom-space
                label="Periode"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.level"
                required
                :rules="rules"
                hide-bottom-space
                label="Level"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.for_class"
                required
                :rules="rules"
                hide-bottom-space
                label="ForClass"
                filled
                rounded
                dense
              />
            </div>
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
                v-model="editedItem.gender"
                required
                :rules="rules"
                hide-bottom-space
                label="Gender"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.city"
                required
                :rules="rules"
                hide-bottom-space
                label="City"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.date_of_birth"
                required
                :rules="rules"
                hide-bottom-space
                label="DateOfBirth"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.address"
                required
                :rules="rules"
                hide-bottom-space
                label="Address"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.from_school"
                required
                :rules="rules"
                hide-bottom-space
                label="FromSchool"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.nis"
                required
                :rules="rules"
                hide-bottom-space
                label="Nis"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.phone"
                required
                :rules="rules"
                hide-bottom-space
                label="Phone"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.email"
                required
                :rules="rules"
                hide-bottom-space
                label="Email"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.password"
                required
                :rules="rules"
                hide-bottom-space
                label="Password"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editedItem.form_id"
                required
                :rules="rules"
                hide-bottom-space
                label="FormId"
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
        label: "Periode",
        name: "periode",
        field: "periode",
        sortable: true,
        align: "left",
      },
      {
        label: "Level",
        name: "level",
        field: "level",
        sortable: true,
        align: "left",
      },
      {
        label: "ForClass",
        name: "for_class",
        field: "for_class",
        sortable: true,
        align: "left",
      },
      {
        label: "Name",
        name: "name",
        field: "name",
        sortable: true,
        align: "left",
      },
      {
        label: "Gender",
        name: "gender",
        field: "gender",
        sortable: true,
        align: "left",
      },
      {
        label: "City",
        name: "city",
        field: "city",
        sortable: true,
        align: "left",
      },
      {
        label: "DateOfBirth",
        name: "date_of_birth",
        field: "date_of_birth",
        sortable: true,
        align: "left",
      },
      {
        label: "Address",
        name: "address",
        field: "address",
        sortable: true,
        align: "left",
      },
      {
        label: "FromSchool",
        name: "from_school",
        field: "from_school",
        sortable: true,
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
        label: "Phone",
        name: "phone",
        field: "phone",
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
        label: "Password",
        name: "password",
        field: "password",
        sortable: true,
        align: "left",
      },
      {
        label: "FormId",
        name: "form_id",
        field: "form_id",
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
        .get("/form_students")
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
            .delete("/form_students/" + item.id)
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
          .put("/form_students/" + id, editedItem.value)
          .then((res) => {
            Object.assign(data.value[editedIndex.value], res.data.data);
            close();
          })
          .catch((e) => notif("Error", "red", e));
      } else {
        api
          .post("/form_students", editedItem.value)
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
        get: () =>
          editedIndex.value === -1
            ? "Create form_students"
            : "Edit form_students",
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
