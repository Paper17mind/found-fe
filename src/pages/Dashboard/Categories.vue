<template>
  <div class="row q-mt-sm justify-center">
    <div class="col-12 col-md-7">
      <q-table
        :columns="headers"
        :rows="data"
        :loading="loading"
        :filter="search"
        :rows-per-page-options="[0]"
        class="sticky-table"
        row-key="id"
        bordered
        virtual-scroll
      >
        <template #top>
          <div
            style="width: 100%"
            flat
            class="row q-col-gutter-sm items-center"
          >
            <div class="col-6 col-md-2 text-bold">
              {{ keys[$route.params.type] }}
            </div>
            <q-input
              v-model="search"
              label="Search..."
              rounded
              outlined
              dense
              class="col-6 col-md-4"
            />
            <div class="col-6 col-md-4"></div>
            <div class="col-6 col-md-2 text-right">
              <q-btn v-if="$route.params.type !== 'jenjang'"
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
        <template #body-cell-no="{ row }">
          <q-td>
            {{ data.indexOf(row) + 1 }}
          </q-td>
        </template>
        <template #body-cell-action="{ row }">
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
                :disable="disabled.indexOf(row.name) > -1"
              />
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="dialog" position="right">
      <q-card style="min-width: 40vw">
        <q-card-section class="q-pa-sm">
          {{ editedIndex > -1 ? "Edit Item" : "Tambah" }}
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <q-input
            class="q-mb-sm"
            @keyup.enter="saveData"
            v-model="editedItem.name"
            dense
            label="Nama"
          ></q-input>
          <q-input
            v-model="editedItem.description"
            v-if="$route.params.type === 'jenjang'"
            dense
            label="Kelas"
          ></q-input>
        </q-card-section>
        <q-card-section class="q-pa-sm flex">
          <q-space />
          <q-btn color="red" @click="close">Cancel</q-btn>
          <q-btn
            :loading="loading"
            color="primary"
            class="q-ml-sm"
            @click="saveData"
          >
            Save
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import {
  computed,
  defineComponent,
  onActivated,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const data = ref([]);
    const loading = ref(false);
    const search = ref("");
    const dialog = ref(false);
    const editedItem = ref({});
    const editedIndex = ref(-1);
    const route = useRoute();
    watch(
      () => route.params.type,
      (v) => !v || getData()
    );
    function close() {
      editedItem.value = {};
      editedIndex.value = -1;
      dialog.value = false;
      loading.value = false;
    }
    function editItem(item) {
      editedIndex.value = data.value.indexOf(item);
      Object.assign(editedItem.value, item);
      dialog.value = true;
    }
    function getData() {
      if (loading.value) return;
      loading.value = true;
      api
        .get("categories", {
          params: { type: route.params.type },
        })
        .then((res) => {
          data.value = res.data.data.filter((x) => x.name !== "Pesantren");
          loading.value = false;
        });
    }
    function saveData() {
      loading.value = true;
      const fd = new FormData();
      Object.keys(editedItem.value).forEach((e) => {
        fd.append(e, editedItem.value[e]);
      });
      fd.append("type", route.params.type);
      const request =
        editedIndex.value > -1
          ? api.post("categories/" + editedItem.value.id, fd)
          : api.post("categories", fd);
      request
        .then((res) => {
          if (editedIndex.value > -1) {
            Object.assign(data.value[editedIndex.value], res.data?.data);
          } else {
            data.value.push(res.data?.data);
          }
          close();
        })
        .catch((e) => {
          alert(e);
          loading.value = false;
        });
    }
    function deleteItem(item, index) {
      const c = confirm("Hapus Item ?");
      if (!c) return;
      api.delete("categories/" + item.id).then((res) => {
        data.value.splice(index, 1);
      });
    }
    onMounted(() => getData());
    return {
      headers: computed({
        get: () => {
          const h = [
            {
              label: "No",
              name: "no",
              field: "no",
              sortable: true,
              align: "left",
            },
            {
              label: route.params.type,
              name: "name",
              field: "name",
              sortable: true,
              align: "left",
            },
          ];
          if (route.params.type === "jenjang") {
            return [
              ...h,
              {
                label: "Kelas",
                name: "description",
                field: "description",
                sortable: true,
                align: "left",
              },
            ];
          }
          return [
            ...h,
            {
              label: "Action",
              name: "action",
              field: "action",
              sortable: true,
              align: "right",
            },
          ];
        },
      }),
      getData,
      saveData,
      editItem,
      deleteItem,
      editedItem,
      editedIndex,
      data,
      loading,
      dialog,
      search,
      close,
      disabled: ["Pesantren", "SMA", "SMP", "SD"],
      keys: {
        bill: "List Pembayaran",
        jenjang: "List Kelas",
      },
    };
  },
});
</script>

<style></style>
