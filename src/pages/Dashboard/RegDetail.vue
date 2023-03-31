<template>
  <div class="row q-col-gutter-sm justify-center">
    <q-timeline class="col-12 col-md-9">
      <q-timeline-entry
        :title="`Periode ${data.periode}`"
        :subtitle="data.status"
      >
        <q-item>
          <q-item-section>
            <q-item-label>Status</q-item-label>
            <!-- <q-item-label>{{ data.status }}</q-item-label> -->
            <q-select
              hint="Status Siswa"
              dense
              outlined
              v-model="data.new_status"
              :options="statuses"
            >
              <template #after>
                <q-btn color="secondary" @click="putData" :loading="loading">
                  Simpan
                </q-btn>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
        <q-item v-if="data.student.level !== 'Pesantren'">
          <q-item-section>
            <q-item-label>Sumber Info</q-item-label>
            <q-item-label caption>
              {{ data.source_info?.join(", ") }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-else>
          <q-item-section>
            <q-item-label>Harapan dari pendidikan di sekolah</q-item-label>
            <q-item-label caption>
              {{ data.boarding_school_data?.hope }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Latar belakang</q-item-label>
            <q-item-label caption>
              {{ data.boarding_school_data?.background }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :href="data.report_image" target="_blank">
          <q-item-section avatar>
            <q-icon name="download"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>File Rapor</q-item-label>
            <q-item-label caption> Klik Untuk melihat </q-item-label>
          </q-item-section>
        </q-item>
        <div class="row q-col-gutter-sm justify-center q-mt-md">
          <div class="col-12 col-md-5">
            <q-card
              @click="preview(data.student_image)"
              style="cursor: pointer"
            >
              <q-card-section class="q-px-none">
                <q-img :src="data.student_image" />
              </q-card-section>
              <q-card-section class="text-center text-bold">
                Foto Siswa
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-5">
            <q-card
              @click="preview(data.transfer_image)"
              style="cursor: pointer"
            >
              <q-card-section class="q-px-none">
                <q-img :src="data.transfer_image" />
              </q-card-section>
              <q-card-section class="text-center text-bold">
                Bukti Transfer
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-timeline-entry>
      <q-timeline-entry title="Data Siswa">
        <q-item dense>
          <q-item-section>
            <q-item-label>Nama</q-item-label>
            <q-item-label caption>{{ data.student.name }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Jenis Kelamin</q-item-label>
            <q-item-label caption>{{ data.student.gender }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>
            <q-item-label>Jenjang</q-item-label>
            <q-item-label caption>{{ data.student.level }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="data.student.level !== 'Pesantren'">
            <q-item-label>Kelas</q-item-label>
            <q-item-label caption>{{ data.student.for_class }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Asal Sekolah</q-item-label>
            <q-item-label caption>{{ data.student.from_school }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-list dense v-if="data.student.level === 'Pesantren'">
          <q-item>
            <q-item-section>
              <q-item-label>Alamat Sekolah</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.school_address }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Status Sekolah</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.school_status }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <!--  -->
          <q-item>
            <q-item-section>
              <q-item-label>Kewarganegaraan</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.nationality }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Bahasa Sehari-hari</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.default_language }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Tinggi Badan</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.height }} CM
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Berat Badan</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.weight }} KG
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Golongan Darah</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.blood }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-my-md">
            <q-item-section>
              <q-item-label></q-item-label>
              <q-item-label>
                Anak Ke {{ data.student.boarding_school_data?.child_no }} dari
                {{ data.student.boarding_school_data?.from_child }} Bersaudara
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-item dense>
          <q-item-section v-if="data.student.level !== 'Pesantren'">
            <q-item-label>NISN</q-item-label>
            <q-item-label caption>{{ data.student.nis }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Email</q-item-label>
            <q-item-label caption>{{ data.student.email }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>No Telp</q-item-label>
            <q-item-label caption>
              {{ data.student.phone }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>
            <q-item-label>Tempat Tanggal Lahir</q-item-label>
            <q-item-label caption
              >{{ data.student.city }}
              {{ data.student.date_of_birth }}</q-item-label
            >
          </q-item-section>
          <q-item-section>
            <q-item-label>Alamat Lengkap</q-item-label>
            <q-item-label caption>{{ data.student.address }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-list v-if="data.student.level === 'Pesantren'">
          <div class="text-caption q-ml-md q-mt-md">Kegemaran</div>
          <q-item>
            <q-item-section>
              <q-item-label>Olahraga</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.sport_hobby }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Kesenian</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.art_hobby }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Lainnya</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.other_hobby }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="text-caption q-ml-md q-mt-md">
            Prestasi Yang Pernah Diraih
          </div>
          <q-item>
            <q-item-section>
              <q-item-label>Disekolah</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.school_achievement }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Diluar Sekolah</q-item-label>
              <q-item-label caption>
                {{ data.student.boarding_school_data?.ex_school_achievement }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label></q-item-label>
              <q-item-label caption>
                Dari
                {{ data.student.boarding_school_data?.from_achievement }}
                sebesar
                {{ data.student.boarding_school_data?.amount_achievement }} /
                bulan
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-timeline-entry>
      <q-timeline-entry title="Data Orang tua/wali">
        <q-item>
          <q-item-section>
            <q-item-label>Nama Ayah</q-item-label>
            <q-item-label caption>
              {{ data.form_parent.father_name }}
            </q-item-label>
            <q-item-label>No Telp Ayah</q-item-label>
            <q-item-label caption>
              {{ data.form_parent.father_phone }}
            </q-item-label>
            <q-item-label>Alumni</q-item-label>
            <q-item-label caption>
              {{
                data.form_parent.father_is_alumni
                  ? data.form_parent.father_passed
                  : "Bukan"
              }}
            </q-item-label>
            <template v-if="data.student.level === 'Pesantren'">
              <q-item-label>Alamat</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.father_info?.address }}
              </q-item-label>
              <q-item-label>Tempat & Tgl Lahir</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.father_info?.date_of_birth }}
              </q-item-label>
              <q-item-label>Kewarganegaraan</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.father_info?.nationality }}
              </q-item-label>
              <q-item-label>Agama</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.father_info?.religion }}
              </q-item-label>
              <q-item-label>Pendidikan</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.father_info?.graduation }}
              </q-item-label>
              <q-item-label>Pekerjaan</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.father_info?.job }}
              </q-item-label>
              <q-item-label>Penghasilan</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.father_info?.sallary }}
              </q-item-label>
            </template>
          </q-item-section>
          <q-item-section>
            <q-item-label>Nama Ibu</q-item-label>
            <q-item-label caption>
              {{ data.form_parent.mother_name }}
            </q-item-label>
            <q-item-label>No Telp Ibu</q-item-label>
            <q-item-label caption>
              {{ data.form_parent.mother_phone }}
            </q-item-label>
            <q-item-label>Alumni</q-item-label>
            <q-item-label caption>
              {{
                data.form_parent.mother_is_alumni
                  ? data.form_parent.mother_passed
                  : "Bukan"
              }}
            </q-item-label>
            <template v-if="data.student.level === 'Pesantren'">
              <q-item-label>Alamat</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.mother_info?.address }}
              </q-item-label>
              <q-item-label>Tempat & Tgl Lahir</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.mother_info?.date_of_birth }}
              </q-item-label>
              <q-item-label>Kewarganegaraan</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.mother_info?.nationality }}
              </q-item-label>
              <q-item-label>Agama</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.mother_info?.religion }}
              </q-item-label>
              <q-item-label>Pendidikan</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.mother_info?.graduation }}
              </q-item-label>
              <q-item-label>Pekerjaan</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.mother_info?.job }}
              </q-item-label>
              <q-item-label>Penghasilan</q-item-label>
              <q-item-label caption>
                {{ data.form_parent.mother_info?.sallary }}
              </q-item-label>
            </template>
          </q-item-section>
          <q-item-section v-if="data.student.level !== 'Pesantren'">
            <q-item-label>Nama Wali</q-item-label>
            <q-item-label caption>
              {{ data.form_parent.guard_name }}
            </q-item-label>
            <q-item-label>No Telp Wali</q-item-label>
            <q-item-label caption>
              {{ data.form_parent.guard_phone }}
            </q-item-label>
            <q-item-label>Alumni</q-item-label>
            <q-item-label caption>
              {{
                data.form_parent.guard_is_alumni
                  ? data.form_parent.guard_passed
                  : "Bukan"
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="data.student.level !== 'Pesantren'">
          <q-item-section>
            <q-item-label>Link Tiktok</q-item-label>
            <q-item-label caption>
              <a :href="data.form_parent.tiktok_url" target="_blank">
                {{ data.form_parent.tiktok_url }}
              </a>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Link Facebook</q-item-label>
            <q-item-label caption>
              <a :href="data.form_parent.facebook_url" target="_blank">
                {{ data.form_parent.facebook_url }}
              </a>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Link Instagram</q-item-label>
            <q-item-label caption>
              <a :href="data.form_parent.instagram_url" target="_blank">
                {{ data.form_parent.instagram_url }}
              </a>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>Link Youtube</q-item-label>
            <q-item-label caption>
              <a :href="data.form_parent.youtube_url" target="_blank">
                {{ data.form_parent.youtube_url }}
              </a>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-timeline-entry>
      <q-timeline-entry
        v-if="data.periodic && data.periodic.lesson_values"
        title="Data Periodik"
      >
        <table style="border-collapse: collapse; width: 100%" border="1">
          <thead class="text-bold">
            <tr class="bg-primary text-white">
              <td colspan="20" class="text-center">Nilai Pelajaran</td>
            </tr>
            <tr style="text-align: center">
              <td rowspan="2">Mapel</td>
              <td colspan="4" v-for="x in semester" :key="x">Kelas {{ x }}</td>
            </tr>
            <tr style="text-align: center">
              <template v-for="x in data.periodic.lesson_values[0]?.classes">
                <td v-for="(y, s) in x" colspan="2">Semester {{ s }}</td>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="x in data.periodic.lesson_values"
              :key="x.type"
              class="text-center"
            >
              <td class="text-bold q-px-sm">{{ x.type }}</td>
              <template v-for="y in x.classes">
                <template v-for="(z, i) in y">
                  <td class="q-px-xs">
                    <q-input
                      borderless
                      dense
                      label="KKM"
                      v-model="z.kkm"
                      readonly
                    />
                  </td>
                  <td class="q-px-xs">
                    <q-input
                      borderless
                      dense
                      label="Nilai"
                      v-model="z.nilai"
                      readonly
                    />
                  </td>
                </template>
              </template>
            </tr>
          </tbody>
        </table>
        <table
          class="q-mt-md"
          style="border-collapse: collapse; width: 100%"
          border="1"
        >
          <thead class="text-bold">
            <tr class="bg-primary text-white">
              <td colspan="20" class="text-center">Kehadiran</td>
            </tr>
            <tr style="text-align: center">
              <td rowspan="2">Keterangan</td>
              <td colspan="2" v-for="x in semester" :key="x">Kelas {{ x }}</td>
            </tr>
            <tr style="text-align: center">
              <template v-for="x in data.periodic.lesson_values[0]?.classes">
                <td v-for="(y, s) in x">Semester {{ s }}</td>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in data.periodic.attendances" :key="x.type">
              <td class="text-bold q-px-sm">{{ x.type }}</td>
              <template v-for="y in x.classes">
                <template v-for="(z, i) in y">
                  <td class="q-px-md">
                    <q-input
                      dense
                      suffix="Hari"
                      borderless
                      readonly
                      v-model="y[i]"
                    ></q-input>
                  </td>
                </template>
              </template>
            </tr>
          </tbody>
        </table>
      </q-timeline-entry>
      <q-timeline-entry
        v-if="data.scholarship && data.scholarship.length > 0"
        title="Data Prestasi"
        subtitle="Untuk Program beasiswa"
      >
        <div class="row q-col-gutter-sm">
          <div class="col-6 col-md-4" v-for="x in data.scholarship" :key="x.id">
            <q-card>
              <q-card-section>
                <q-img :src="x.document"></q-img>
              </q-card-section>
              <q-card-section>
                {{ x.name }}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-timeline-entry>
    </q-timeline>
    <!-- <pre> {{ data }} </pre> -->
    <q-dialog v-model="dialog">
      <q-img :src="image" style="max-height: 100vh" width="100%"></q-img>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";
import { computed, onMounted } from "@vue/runtime-core";
import { getSemester, status } from "src/compose/utils";
export default {
  setup() {
    const data = ref({
      student: {},
      form_parent: {},
      periodic: {},
      scholarship: [],
    });
    const statuses = ref(status);
    const route = useRoute();
    const loading = ref(false);
    const dialog = ref(false);
    const image = ref("");

    function getData() {
      loading.value = true;
      api.get("forms/" + route.params.id).then((res) => {
        data.value = res.data.data;
        data.value.new_status = res.data.data?.status;
        loading.value = false;
      });
    }
    function putData() {
      loading.value = true;
      api
        .put("forms/" + route.params.id, {
          status: data.value.new_status,
          id: data.value.id,
          approval: data.value.new_status === "Diterima",
        })
        .then((res) => getData());
    }
    onMounted(() => getData());
    return {
      data,
      loading,
      statuses,
      dialog,
      image,
      preview(img) {
        image.value = img;
        dialog.value = true;
      },
      semester: computed({ get: () => getSemester(data.value.student.level) }),
      putData,
      getData,
    };
  },
};
</script>

<style></style>
