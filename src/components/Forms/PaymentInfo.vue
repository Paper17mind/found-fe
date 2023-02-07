<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12">
      <div class="text-h5">Detail Pembelian Formulir Pendaftaran</div>
    </div>
    <div class="col-12 col-md-6">
      <div v-for="(x, i) in data" :key="x.id" class="q-mt-md">
        <div style="font-size: 20; font-weight: bold">
          {{ i == 0 ? "Transfer Ke:" : "Atau" }}
        </div>
        <table style="border-collapse: collapse; width: 100%;" border="1">
          <tbody>
            <tr style="font-weight: bold; width: 50%">
              <td>Bank Penerima</td>
              <td>{{ x.bank }}</td>
            </tr>
            <tr>
              <td>Nama Penerima</td>
              <td>{{ x.name }}</td>
            </tr>
            <tr>
              <td>No Rekening</td>
              <td>
                {{ x.no_rek }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <q-card bordered>
        Total Nominal Yang Perlu dibayarkan <br>
      </q-card>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { api } from "src/boot/axios";

export default {
  setup() {
    const data = ref([]);
    function getInfo() {
      api.get("bank_account").then((res) => (data.value = res.data?.data));
    }
    onMounted(() => getInfo());
    return {
      data,
    };
  },
};
</script>

<style>
</style>
