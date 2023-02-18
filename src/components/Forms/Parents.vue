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
      <!--  -->
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
        <q-input outlined required dense v-model="form.instagram_url"></q-input>
      </div>
      <div class="col-12 col-md-3 text-caption">Facebook</div>
      <div class="col-12 col-md-9">
        <q-input outlined required dense v-model="form.facebook_url"></q-input>
      </div>
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
    onNext: Function,
    onBack: Function,
    backYear: {
      type: Number,
      default: 100,
    },
  },
  emits: ["change"],
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
      rules: [(v) => !!v || "Mohon diisi"],
    };
  },
});
</script>
