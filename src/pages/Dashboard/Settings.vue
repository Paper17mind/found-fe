<template>
  <div class="row q-col-gutter-sm justify-center q-mt-md">
    <q-card class="col-12 col-md-5">
      <q-card-section>
        <q-form>
          <q-input
            v-for="x in forms"
            :key="x.id"
            :label="keys[x.type]"
            v-model="x.name"
          ></q-input>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn style="width: 100%" color="secondary" rounded @click="saveData">
          Simpan
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { api } from "src/boot/axios";
export default {
  setup() {
    const form = ref({});
    const forms = ref([]);
    const keys = {
      fee: "Biaya Pendaftaran",
      school_name: "Nama Sekolah",
    };
    function getData() {
      api
        .get("categories", { params: { types: ["fee", "school_name"] } })
        .then((res) => {
          forms.value = res.data.data;
        });
    }
    function saveData() {
      forms.value.forEach((c) => {
        api.put("categories/" + c.id, c).catch((e) => alert(e));
      });
    }
    onMounted(() => getData());
    return {
      form,
      forms,
      keys,
      saveData,
    };
  },
};
</script>

<style>
</style>
