<template>
  <div>
    <q-form ref="info" class="row q-col-gutter-sm">
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
                <li>Foto / scan / screenshoot bukti transfer anda</li>
                <li>
                  Simpan bukti transfer anda untuk diupload pada step berikutnya
                </li>
              </ol>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-form>
    <q-separator class="q-my-md" />
    <div style="width: 100%; display: flex" class="q-mt-sm">
      <q-btn color="warning" label="Kembali" flat @click="onBack" />
      <q-space />
      <q-btn
        color="primary"
        :label="step === 5 ? 'Submit' : 'Selanjutnya'"
        @click="onNext($refs.info.validate())"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { api } from "src/boot/axios";
import collect from "collect.js";

export default {
  props: {
    onBack: Function,
    onNext: Function,
    fee: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const data = ref([]);
    function getInfo() {
      api.get("bank_account").then((res) => (data.value = res.data?.data));
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
      formatCurrency,
    };
  },
};
</script>

<style>
</style>
