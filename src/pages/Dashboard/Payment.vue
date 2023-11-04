<template>
  <div class="row q-col-gutter-sm items-center q-mt-md justify-center">
    <div class="col-12 col-md-10">
      <div class="row q-col-gutter-sm items-center">
        <div class="col-12 col-md-3 text-bold">Nomor Induk Siswa</div>
        <q-input
          dense
          filled
          label="Masukkan Nomor Induk Siswa"
          class="col-8 col-md-7"
          v-model="nis"
          @keyup.enter="search"
        >
        </q-input>
        <div class="col-4 col-md-2">
          <q-btn :loading="loading" @click="search" color="primary" square>
            OK
          </q-btn>
        </div>
        <div class="col-12" v-if="data.id">
          <q-separator class="q-my-sm" />
          <table class="tbl-student" border="1">
            <tr>
              <td class="text-bold" style="width: 200px">Nomor Induk Siswa</td>
              <td colspan="3">{{ data.nis }}</td>
            </tr>
            <tr>
              <td class="text-bold">Nama Siswa</td>
              <td>{{ data.name }}</td>
              <td class="text-bold">Jenis Kelamin</td>
              <td>{{ data.gender }}</td>
            </tr>
            <tr>
              <td class="text-bold">Sekolah/Pesantren</td>
              <td colspan="3">{{ data.type }}</td>
            </tr>
            <tr>
              <td class="text-bold">Kelas</td>
              <td colspan="3">{{ data.for_class }}</td>
            </tr>
            <tr>
              <td class="text-bold">PPDB</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td class="text-bold">Deskripsi</td>
              <td colspan="3">Tagihan Pembayaran</td>
            </tr>
          </table>
        </div>
        <template v-if="data.id">
          <div class="col-12 col-md-2 text-bold">Pembayaran</div>
          <div class="col-6 col-md-3">
            <q-select v-model="form.periode" label="Periode" dense outlined />
          </div>
          <div class="col-6 col-md-3">
            <q-select
              v-model="form.category_id"
              label="Jenis Pembayaran"
              dense
              outlined
            />
          </div>
          <div class="col-6 col-md-3">
            <q-select v-model="form.bill_type" label="Tagihan" dense outlined />
          </div>
          <!-- form tagihan -->
          <div class="col-12 col-md-2 text-bold">Jumlah Tagihan</div>
          <div class="col-9 col-md-8">
            <q-input
              v-model="form.amount"
              label="Masukkan Nominal Tagihan"
              dense
              outlined
              type="number"
            />
          </div>
          <div class="col-3 col-md-2">
            <q-btn style="width: 100%" color="primary">Buat</q-btn>
          </div>
        </template>
        <div class="col-12">
          <table class="tbl-student" border="1">
            <thead class="bg-primary text-bold text-white text-center">
              <tr>
                <td>No</td>
                <td>Jenis Pembayaran</td>
                <td>Tagihan</td>
                <td>Periode</td>
                <td>Tgl Bayar</td>
                <td>Jumlah</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(x, i) in data.payment_histories" :key="i">
                <td>{{ i + 1 }}</td>
                <td></td>
                <td>{{ x.bill_type }}</td>
                <td>{{ x.periode }}</td>
                <td>{{ x.updated_at?.substring(0, 10) }}</td>
                <td>{{ price(x.amount) }}</td>
                <td>{{ x.status }}</td>
                <td>
                  <q-btn icon="delete" flat color="red"></q-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-12">
          <!-- <pre>{{ data }}</pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { price } from "src/compose/utils";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const data = ref({
      payment_histories: [],
    });
    const nis = ref("");
    const form = ref({});
    const loading = ref(false);

    function search() {
      loading.value = true;
      api
        .get("/payment-history/" + nis.value)
        .then((res) => {
          data.value = res.data.data;
          data.value.payment_histories = res.data?.histories;
          loading.value = false;
        })
        .catch((e) => {
          loading.value = false;
          alert(e.response?.data?.message);
        });
    }
    return {
      data,
      price,
      form,
      nis,
      search,
      loading,
    };
  },
});
</script>

<style scoped>
.tbl-student {
  width: 100%;
  border-collapse: collapse;
}
.tbl-student tr td {
  padding: 5px;
}
</style>
