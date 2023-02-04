<template>
  <q-form ref="student">
    <div class="row q-col-gutter-md">
      <!--  -->
      <div class="col-12 col-md-3 text-caption">
        Daftar Untuk Tahun Pelajaran *
      </div>
      <div class="col-12 col-md-9">
        <q-select
          outlined
          required
          dense
          label="Pilih Tahun Pelajaran"
          v-model="form.periode"
        ></q-select>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Daftar Untuk Jenjang *</div>
      <div class="col-12 col-md-9">
        <q-select
          outlined
          dense
          :options="levels"
          label="Pilih Jenjang"
          v-model="form.level"
        ></q-select>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Daftar Untuk Kelas *</div>
      <div class="col-12 col-md-9">
        <q-select
          outlined
          dense
          :options="classes"
          label="Pilih Kelas"
          v-model="form.for_class"
        ></q-select>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Nama Lengkap *</div>
      <div class="col-12 col-md-9">
        <q-input
          label="Nama Lengkap"
          dense
          outlined
          v-model="form.name"
        ></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Jenis Kelamin *</div>
      <div class="col-12 col-md-9">
        <q-select
          outlined
          dense
          :options="genders"
          label="Jenis Kelamin"
          v-model="form.gender"
        ></q-select>
      </div>
      <!--  -->
      <div class="col-6 col-md-3 text-caption">Kota Lahir *</div>
      <div class="col-6 col-md-4">
        <q-input dense outlined v-model="form.city"></q-input>
      </div>
      <div class="col-6 col-md-2 text-caption">Tanggal Lahir *</div>
      <div class="col-6 col-md-3">
        <q-input
          dense
          outlined
          v-model="form.date_of_birth"
          type="date"
        ></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Alamat Lengkap *</div>
      <div class="col-12 col-md-9">
        <q-input
          type="textarea"
          outlined
          dense
          hint="Alamat Lengkap,RT/RW, Kelurahan, Kecamatan, Kabupaten/Kota, Kode Pos"
          v-model="form.address"
        />
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Asal Sekolah *</div>
      <div class="col-12 col-md-9">
        <q-input dense outlined v-model="form.name"></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">NISN *</div>
      <div class="col-12 col-md-9">
        <q-input dense outlined v-model="form.nis"></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">No Handphone *</div>
      <div class="col-12 col-md-9">
        <q-input
          dense
          outlined
          v-model="form.phone"
          hint="No HP digunakan untuk informasi dan komunikasi sekolah, mohon isi dengan nomor yang aktif"
        ></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">
        Email Peserta Didik / Orang Tua *
      </div>
      <div class="col-12 col-md-9">
        <q-input
          dense
          outlined
          v-model="form.email"
          hint="Mohon isi dengan email yang aktif"
        ></q-input>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Password Login *</div>
      <div class="col-12 col-md-9">
        <q-input
          dense
          outlined
          :type="show ? 'text' : 'password'"
          v-model="form.password"
          hint="Password digunakan untuk login nantinya"
        >
          <template #after>
            <q-btn flat
              :icon="show ? 'visibility' : 'visibility_off'"
              @click="show = !show"
              round
              dense
            ></q-btn>
          </template>
        </q-input>
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
