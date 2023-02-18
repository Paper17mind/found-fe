<template>
  <div>
    <!-- <pre>{{ data }}</pre> -->
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-4" v-for="(x, title) in data" :key="title">
        <q-card bordered>
          <q-card-section class="text-bold">
            Periode {{ title }}
          </q-card-section>
          <q-card-section>
            <q-item
              dense
              v-for="y in x"
              :key="y.status"
              style="border-bottom: 1px solid #e1e1e1"
            >
              <q-item-section>
                <q-item-label> {{ y.status }} </q-item-label>
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
import { api } from "src/boot/axios";

export default defineComponent({
  setup() {
    const data = ref([]);
    function getData() {
      api.get("report").then((res) => {
        data.value = res.data.data;
      });
    }
    onMounted(() => getData());
    return {
      data,
    };
  },
});
</script>

<style>
</style>
