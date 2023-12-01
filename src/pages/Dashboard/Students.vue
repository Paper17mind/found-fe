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
            :options="levels"
            label="Filter Jenjang"
            v-model="filter.level"
            @update:model-value="initialize"
            dense
          ></q-select>
          <!-- <div class="col-6 col-md-5"></div> -->
          <!--<div class="col-6 col-md-2 text-right">
             <q-btn
              elevation="0"
              color="primary"
              dark
              class="rounded-lg"
              @click="dialog = true"
            >
              New form_students
            </q-btn>
          </div>-->
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
              :to="`/dashboard/registrar/${row.form_id}/edit`"
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
              <q-select
                v-model="editedItem.level"
                :options="categories.filter((x) => x.type === 'jenjang')"
                option-label="name"
                option-value="name"
                emit-value
                :rules="rules"
                map-options
                hide-bottom-space
                label="Jenjang"
                filled
                rounded
                dense
              />
            </div>
            <div class="col-12" v-if="editedItem.level !== 'pesantren'">
              <q-select
                v-model="editedItem.for_class"
                :options="levels"
                option-label="name"
                option-value="name"
                :rules="rules"
                emit-value
                map-options
                hide-bottom-space
                label="Kelas"
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
                label="Nama"
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
                label="Jenis Kelamin"
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
                label="Kota Kelahiran"
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
                label="Tanggal Lahir"
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
                label="Alamat"
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
                label="Asal Sekolah"
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
                label="Npmor Telpon"
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
        label: "NIS",
        name: "nis",
        field: "nis",
        sortable: true,
        align: "left",
      },
      {
        label: "NISN",
        name: "nisn",
        field: "nisn",
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
        name: "type",
        field: "type",
        sortable: false,
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
        name: "for_class",
        field: "for_class",
        sortable: true,
        align: "left",
      },
      {
        label: "Jns Kelamin",
        name: "gender",
        field: "gender",
        sortable: true,
        align: "left",
      },
      {
        label: "Tgl Lahir",
        name: "date_of_birth",
        field: "date_of_birth",
        sortable: true,
        align: "left",
      },
      {
        label: "Kota",
        name: "city",
        field: "city",
        sortable: true,
        align: "left",
      },
      {
        label: "Alamat",
        name: "address",
        field: "address",
        sortable: true,
        align: "left",
      },
      {
        label: "Asal Sekolah",
        name: "from_school",
        field: "from_school",
        sortable: true,
        align: "left",
      },
      {
        label: "No Telp",
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
        label: "Kode",
        name: "code",
        field: "code",
        sortable: false,
        align: "left",
      },
      { label: "Actions", name: "actions", field: "actions", align: "right" },
    ]);
    const rules = [(v) => !!v || "field is required"];
    const data = ref([]);
    const categories = ref([]);
    const levels = ref([]);
    const editedIndex = ref(-1);
    const editedItem = ref({});
    const filter = ref({
      status: "Lulus Berkas",
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

    }
    function initialize() {
      loading.value = true;
      api
        .get("/form_students", { params: filter.value })
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
        api.get("info").then((res) => {
          levels.value = res.data?.categories?.map((x) => x.name);
          periodes.value = res.data?.periode;
        });
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
    onMounted(() => {
      initialize();
    });
    // response
    return {
      dialog,
      categories,
      levels,
      loading,
      valid,
      headers,
      rules,
      data,
      editedIndex,
      editedItem,
      filter,
      page,
      periodes,
      status,
      //computed
      formTitle: computed({
        get: () =>
          editedIndex.value === -1
            ? "Create form_students"
            : "Edit form_students",
      }),
      //methods
      initialize,
      save,
      close,
      editItem,
      deleteItem,
      onScroll({ to, ref }) {
        usePaginate(
          to,
          ref,
          page,
          loading,
          data,
          "form_students",
          filter.value
        );
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
