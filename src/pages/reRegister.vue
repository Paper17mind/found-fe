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
        <q-form>
          <q-input label="NIS" dense></q-input>
        </q-form>
      </q-step>
      <q-step :name="2" title="Bayar Formulir" icon="payment">
        <payment-info
          :form="form.student"
          :fee="fee"
          :onBack="onBack"
          :onNext="nextStep"
        />
      </q-step>
      <q-step :name="3" title="Bukti Pembayaran">
        <q-file
          class="q-mb-sm"
          outlined
          dense
          label="Bukti Transfer *"
          :rules="rules"
          v-model="form.transfer_image"
          hide-bottom-space
        ></q-file>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation
          style="width: 100%; display: flex"
          class="q-mt-sm"
        >
          <q-btn
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Kembali"
            class="q-ml-sm"
          />
          <q-space />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import PaymentInfo from "src/components/Forms/PaymentInfo.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { PaymentInfo },
  setup() {
    const step = ref(1);
    const form = ref({});
    const fee = ref(0);
    return {
      step,
      form,
      fee,
      onBack: () => (step.value -= 1),
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
