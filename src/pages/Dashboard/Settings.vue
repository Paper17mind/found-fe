<template>
  <div class="row q-col-gutter-sm justify-center q-mt-md">
    <q-card class="col-12 col-md-5">
      <q-card-section>
        <q-form class="row q-col-gutter-sm">
          <div
            v-for="x in forms.filter((x) => x.type?.search(/ppdb/gi) == -1)"
            :key="x.id"
            class="col-12"
          >
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
          <div class="col-12 col-md-6">
            <q-input
              class="q-mb-sm"
              v-for="x in forms.filter(
                (x) => x.type?.search(/_cicilan/gi) > -1
              )"
              :label="keys[x.type]"
              v-model="x.name"
              :hint="price(x.name)"
            ></q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              class="q-mb-sm"
              v-for="x in forms.filter(
                (x) => x.type?.search(/_total/gi) > -1
              )"
              :label="keys[x.type]"
              v-model="x.name"
              :hint="price(x.name)"
            ></q-input>
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
import { price } from 'src/compose/utils';
export default {
  setup() {
    const form = ref({});
    const forms = ref([]);
    const keys = {
      fee: "Biaya Pendaftaran",
      school_name: "Nama Sekolah",
      logo: "Logo",
      ppdb_tk_cicilan: "Biaya PPDB TK - Cicilan",
      ppdb_sd_cicilan: "Biaya PPDB SD - Cicilan",
      ppdb_smp_cicilan: "Biaya PPDB SMP - Cicilan",
      ppdb_sma_cicilan: "Biaya PPDB SMA - Cicilan",
      ppdb_tk_total: "Biaya PPDB TK - Total",
      ppdb_sd_total: "Biaya PPDB SD - Total",
      ppdb_smp_total: "Biaya PPDB SMP - Total",
      ppdb_sma_total: "Biaya PPDB SMA - Total",
    };
    function getData() {
      api
        .get("categories", {
          params: {
            types: [
              "school_name",
              "logo",
              "ppdb_tk_cicilan",
              "ppdb_sd_cicilan",
              "ppdb_smp_cicilan",
              "ppdb_sma_cicilan",
              "ppdb_tk_total",
              "ppdb_sd_total",
              "ppdb_smp_total",
              "ppdb_sma_total",
            ],
          },
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
      price,
      form,
      forms,
      keys,
      saveData,
    };
  },
};
</script>

<style></style>
