<template>
  <div class="row q-col-gutter-sm justify-center q-mt-md">
    <q-card class="col-12 col-md-5">
      <q-card-section>
        <q-form class="row q-col-gutter-sm">
          <div v-for="x in forms" :key="x.id" class="col-12">
            <q-file
              v-if="x.type === 'logo'"
              v-model="x.file"
              :label="keys[x.type]"
            >
              <template #before>
                <img :src="x.name" style="width: 50px" />
              </template>
            </q-file>
            <q-input v-else :label="keys[x.type]" v-model="x.name"></q-input>
          </div>
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
      logo: "Logo",
    };
    function getData() {
      api
        .get("categories", {
          params: { types: ["fee", "school_name", "logo"] },
        })
        .then((res) => {
          forms.value = res.data.data;
        });
    }
    function saveData() {
      forms.value.forEach((c) => {
        const fd = new FormData();
        Object.keys(c).forEach((e) => {
          fd.append(e, c[e]);
        });
        api.post("categories/" + c.id, fd).catch((e) => alert(e));
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

<style></style>
