<template>
  <div>
    <q-form ref="info" class="row q-col-gutter-sm">
      <div class="col-12">
        <div class="text-h5">Detail Pembayaran Pendaftaran Ulang</div>
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
        <q-separator spaced="md" />
        <q-item v-if="!vaInfo.va" dense class="q-px-none q-mt-md">
          <q-item-section class="text-bold"> Atau </q-item-section>
          <q-item-section side>
            <q-btn @click="createVa" color="primary" outline no-caps>
              Bayar dengan Virtual Akun
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item v-else dense class="q-px-none">
          <q-item-section>
            <q-item-label caption>Id Transaksi</q-item-label>
            <q-item-label class="text-bold">
              {{ vaInfo.transactionId }}
            </q-item-label>
            <q-item-label caption>Nomor Virtual Account</q-item-label>
            <q-item-label class="text-bold">
              {{ vaInfo.va }}
            </q-item-label>
            <q-item-label caption>Metode pembayaran</q-item-label>
            <q-item-label class="text-bold">
              {{ vaInfo.paymentMethod }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label caption>Merchant</q-item-label>
            <q-item-label class="text-bold">
              {{ vaInfo.merchant?.name }}
              <!-- ({{ vaInfo.merchant?.code }}) -->
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-12 col-md-6">
        <q-card bordered flat>
          <q-card-section class="q-px-sm">
            <div>Total Nominal Yang Perlu dibayarkan</div>
            <div class="text-h5 q-my-md">{{ formatCurrency(fee) }}</div>
            <div>
              Petunjuk pembayaran daftar ulang:
              <ol>
                <li>
                  Silahkan melakukan pembayaran pendaftaran dengan cara
                  melakukan transfer senilai
                  <strong> {{ formatCurrency(fee) }} </strong>, ke salah satu
                  nomor rekening disamping / Melalui Virtual Account
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
import { computed, onMounted, ref } from "@vue/runtime-core";
import { api } from "src/boot/axios";
import collect from "collect.js";
import { useCommon } from "src/stores/storage";

export default {
  props: {
    onBack: Function,
    onNext: Function,
    form: Object,
    fee: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const common = useCommon();
    const data = ref([]);
    const vaInfo = computed({
      get: () => common.$state.va,
      set: (v) => (common.$state.va = v),
    });
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
    function createVa() {
      /* api
        .post("create-va", {
          name: props.form.name,
          phone: props.form.phone,
          email: props.form.email,
          level: props.form.level,
          address: props.form.address,
        })
        .then((res) => {
          vaInfo.value = res.data?.data || {};
        }); */
    }
    onMounted(() => getInfo());
    return {
      data,
      vaInfo,
      createVa,
      formatCurrency,
    };
  },
};
</script>

<style></style>
