<template>
  <q-form ref="ref_student">
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
          :options="info.periode"
          label="Pilih Tahun Pelajaran"
          v-model="form.periode"
          :rules="rules"
          hide-bottom-space
        ></q-select>
      </div>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Daftar Untuk Jenjang *</div>
      <div class="col-12 col-md-9">
        <q-select
          outlined
          dense
          :options="info.categories"
          option-label="name"
          option-value="name"
          map-options
          emit-value
          label="Pilih Jenjang"
          v-model="form.level"
          @update:model-value="form.for_class = undefined"
          :rules="rules"
          hide-bottom-space
        ></q-select>
      </div>
      <!--  -->
      <template v-if="form.level !== 'Pesantren'">
        <div class="col-12 col-md-3 text-caption">Daftar Untuk Kelas *</div>
        <div class="col-12 col-md-9">
          <q-select
            outlined
            dense
            :options="classes"
            option-label="name"
            option-value="name"
            map-options
            emit-value
            label="Pilih Kelas"
            v-model="form.for_class"
            :rules="rules"
            hide-bottom-space
          ></q-select>
        </div>
      </template>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">Nama Lengkap *</div>
      <div class="col-12 col-md-9">
        <q-input
          label="Nama Lengkap"
          dense
          outlined
          v-model="form.name"
          :rules="rules"
          hide-bottom-space
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
          :rules="rules"
          hide-bottom-space
        ></q-select>
      </div>
      <!--  -->
      <div class="col-6 col-md-3 text-caption">Kota Lahir *</div>
      <div class="col-6 col-md-4">
        <q-input dense outlined :rules="rules" v-model="form.city"></q-input>
      </div>
      <div class="col-6 col-md-2 text-caption">Tanggal Lahir *</div>
      <div class="col-6 col-md-3">
        <q-input
          dense
          outlined
          v-model="form.date_of_birth"
          :rules="rules"
          hide-bottom-space
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
          :rules="rules"
          hide-bottom-space
        />
      </div>
      <!--  -->
      <template v-if="form.level === 'Pesantren'">
        <div class="col-12 col-md-3 text-caption">Kewarganegaraan *</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.nationality"
            :rules="rules"
            hide-bottom-space
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Bahasa Sehari-hari *</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.default_language"
            :rules="rules"
            hide-bottom-space
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Keadaan Jasmani</div>
        <div class="col-3">
          <q-input
            dense
            outlined
            label="Berat Badan"
            v-model="form.boarding_school_data.weight"
            suffix="KG"
            :rules="rules"
            type="number"
            hide-bottom-space
          ></q-input>
        </div>
        <div class="col-3">
          <q-input
            dense
            outlined
            label="Tinggi Badan"
            v-model="form.boarding_school_data.height"
            suffix="CM"
            :rules="rules"
            type="number"
            hide-bottom-space
          ></q-input>
        </div>
        <div class="col-12 col-md-3">
          <q-input
            dense
            outlined
            label="Golongan Darah"
            v-model="form.boarding_school_data.blood"
            hide-bottom-space
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Anak Ke :</div>
        <div class="col-12 col-md-3">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.child_no"
            :rules="rules"
            hide-bottom-space
            type="number"
          ></q-input>
        </div>
        <div class="col-12 col-md-3">Dari</div>
        <div class="col-12 col-md-3">
          <q-input
            dense
            outlined
            type="number"
            v-model="form.boarding_school_data.from_child"
            :rules="rules"
            hide-bottom-space
            suffix="Bersaudara"
          ></q-input>
        </div>
        <div class="col-12 text-bold">Riwayat Sekolah</div>
        <div class="col-12 col-md-3 text-caption">Asal Sekolah *</div>
        <div class="col-12 col-md-9">
          <q-input
            :rules="rules"
            dense
            outlined
            v-model="form.from_school"
            hide-bottom-space
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">Alamat Sekolah *</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            placeholder="Alamat Sekolah"
            :rules="rules"
            hide-bottom-space
            v-model="form.boarding_school_data.school_address"
          ></q-input>
        </div>
        <div class="col-12 col-md-3 text-caption">Status Sekolah *</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            placeholder="Status Sekolah"
            :rules="rules"
            hide-bottom-space
            v-model="form.boarding_school_data.school_status"
          ></q-input>
        </div>
        <div class="col-12 text-bold">Prestasi Yang Pernah Diraih</div>
        <div class="col-12 col-md-3">Disekolah</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.school_achievement"
            hide-bottom-space
          ></q-input>
        </div>
        <div class="col-12 col-md-3">Di Luar sekolah</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.ex_school_achievement"
            hide-bottom-space
          ></q-input>
        </div>
        <div class="col-12 col-md-3">Dari</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.from_achievement"
            hide-bottom-space
          ></q-input>
        </div>
        <div class="col-12 col-md-3">Sebesar</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            prefix="Rp"
            type="number"
            suffix="/ Bulan"
            v-model="form.boarding_school_data.amount_achievement"
            hide-bottom-space
          ></q-input>
        </div>
        <div class="col-12 text-bold">Kegemaran</div>
        <div class="col-12 col-md-3">Olahraga</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.sport_hobby"
            hide-bottom-space
          ></q-input>
        </div>
        <div class="col-12 col-md-3">Kesenian</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.art_hobby"
            hide-bottom-space
          ></q-input>
        </div>
        <div class="col-12 col-md-3">Lain-lain</div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.boarding_school_data.other_hobby"
            hide-bottom-space
          ></q-input>
        </div>
      </template>
      <!--  -->
      <template v-if="form.level !== 'Pesantren'">
        <div class="col-12 col-md-3 text-caption">Asal Sekolah *</div>
        <div class="col-12 col-md-9">
          <q-input
            :rules="rules"
            dense
            outlined
            v-model="form.from_school"
            hide-bottom-space
          ></q-input>
        </div>
        <!--  -->
        <div class="col-12 col-md-3 text-caption">NISN *</div>
        <div class="col-12 col-md-9">
          <q-input dense outlined v-model="form.nis"></q-input>
        </div>
      </template>
      <!--  -->
      <div class="col-12 col-md-3 text-caption">No Handphone *</div>
      <div class="col-12 col-md-9">
        <q-input
          dense
          outlined
          v-model="form.phone"
          hint="No HP digunakan untuk informasi dan komunikasi sekolah, mohon isi dengan nomor yang aktif"
          :rules="rules"
          hide-bottom-space
        ></q-input>
      </div>
      <!--  -->
      <template v-if="form.level !== 'Pesantren'">
        <div class="col-12 col-md-3 text-caption">
          Email Peserta Didik / Orang Tua *
        </div>
        <div class="col-12 col-md-9">
          <q-input
            dense
            outlined
            v-model="form.email"
            :rules="rules"
            hide-bottom-space
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
            :rules="rules"
            hide-bottom-space
          >
            <template #after>
              <q-btn
                flat
                :icon="show ? 'visibility' : 'visibility_off'"
                @click="show = !show"
                round
                dense
              ></q-btn>
            </template>
          </q-input>
        </div>
      </template>
    </div>
    <q-separator class="q-my-md" />
    <div style="width: 100%; display: flex" class="q-mt-sm">
      <q-space />
      <q-btn
        color="primary"
        label="Selanjutnya"
        @click="onNext($refs.ref_student.validate())"
      />
    </div>
  </q-form>
</template>

<script>
import collect from "collect.js";
import { useCommon } from "src/stores/storage";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    item: Object,
    onNext: Function,
  },
  emits: ["change"],
  setup(props, { emit }) {
    const common = useCommon();
    const info = computed({
      get: () => common.$state.info,
      set: (v) => (common.$state.info = v),
    });
    const form = computed({
      get: () => props.item,
      set: (v) => emit("change", v),
    });
    return {
      info,
      classes: computed({
        get: () => {
          const collection = collect(info.value.categories);
          if (form.value.level) {
            return collection
              .where("name", "===", form.value.level)
              .pluck("children")
              .first();
          }
          return collection.pluck("children").flatten(1).toArray();
        },
      }),
      genders: ["Laki-laki", "Perempuan"],
      show: ref(false),
      rules: [(v) => !!v || "Mohon diisi"],
      form,
    };
  },
});
</script>
