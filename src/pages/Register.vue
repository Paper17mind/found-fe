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
        <student
          :onNext="nextStep"
          :item="form.student"
          @change="form.student = $event"
        />
      </q-step>

      <q-step
        :name="2"
        title="Data Ortu/Wali"
        icon="family_restroom"
        :done="step > 2"
      >
        <parents
          :onBack="onBack"
          :onNext="nextStep"
          :item="form.form_parent"
          :school="info.name"
          :formBoarding="form.boarding_school_data"
          @changeBoard="form.boarding_school_data = $event"
          :isPesantren="form.student.level === 'Pesantren'"
          @change="form.form_parent = $event"
        />
      </q-step>

      <q-step
        v-if="form.student.level !== 'Pesantren'"
        :name="3"
        :done="step > 3"
        title="Data Periodik"
        icon="event_note"
      >
        <periodic
          :onBack="onBack"
          :onNext="nextStep"
          :item="form"
          @change="form = $event"
          :school="info.name"
        />
      </q-step>
      <q-step
        :name="form.student.level === 'Pesantren' ? 3 : 4"
        :done="form.student.level === 'Pesantren' ? step > 3 : step > 4"
        title="Bayar Formulir"
        icon="payment"
      >
        <payment-info :fee="info.fee" :onBack="onBack" :onNext="nextStep" />
      </q-step>
      <q-step
        :name="form.student.level === 'Pesantren' ? 4 : 5"
        title="Berkas & Persetujuan"
        icon="assignment"
      >
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
          <q-form class="col-12 col-md-6" ref="formFoto">
            <q-file
              class="q-mb-sm"
              outlined
              dense
              label="Foto siswa *"
              :rules="rules"
              v-model="form.student_image"
              hide-bottom-space
            ></q-file>
            <q-file
              class="q-mb-sm"
              outlined
              dense
              label="File Rapor *"
              :rules="rules"
              v-model="form.report_image"
              hide-bottom-space
            ></q-file>
            <q-file
              class="q-mb-sm"
              outlined
              dense
              label="Bukti Transfer *"
              :rules="rules"
              v-model="form.transfer_image"
              hide-bottom-space
            ></q-file>
            <q-checkbox
              label="Saya menyatakan semua data yang disertakan adalah benar."
              :rules="rules"
              hide-bottom-space
              v-model="form.agreement"
            ></q-checkbox>
            <q-btn
              color="primary"
              @click="submit"
              style="width: 100%"
              class="q-px-lg q-mt-md"
            >
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
            v-if="form.student.level === 'Pesantren' ? step == 4 : step == 5"
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
import { computed, onMounted, ref } from "vue";
import Student from "src/components/Forms/Student.vue";
import Parents from "src/components/Forms/Parents.vue";
import Periodic from "src/components/Forms/Periodic.vue";
import PaymentInfo from "src/components/Forms/PaymentInfo.vue";
import { useCommon } from "src/stores/storage";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default {
  components: { Student, Parents, Periodic, PaymentInfo },
  setup() {
    const common = useCommon();
    const router = useRouter();
    const q = useQuasar();
    const form = ref({
      boarding_school_data: {
        hope: "",
        background: "",
      },
      form_parent: {
        father_info: {},
        mother_info: {},
      },
      student: {
        boarding_school_data: {},
      },
      periodic: {},
      scholarship: [{}],
      source_info: [],
    });
    const refs = ref({
      student: {},
      parent: {},
      periodic: {},
      files: {},
    });
    const info = computed({
      get: () => common.$state.info,
      set: (v) => (common.$state.info = v),
    });
    const step = ref(1);
    const formFoto = ref(null);
    const loading = ref(false);
    function errNotif(e) {
      q.notify({
        message: e.response.data?.message,
        color: "red",
        position: "top",
      });
    }
    onMounted(() => common.getInfo());
    return {
      step,
      refs,
      form,
      info,
      formFoto,
      rules: [(v) => !!v || "Mohon diisi"],
      onBack: () => (step.value -= 1),
      async nextStep(val) {
        const v = await val;
        if (v) step.value += 1;
        else q.notify({ message: "Mohon lengkapi data", color: "red" });
        // step.value += 1;
      },

      async submit() {
        const val = await formFoto.value.validate();
        if (!val) return;
        loading.value = true;
        let fd = new FormData();
        Object.keys(form.value).forEach((e) => {
          if (["boarding_school_data", "source_info"].indexOf(e) > -1) {
            fd.append(e, JSON.stringify(form.value[e]));
          } else if (e === "scholarship") {
            form.value.scholarship.forEach((sc, i) => {
              if (sc.name) {
                fd.append(`scholarship[${i}][name]`, sc.name);
                fd.append(`scholarship[${i}][file]`, sc.file);
              }
            });
          } else fd.append(e, form.value[e]);
        });
        fd.append("periode", form.value.student.periode);
        fd.append("amount", info.value.fee);
        const { data } = await api.post(`forms`, fd).catch((e) => errNotif(e));
        form.value.id = data.data?.id;
        form.value.student.form_id = data.data?.id;
        form.value.form_parent.form_id = data.data?.id;
        form.value.periodic.form_id = data.data?.id;
        await api
          .post("form_students", form.value.student)
          .catch((e) => errNotif(e));
        await api
          .post("form_parents", form.value.form_parent)
          .catch((e) => errNotif(e));
        if (form.value.periodic.attendances) {
          await api.post("form_periodics", form.value.periodic);
        }
        // api.post("form_periodics", form.value.periodic);
        loading.value = false;
        q.notify({ message: "Registrasi berhasil dikirim" });
        router.push("/");
      },
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
