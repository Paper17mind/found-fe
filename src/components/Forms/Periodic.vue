<template>
  <q-form ref="periodic">
    <div class="row q-col-gutter-md">
      <div class="col-12 text-h5">Sumber Info {{ school }}</div>
      <div class="col-12 col-md-3 text-caption">Tahu {{ school }} dari :</div>
      <div class="col-12 col-md-7">
        <q-checkbox
          class="q-ma-sm"
          :false-value="undefined"
          v-for="x in sources"
          :key="x"
          :val="x"
          v-model="form.source_info"
          :label="x"
          dense
        ></q-checkbox>
      </div>
      <!--  -->
      <div class="col-12" v-if="show">
        <div class="text-h5">Data Nilai Dan Absensi</div>
        <div class="text-caption">
          <strong>Note: </strong> Kosongkan jika data belum ada
        </div>
        <div v-if="fields.lesson_values">
          <table style="border-collapse: collapse; width: 100%" border="1">
            <thead class="text-bold">
              <tr style="text-align: center">
                <td rowspan="2">Mapel</td>
                <td colspan="4" v-for="x in classes" :key="x">Kelas {{ x }}</td>
              </tr>
              <tr style="text-align: center">
                <td colspan="2" v-for="x in semester" :key="x">
                  Semester {{ x }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="x in fields.lesson_values" :key="x.type">
                <td class="text-bold q-px-sm">{{ x.type }}</td>
                <template v-for="y in x.classes">
                  <template v-for="(z, i) in y">
                    <td>
                      <q-input outlined dense label="KKM" v-model="z.kkm" />
                    </td>
                    <td>
                      <q-input outlined dense label="Nilai" v-model="z.nilai" />
                    </td>
                  </template>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="fields.attendances" class="q-mt-md">
          <table style="border-collapse: collapse; width: 100%" border="1">
            <thead class="text-bold">
              <tr style="text-align: center">
                <td rowspan="2">Keterangan</td>
                <td colspan="2" v-for="x in classes" :key="x">Kelas {{ x }}</td>
              </tr>
              <tr style="text-align: center">
                <td v-for="x in semester" :key="x">Semester {{ x }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="x in fields.attendances" :key="x.type">
                <td class="text-bold q-px-sm">{{ x.type }}</td>
                <template v-for="y in x.classes">
                  <template v-for="(z, i) in y">
                    <td>
                      <q-input
                        dense
                        label="Hari"
                        outlined
                        v-model="y[i]"
                      ></q-input>
                    </td>
                  </template>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <pre> {{ fields }} </pre> -->
      </div>
      <div class="col-12 q-mt-md">
        <div class="text-h5">Apakah Anda Menginginkan Beasiswa ?</div>
      </div>
      <div class="col-12 col-md-2 text-caption">Program Beasiswa * :</div>
      <div class="col-12 col-md-4">
        <q-select
          v-model="form.beasiswa"
          :options="[
            { text: 'Ya', value: 1 },
            { text: 'Tidak', value: 0 },
          ]"
          option-label="text"
          option-value="value"
          emit-value
          map-options
          dense
          outlined
        ></q-select>
      </div>
      <template v-if="form.beasiswa">
        <div class="col-12 q-mt-md">
          <div class="text-h5">Prestasi (Akademik / Non Akademik)</div>
        </div>
        <template v-for="(x, i) in form.scholarship">
          <div class="col-12 col-md-5">
            <q-input
              v-model="x.name"
              :label="`Prestasi ${i + 1}`"
              dense
              outlined
            ></q-input>
          </div>
          <div class="col-10 col-md-5">
            <q-file
              v-model="x.file"
              :label="`Upload Prestasi ${i + 1}`"
              dense
              outlined
            />
          </div>
          <div class="col-2">
            <q-btn-group v-if="!form.id" flat rounded>
              <q-btn
                color="red"
                :disable="i == 0"
                @click="form.scholarship.splice(i, 1)"
                label="Hapus"
              >
                <q-tooltip>Klik untuk menghapus prestasi</q-tooltip>
              </q-btn>
              <q-btn
                color="green"
                @click="form.scholarship.push({})"
                label="Tambah"
              >
                <q-tooltip>Klik untuk menambahkan prestasi</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </template>
      </template>
    </div>
    <!--  -->
    <q-separator class="q-my-lg" />
    <div style="width: 100%; display: flex" class="q-mt-sm">
      <q-btn color="warning" label="Kembali" flat @click="onBack" />
      <q-space />
      <q-btn
        color="primary"
        :label="step === 5 ? 'Submit' : 'Selanjutnya'"
        @click="onNext($refs.periodic.validate())"
      />
    </div>
  </q-form>
</template>

<script>
import collect from "collect.js";
import { useCommon } from "src/stores/storage";
import { computed, defineComponent, onMounted, ref } from "vue";
import { usePeriode, getSemester } from "src/compose/utils";
export default defineComponent({
  props: {
    item: Object,
    onBack: Function,
    onNext: Function,
    school: {
      type: String,
      default: "Our School",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const common = useCommon();
    const semester = computed({
      get: () => {
        const dt = collect(common.$state.info.categories)
          .pluck("children")
          .flatten(1)
          .where("name", props.item.student.for_class)
          .pluck("semester")
          .first();
        return Number(dt)
      },
    });
    const show = computed({
      get: () => ["SMA", "SMP"].indexOf(props.item.student.level) > -1,
    });
    const form = computed({
      get: () => props.item,
      set: (v) => emit("change", v),
    });
    const fields = computed({
      get: () => form.value.periodic,
      set: (v) => (form.value.periodic = v),
    });
    const classes = getSemester(props.item.student.level);
    onMounted(() => {
      if (show.value && !form.value.periodic?.attendances) {
        form.value.periodic = usePeriode(semester.value);
      }
    });
    return {
      semester,
      show,
      fields,
      classes,
      sources: [
        "Website",
        "Keluarga",
        "Instagram",
        "Youtube",
        "Kerabat/Teman",
        "Internet",
        "Facebook",
        "BillBoard",
      ],
      selected: ref([]),
      form,
    };
  },
});
</script>

<style>
</style>
