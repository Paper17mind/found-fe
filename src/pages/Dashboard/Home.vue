<template>
  <div>
    <!-- <pre>{{ data }}</pre> -->
    <div class="row q-col-gutter-sm q-mt-xs q-px-sm">
      <div class="col-12" v-if="loading">
        <q-inner-loading showing color="primary" label="Please wait ...">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </div>
      <div class="col-12 col-md-4" v-for="(x, title) in data" :key="title">
        <q-card bordered>
          <q-card-section class="text-bold">
            Periode {{ title }}
          </q-card-section>
          <q-card-section>
            <q-item
              dense
              v-for="y in collect(x).sortBy('status').toArray()"
              :key="y.status"
              style="border-bottom: 1px solid #e1e1e1"
            >
              <q-item-section>
                <q-item-label
                  class="text-bold"
                  :class="{
                    'text-green': y.status === 'Lulus Berkas',
                    'text-red': y.status === 'Tidak Lulus',
                  }"
                >
                  {{ y.status }}
                </q-item-label>
                <q-item-label class="text-bold" caption>
                  {{ price(y.total) }}
                </q-item-label>
              </q-item-section>
              <q-item-section side class="text-bold">
                {{ y.count }}
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import collect from "collect.js";
import { api } from "src/boot/axios";
import { price } from "src/compose/utils";

export default defineComponent({
  setup() {
    const loading = ref(false);
    const data = ref([]);
    function getData() {
      loading.value = true;
      api.get("report").then((res) => {
        data.value = res.data.data;
        loading.value = false;
      });
    }
    onMounted(() => getData());
    return {
      data,
      price,
      collect,
      loading,
    };
  },
});
</script>

<style></style>
