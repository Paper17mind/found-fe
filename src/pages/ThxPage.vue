<template>
  <div class="row justify-center align-center q-pt-lg">
    <div class="col-12 col-md-5">
      <q-card id="printable" class="row q-col-gutter-sm" style="min">
        <div class="col-12 text-center text-bold">
          <q-img src="~assets/logo.png" width="50px" />
        </div>
        <div class="col-12 text-center text-bold">
          Kartu Bukti Pendaftaran ({{ info.level }})
        </div>
        <q-card-section class="col-12 q-px-md">
          <table border="1" class="tbl">
            <tbody>
              <tr>
                <td>Kode</td>
                <td>: {{ info.nis }}{{ info.code }}</td>
              </tr>
              <tr>
                <td>Nama Siswa</td>
                <td>: {{ info.name }}</td>
              </tr>
              <tr>
                <td>NISN</td>
                <td>: {{ info.nis }}</td>
              </tr>
              <tr>
                <td>Asal Sekolah</td>
                <td>: {{ info.from_school }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>: {{ info.email }}</td>
              </tr>
            </tbody>
          </table>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 text-center q-pt-md">
      <q-btn :disable="!info.name" color="primary" no-caps @click="print">
        Download Dokumen
      </q-btn>
    </div>
  </div>
</template>

<script>
import { useCommon } from "src/stores/storage";
import { computed, defineComponent, onUnmounted, ref } from "vue";
export default defineComponent({
  setup() {
    const store = useCommon();
    const info = computed({
      get: () => store.$state.student,
      set: (v) => (store.$state.student = v),
    });
    onUnmounted(() => (info.value = {}));
    return {
      info,
      print() {
        var opt = {
          margin: 1,
          filename: "kartu-pendaftaran.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: {
            unit: "mm",
            format: [115.28, 135.89],
            orientation: "portrait",
          },
        };
        const el = document.getElementById("printable");
        html2pdf().set(opt).from(el).to("img").save();
      },
    };
  },
});
</script>

<style scoped>
.tbl {
  width: 100%;
  border-collapse: collapse;
}
</style>
