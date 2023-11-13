<template>
  <div>
    <q-stepper
      v-model="step"
      ref="stepper"
      alternative-labels
      color="primary"
      flat
      animated
    >
      <q-step
        :name="1"
        title="Verifikasi NIS"
        icon="account_circle"
        :done="step > 1"
      >
        <div class="row justify-center q-px-sm">
          <div class="col-12 col-md-7 text-center q-mb-md">
            Silahkan Masukan nomor NISN anda untuk melanjutkan Daftar Ulang
          </div>
          <q-form class="col-12 col-md-7" ref="field">
            <q-input
              :rules="rules"
              label="NISN"
              v-model="form.nis"
              dense
              hide-bottom-space
              outlined
            ></q-input>
            <q-select
              :rules="rules"
              label="Pilih Cicilan"
              dense
              outlined
              class="q-mt-sm"
              :options="types"
              v-model="form.payment_type"
            ></q-select>
          </q-form>
          <div class="col-12 col-md-7 q-mt-md text-center">
            <q-btn :loading="loading" @click="checkFee" color="primary">
              Daftar Ulang
            </q-btn>
          </div>
        </div>
      </q-step>
      <q-step :name="2" title="Bayar Formulir" icon="payment">
        <payment-info
          :form="form"
          :fee="fee"
          :onBack="onBack"
          :onNext="nextStep"
        />
      </q-step>
      <q-step :name="3" title="Bukti Pembayaran">
        <div class="row justify-center q-px-sm">
          <div class="col-12 col-md-7 text-center q-mb-md">
            Silahkan Masukkan Bukti Transfer
          </div>
          <q-form class="col-12 col-md-7" ref="field">
            <q-file
              class="q-mb-sm"
              outlined
              dense
              label="Bukti Transfer *"
              :rules="rules"
              v-model="form.transfer_image"
              hide-bottom-space
            ></q-file>
          </q-form>
          <div class="col-12 col-md-7 q-mt-md text-center">
            <q-btn :loading="loading" @click="saveTf" color="primary">
              Simpan
            </q-btn>
          </div>
        </div>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation
          v-if="step > 2"
          class="q-mt-sm q-px-xl text-center"
        >
          <q-btn
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Kembali"
          />
          <q-space />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import PaymentInfo from "src/components/Forms/PaymentInfo.vue";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: { PaymentInfo },
  setup() {
    const q = useQuasar();
    const step = ref(1);
    const form = ref({});
    const route = useRoute();
    const router = useRouter();
    const field = ref(null);
    const fee = ref(0);
    const rules = [(v) => !!v || "Data tidak boleh kosong"];
    const loading = ref(false);
    return {
      step,
      form,
      fee,
      loading,
      field,
      rules,
      types: ["Lunas", "Cicilan 3x", "Cicilan 6x"],
      onBack: () => (step.value -= 1),
      async checkFee() {
        const v = await field.value.validate();
        if (!v) return;
        form.value.form_id = route.params.id;
        loading.value = true;
        api
          .post("ppdb-fee", form.value)
          .then((res) => {
            fee.value = res.data.fee;
            step.value = 2;
            Object.assign(form.value, res.data?.data);
            loading.value = false;
          })
          .catch((e) => {
            alert(e.response?.data?.message);
            loading.value = false;
          });
      },
      async saveTf() {
        const v = await field.value.validate();
        if (!v) return;
        loading.value = true;
        const fd = new FormData();
        fd.append('id', form.value.form_id)
        fd.append("amount", fee.value);
        fd.append("transfer_image", form.value.transfer_image);
        api
          .post("re-register", fd)
          .then((res) => {
            loading.value = false;
            router.go(-1)
            q.notify({
              message: "Terimakasih sudah melakukan pendaftaran ulang",
            });
          })
          .catch((e) => {
            loading.value = false;
          });
      },
      async nextStep(val) {
        if (process.env.DEBUGGING) {
          step.value += 1;
        } else {
          const v = await val;
          if (v) step.value += 1;
          else q.notify({ message: "Mohon lengkapi data", color: "red" });
        }
      },
    };
  },
});
</script>

<style></style>
