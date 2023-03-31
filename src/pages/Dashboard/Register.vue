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
        title="Berkas & Persetujuan"
        icon="assignment"
      >
        <q-form class="row q-col-gutter-sm" ref="formFoto">
          <div class="col-12 col-md-4">
            <q-card>
              <q-card-section>
                <q-img :src="form.student_image"></q-img>
              </q-card-section>
              <q-card-section class="q-py-xs">
                <q-file
                  class="q-mb-sm col-12"
                  outlined
                  dense
                  label="Foto siswa *"
                  :rules="rules"
                  v-model="form.student_image"
                  hide-bottom-space
                >
                </q-file>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card>
              <q-card-section>
                <q-img :src="form.report_image"></q-img>
              </q-card-section>
              <q-card-section class="q-py-xs">
                <q-file
                  class="q-mb-sm"
                  outlined
                  dense
                  label="File Rapor *"
                  :rules="rules"
                  v-model="form.report_image"
                  hide-bottom-space
                ></q-file>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card>
              <q-card-section>
                <q-img :src="form.transfer_image"></q-img>
              </q-card-section>
              <q-card-section class="q-py-xs">
                <q-file
                  class="q-mb-sm"
                  outlined
                  dense
                  label="Bukti Transfer *"
                  :rules="rules"
                  v-model="form.transfer_image"
                  hide-bottom-space
                ></q-file>
              </q-card-section>
            </q-card>
          </div>
        </q-form>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation
          style="width: 100%; display: flex"
          class="q-mt-sm"
          v-if="form.student.level === 'Pesantren' ? step == 3 : step == 4"
        >
          <q-btn
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Kembali"
            class="q-ml-sm"
          />
          <q-space />
          <q-btn color="primary" @click="submit" class="q-px-lg q-mt-md">
            Update Data
          </q-btn>
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
import { useRoute, useRouter } from "vue-router";
export default {
  components: { Student, Parents, Periodic, PaymentInfo },
  setup() {
    const common = useCommon();
    const router = useRouter();
    const route = useRoute();
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
      agreement: true,
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
    function getDetail() {
      loading.value = true;
      api.get("forms/" + route.params.id).then((res) => {
        Object.assign(form.value, res.data.data);
        form.value.periodic = form.value.periodic || {};
        form.value.student.periode = form.value.periode;
        form.value.beasiswa = form.value.scholarship?.length > 0 ? 1 : 0;
        loading.value = false;
      });
    }
    onMounted(() => {
      common.getInfo();
      if (route.params.id) getDetail();
    });
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
      },

      async submit() {
        // const val = await formFoto.value.validate();
        // if (!val) return;
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
        q.notify({ message: "Data berhasil diupdate" });
        router.go(-1);
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
