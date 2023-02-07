<template>
  <div class="q-pa-md" :class="{ 'q-px-xl container': $q.screen.gt.sm }">
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
        title="Data Siswa"
        icon="account_circle"
        :done="step > 1"
      >
        <student :item="form.student" @change="form.student = $event" />
      </q-step>

      <q-step
        :name="2"
        title="Data Ortu/Wali"
        icon="family_restroom"
        :done="step > 2"
      >
        <parents :item="form.form_parent" @change="form.form_parent = $event" />
      </q-step>

      <q-step
        :name="3"
        :done="step > 3"
        title="Data Periodik"
        icon="event_note"
      >
        <periodic :item="form" @change="form = $event" />
      </q-step>
      <q-step :name="4" :done="step > 4" title="Bayar Formulir" icon="payment">
        <payment-info />
      </q-step>
      <q-step :name="5" title="Berkas & Persetujuan" icon="assignment">
        Try out different ad text to see what brings in the most customers, and
        learn how to enhance your ads using features like ad extensions. If you
        run into any problems with your ads, find out how to tell if they're
        running and how to resolve approval issues.
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 3 ? 'Finish' : 'Continue'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { ref } from "vue";
import Student from "src/components/Forms/Student.vue";
import Parents from "src/components/Forms/Parents.vue";
import Periodic from "src/components/Forms/Periodic.vue";
import PaymentInfo from "src/components/Forms/PaymentInfo.vue";

export default {
  components: { Student, Parents, Periodic, PaymentInfo },
  setup() {
    const form = ref({
      form_parent: {},
      student: {},
      periodic: {},
      scholarship: [],
      source_info: [],
    });
    return {
      step: ref(1),
      form,
    };
  },
};
</script>

<style scoped>
.container {
  padding-left: 10%;
  padding-right: 10%;
}
</style>
