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
          v-model="selected"
          :label="x"
          dense
        ></q-checkbox>
      </div>
      <!--  -->
      <div class="col-12" v-if="['SD', 'SMP'].indexOf(item.student.level) > -1">
        <div class="text-h5">Data Nilai Dan Absensi</div>
        <div class="text-caption">
          <strong>Note: </strong> Kosongkan jika data belum ada
        </div>
        <div v-if="fields.lessons">
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
              <tr v-for="x in fields.lessons" :key="x.type">
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
                <td v-for="x in semester" :key="x">
                  Semester {{ x }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="x in fields.attendances" :key="x.type">
                <td class="text-bold q-px-sm">{{ x.type }}</td>
                <template v-for="y in x.classes">
                  <template v-for="(z, i) in y">
                    <td>
                      <q-input dense label="Hari" outlined v-model="y[i]"></q-input>
                    </td>
                  </template>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <pre> {{ fields }} </pre> -->
      </div>
      <div class="col-12">
        <div class="text-h5">Apakah Anda Mengininkan Beasiswa ?</div>
      </div>
      <div class="col-12 col-md-2 text-caption">Program Beasiswa * :</div>
      <div class="col-12 col-md-4">
        <q-select :options="['Ya', 'Tidak']" dense outlined></q-select>
      </div>
    </div>
  </q-form>
</template>

<script>
import collect from "collect.js";
import { useCommon } from "src/stores/storage";
import { computed, defineComponent, ref } from "vue";
import { usePeriode, getSemester } from "src/compose/utils";
export default defineComponent({
  props: {
    item: Object,
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
        return collect(common.$state.info.categories)
          .pluck("children")
          .flatten(1)
          .where("name", props.item.student.for_class)
          .pluck("semester")
          .first();
      },
    });
    return {
      semester,
      fields: usePeriode(semester.value),
      classes: getSemester(props.item.student.level),
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
      form: computed({
        get: () => props.item,
        set: (v) => emit("change", v),
      }),
    };
  },
});
</script>

<style>
</style>
