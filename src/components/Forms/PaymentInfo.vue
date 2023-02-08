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
        <table style="border-collapse: collapse; width: 100%" border="1">
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
      <q-card bordered flat>
        <q-card-section class="q-px-sm">
          <div>Total Nominal Yang Perlu dibayarkan</div>
          <div class="text-h5 q-my-md">{{ formatCurrency(fee) }}</div>
          <div>
            Petunjuk pemelian formulir :
            <ol>
              <li>
                Silahkan melakukan pembelia formulir pendaftaran dengan cara
                melakukan transfer senilai
                <strong> {{ formatCurrency(fee) }} </strong>, ke salah satu
                nomor rekening disamping
              </li>
              <li>
                Foto / scan / screenshoot bukti transfer anda
              </li>
              <li>
                Simpan bukti transfer anda untuk diupload pada step berikutnya
              </li>
            </ol>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { api } from "src/boot/axios";
import collect from "collect.js";

export default {
  setup() {
    const data = ref([]);
    const fee = ref(0);
    function getInfo() {
      api.get("bank_account").then((res) => (data.value = res.data?.data));
      api.get("categories?type=fee").then((res) => {
        const amount = collect(res.data.data).pluck("name").first();
        fee.value = Number(amount);
      });
    }
    function formatCurrency(number) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });
      return formatter.format(number);
    }

    onMounted(() => getInfo());
    return {
      data,
      fee,
      formatCurrency,
    };
  },
};
</script>

<style>
</style>
