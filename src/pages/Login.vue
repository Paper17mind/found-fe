<template>
  <div
    class="row q-col-gutter-md justify-center align-center flex q-mt-md"
    style="min-height: 50vh"
  >
    <q-card class="col-12 col-md-5 mx-auto">
      <q-card-section class="text-center text-h5"> Login </q-card-section>
      <q-card-section>
        <q-form class="row q-col-gutter-sm">
          <q-input
            class="col-12"
            label="Email"
            v-model="form.email"
            outlined
            dense
          ></q-input>
          <q-input
            class="col-12"
            label="Password"
            :type="show ? 'text' : 'password'"
            v-model="form.password"
            dense
            outlined
            @keyup.enter="login"
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
        </q-form>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn color="primary" style="width: 100%" @click="login" rounded>
          Login
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { api } from "src/boot/axios";
import { useCommon } from "src/stores/storage";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { onBeforeMount } from "vue";
export default {
  setup() {
    const form = ref({});
    const store = useCommon();
    const router = useRouter();
    const q = useQuasar();
    const show = ref(false);
    function checkAuth() {
      api.get("auth/user").then((res) => {
        router.push("/dashboard");
      });
    }
    onBeforeMount(() => {
      if (store.$state.token) checkAuth();
    });
    return {
      form,
      show,
      login() {
        q.loading.show({ message: "Memeriksa akun anda .." });
        api
          .post("auth/login", form.value)
          .then((res) => {
            store.$state.token = res.data.token;
            store.$state.user = res.data.user;
            q.loading.hide();
            router.push("/dashboard/profile");
          })
          .catch((e) => {
            q.loading.hide();
            q.notify({ message: e.response.data?.message });
          });
      },
    };
  },
};
</script>

<style>
</style>
