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
        <periodic :item="form" @change="form = $event" :school="info.name" />
      </q-step>
      <q-step :name="4" :done="step > 4" title="Bayar Formulir" icon="payment">
        <payment-info :fee="info.fee" />
      </q-step>
      <q-step :name="5" title="Berkas & Persetujuan" icon="assignment">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-6">
            <h4 class="text-danger">Ketentuan Foto dan Berkas Siswa</h4>
            <li>
              Foto / dokumen yang disertakan harus jelas dan dapat terbaca
              dengan baik
            </li>
            <li class="text-dark">
              Untuk jenjang SD, foto siswa yang disertakan
              <strong
                >merupakan foto formal berukuran 3x4 berwarna dengan background
                polos
              </strong>
            </li>
            <li class="text-dark">
              Untuk jenjang SMP dan SMA, foto siswa yang disertakan
              <strong
                >merupakan foto menggunakan seragam sekolah berukuran 3x4
                berwarna
              </strong>
            </li>
            <li class="text-dark">
              Ukuran file <strong>maksimal 10 MB </strong>
            </li>
          </div>
          <q-form class="col-12 col-md-6" ref="form-foto">
            <q-file
              class="q-mb-sm"
              outlined
              dense
              label="Foto siswa *"
            ></q-file>
            <q-file
              class="q-mb-sm"
              outlined
              dense
              label="File Rapor *"
            ></q-file>
            <q-file
              class="q-mb-sm"
              outlined
              dense
              label="Bukti Transfer *"
            ></q-file>
            <q-checkbox
              label="Saya menyatakan semua data yang disertakan adalah benar."
            ></q-checkbox>
            <q-btn color="primary" style="width: 100%" class="q-px-lg q-mt-md">
              Daftar
            </q-btn>
          </q-form>
        </div>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation
          style="width: 100%; display: flex"
          class="q-mt-sm"
        >
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
          <q-space />
          <q-btn
            v-if="step < 5"
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 5 ? 'Finish' : 'Continue'"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Student from "src/components/Forms/Student.vue";
import Parents from "src/components/Forms/Parents.vue";
import Periodic from "src/components/Forms/Periodic.vue";
import PaymentInfo from "src/components/Forms/PaymentInfo.vue";
import { useCommon } from "src/stores/storage";
export default {
  components: { Student, Parents, Periodic, PaymentInfo },
  setup() {
    const common = useCommon();
    const form = ref({
      form_parent: {},
      student: {},
      periodic: {},
      scholarship: [],
      source_info: [],
    });
    const info = computed({
      get: () => common.$state.info,
      set: (v) => (common.$state.info = v),
    });
    onMounted(() => common.getInfo());
    return {
      step: ref(1),
      form,
      info,
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
