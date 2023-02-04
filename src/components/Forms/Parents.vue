<template>
  <q-form ref="student">
    <div class="row q-col-gutter-md">
      <div class="col-12 text-h5">Data Ayah Kandung (Wajib Diisi)</div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Nama Ayah *</div>
      <div class="col-12 col-md-9">
        <q-input outlined required dense v-model="form.father_name"></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">No Handphone Ayah *</div>
      <div class="col-12 col-md-9">
        <q-input outlined required dense v-model="form.father_phone"></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Alumni ?*</div>
      <div class="col-12 col-md-9">
        <q-select
          :options="['Ya', 'Tidak']"
          label="Pilihan"
          dense
          outlined
          v-model="form.father_is_alumni"
        ></q-select>
      </div>
      <!--  -->
      <div class="col-12 text-h5 q-mt-md">Data Ibu Kandung (Wajib Diisi)</div>
      <div class="col-12 col-md-3 text-caption">Nama Ibu *</div>
      <div class="col-12 col-md-9">
        <q-input outlined required dense v-model="form.mother_name"></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">No Handphone Ibu *</div>
      <div class="col-12 col-md-9">
        <q-input outlined required dense v-model="form.mother_phone"></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Alumni ?*</div>
      <div class="col-12 col-md-9">
        <q-select
          :options="['Ya', 'Tidak']"
          label="Pilihan"
          dense
          outlined
          v-model="form.mother_is_alumni"
        ></q-select>
      </div>
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
          :options="['Ya', 'Tidak']"
          label="Pilihan"
          dense
          outlined
          v-model="form.guard_is_alumni"
        ></q-select>
      </div>
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
  </q-form>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    item: Object,
  },
  emits: ["change"],
  setup(props, { emit }) {
    return {
      levels: ["SD", "SMP", "SMA"],
      classes: ["SD I-VI", "SMP VII-IX", "SMA X-XII"],
      genders: ["Laki-laki", "Perempuan"],
      show: ref(false),
      form: computed({
        get: () => props.item,
        set: (v) => emit("change", v),
      }),
    };
  },
});
</script>
