<template>
  <q-form ref="parent">
    <div class="row q-col-gutter-md">
      <div class="col-12 text-h5">Data Ayah Kandung (Wajib Diisi)</div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Nama Ayah *</div>
      <div class="col-12 col-md-9">
        <q-input
          :rules="rules"
          hide-bottom-space
          outlined
          required
          dense
          v-model="form.father_name"
        ></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">No Handphone Ayah *</div>
      <div class="col-12 col-md-9">
        <q-input
          :rules="rules"
          hide-bottom-space
          outlined
          required
          dense
          v-model="form.father_phone"
        ></q-input>
      </div>
      <!--  -->
      <template v-if="!isPesantren">
        <div class="col-12 col-md-3 text-caption">Alumni ?*</div>
        <div class="col-12 col-md-9">
          <q-select
            :options="options"
            option-label="text"
            option-value="value"
            emit-value
            map-options
            label="Pilihan"
            dense
            outlined
            v-model="form.father_is_alumni"
          ></q-select>
        </div>
        <template v-if="form.father_is_alumni">
          <div class="col-12 col-md-3 text-caption">Tahun Lulus ?*</div>
          <div class="col-12 col-md-9">
            <q-select
              :options="getPassYear(backYear)"
              label="Tahun Lulus"
              dense
              outlined
              v-model="form.father_passed"
            ></q-select>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="col-12 col-md-3 text-caption">Tempat Tgl Lahir*</div>
        <div class="col-12 col-md-9">
          <q-input
            :rules="rules"
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.father_info.date_of_birth"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Alamat Rumah*</div>
        <div class="col-12 col-md-9">
          <q-input
            :rules="rules"
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.father_info.address"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Agama*</div>
        <div class="col-12 col-md-9">
          <q-input
            hide-bottom-space
            outlined
            required
            dense
            :rules="rules"
            v-model="form.father_info.religion"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Warga Negara</div>
        <div class="col-12 col-md-9">
          <q-input
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.father_info.nationality"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Pendidikan</div>
        <div class="col-12 col-md-9">
          <q-input
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.father_info.graduation"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Pekerjaan</div>
        <div class="col-12 col-md-9">
          <q-input
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.father_info.job"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Penghasilan Perbulan</div>
        <div class="col-12 col-md-9">
          <div v-for="x in penghasilan" :key="x">
            <q-radio
              :label="x"
              :val="x"
              v-model="form.father_info.sallary"
            ></q-radio>
          </div>
        </div>
        <!--  -->
      </template>
      <!--  -->
      <div class="col-12 text-h5 q-mt-md">Data Ibu Kandung (Wajib Diisi)</div>
      <div class="col-12 col-md-3 text-caption">Nama Ibu *</div>
      <div class="col-12 col-md-9">
        <q-input
          :rules="rules"
          hide-bottom-space
          outlined
          required
          dense
          v-model="form.mother_name"
        ></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">No Handphone Ibu *</div>
      <div class="col-12 col-md-9">
        <q-input
          :rules="rules"
          hide-bottom-space
          outlined
          required
          dense
          v-model="form.mother_phone"
        ></q-input>
      </div>
      <!--  -->
      <template v-if="!isPesantren">
        <div class="col-12 col-md-3 text-caption">Alumni ?*</div>
        <div class="col-12 col-md-9">
          <q-select
            :options="options"
            option-label="text"
            option-value="value"
            emit-value
            map-options
            label="Pilihan"
            dense
            outlined
            v-model="form.mother_is_alumni"
          ></q-select>
        </div>
        <template v-if="form.mother_is_alumni">
          <div class="col-12 col-md-3 text-caption">Tahun Lulus ?*</div>
          <div class="col-12 col-md-9">
            <q-select
              :options="getPassYear(backYear)"
              label="Tahun Lulus"
              dense
              outlined
              v-model="form.mother_passed"
            ></q-select>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="col-12 col-md-3 text-caption">Tempat Tgl Lahir*</div>
        <div class="col-12 col-md-9">
          <q-input
            :rules="rules"
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.mother_info.date_of_birth"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Alamat Rumah*</div>
        <div class="col-12 col-md-9">
          <q-input
            :rules="rules"
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.mother_info.address"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Agama*</div>
        <div class="col-12 col-md-9">
          <q-input
            hide-bottom-space
            outlined
            required
            dense
            :rules="rules"
            v-model="form.mother_info.religion"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Warga Negara</div>
        <div class="col-12 col-md-9">
          <q-input
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.mother_info.nationality"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Pendidikan</div>
        <div class="col-12 col-md-9">
          <q-input
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.mother_info.graduation"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Pekerjaan</div>
        <div class="col-12 col-md-9">
          <q-input
            hide-bottom-space
            outlined
            required
            dense
            v-model="form.mother_info.job"
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Penghasilan Perbulan</div>
        <div class="col-12 col-md-9">
          <div v-for="x in penghasilan" :key="x">
            <q-radio
              :label="x"
              :val="x"
              v-model="form.mother_info.sallary"
            ></q-radio>
          </div>
        </div>
        <!--  -->
      </template>
      <!--  -->
      <template v-if="!isPesantren">
        <div class="col-12 text-h5 q-mt-md">
          Data Wali (Opsional Bukan Ibu/Ayah)
        </div>
        <div class="col-12 col-md-3 text-caption">Nama Wali</div>
        <div class="col-12 col-md-9">
          <q-input outlined required dense v-model="form.guard_name"></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">No Handphone Wali</div>
        <div class="col-12 col-md-9">
          <q-input outlined required dense v-model="form.guard_phone"></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Alumni ?</div>
        <div class="col-12 col-md-9">
          <q-select
            :options="options"
            option-label="text"
            option-value="value"
            emit-value
            map-options
            label="Pilihan"
            dense
            outlined
            v-model="form.guard_is_alumni"
          ></q-select>
        </div>
        <template v-if="form.guard_is_alumni">
          <div class="col-12 col-md-3 text-caption">Tahun Lulus ?*</div>
          <div class="col-12 col-md-9">
            <q-select
              :options="getPassYear(backYear)"
              label="Tahun Lulus"
              dense
              outlined
              v-model="form.guard_passed"
            ></q-select>
          </div>
        </template>
        <!--  -->
        <div class="col-12 text-h5 q-mt-md">Akun Sosial Media (Jika Ada)</div>
        <div class="col-12 col-md-3 text-caption">Tiktok</div>
        <div class="col-12 col-md-9">
          <q-input outlined required dense v-model="form.tiktok_url"></q-input>
        </div>
        <div class="col-12 col-md-3 text-caption">Youtube</div>
        <div class="col-12 col-md-9">
          <q-input outlined required dense v-model="form.youtube_url"></q-input>
        </div>
        <div class="col-12 col-md-3 text-caption">Instagram</div>
        <div class="col-12 col-md-9">
          <q-input
            outlined
            required
            dense
            v-model="form.instagram_url"
          ></q-input>
        </div>
        <div class="col-12 col-md-3 text-caption">Facebook</div>
        <div class="col-12 col-md-9">
          <q-input
            outlined
            required
            dense
            v-model="form.facebook_url"
          ></q-input>
        </div>
      </template>
      <template v-else>
        <div class="col-12 text-bold q-mt-md">Keterangan Tambahan</div>
        <div class="col-12 text-caption">
          Apa yang melatarbelakangi Bapak/Ibu memilih SMP/SMA {{ school }}* ?
        </div>
        <q-input
          class="col-12"
          :rules="rules"
          type="textarea"
          v-model="boarding.background" hide-bottom-space
          outlined
          autogrow
        ></q-input>
        <div class="col-12 text-caption">
          Apa yang Bapak/Ibu harapkan dari pendidikan di SMP/SMA {{ school }}* ?
        </div>
        <q-input
          class="col-12"
          :rules="rules"
          type="textarea"
          v-model="boarding.hope"
          outlined
          autogrow
        ></q-input>
      </template>
    </div>
    <q-separator class="q-my-md" />
    <div style="width: 100%; display: flex" class="q-mt-sm">
      <q-btn color="warning" label="Kembali" flat @click="onBack" />
      <q-space />
      <q-btn
        color="primary"
        :label="step === 5 ? 'Submit' : 'Selanjutnya'"
        @click="onNext($refs.parent.validate())"
      />
    </div>
  </q-form>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { getPassYear } from "src/compose/utils";
export default defineComponent({
  props: {
    item: Object,
    formBoarding: Object,
    onNext: Function,
    onBack: Function,
    isPesantren: Boolean,
    school: String,
    backYear: {
      type: Number,
      default: 100,
    },
  },
  emits: ["change", "changeBoard"],
  setup(props, { emit }) {
    return {
      options: [
        { text: "Ya", value: 1 },
        { text: "Tidak", value: 0 },
      ],
      getPassYear,
      show: ref(false),
      form: computed({
        get: () => props.item,
        set: (v) => emit("change", v),
      }),
      boarding: computed({
        get: () => props.formBoarding,
        set: (v) => emit("changeBoard", v),
      }),
      rules: [(v) => !!v || "Mohon diisi"],
      penghasilan: [
        "Kurang dari Rp. 500.000",
        "Rp. 500.000 s.d Rp. 1.000.000",
        "Rp. 1.000.000 s.d Rp. 2.500.000",
        "Rp. 2.500.000 s.d Rp. 5.000.000",
        "Rp. 5.000.000 s.d Rp. 10.000.000",
        "Lebih dari Rp. 10.000.000",
      ],
    };
  },
});
</script>
