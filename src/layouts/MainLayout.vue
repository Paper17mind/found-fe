<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <div class="q-px-sm m-3" href="https://dbiis.org" >
          <img :src="info.logo" style="height: 50px" href="https://dbiis.org/" />
        </div>
        <q-space />
        <template v-for="x in menu">
          <q-btn-dropdown
            flat
            transition-show="jump-up"
            transition-hide="jump-down"
            v-if="x.submenu"
            :label="x.text"
            stretch
          >
            <q-item clickable v-for="y in x.submenu" :key="y.link" :to="y.link">
              <q-item-section>
                <q-item-label>{{ y.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-btn-dropdown>
          <q-btn
            v-else
            flat
            :to="x.link"
            stretch
            :class="{ 'bg-secondary': x.link === $route.path }"
          >
            {{ x.text }}
          </q-btn>
        </template>
        <q-btn round icon="people">
          <q-menu>
            <div>
              <q-img
                :src="user.profile"
                style="width: 200px"
                class="text-center"
              >
                <div class="q-mt-xl">{{ user.name }}</div>
              </q-img>
            </div>
            <q-item clickable to="/dashboard/profile">
              <q-item-section>
                <q-item-label> Profile </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="logout">
              <q-item-section>
                <q-item-label> Logout </q-item-label>
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-ajax-bar color="green"></q-ajax-bar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useMeta } from "quasar";
import { api } from "src/boot/axios";
import { useCommon } from "src/stores/storage";
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useCommon();
    const router = useRouter();
    const route = useRoute();

    const menu = computed({
      get: () => store.$state.permissions,
      set: (v) => (store.$state.permissions = v),
    });
    const info = computed({
      get: () => store.$state.info,
      set: (v) => (store.$state.info = v),
    });
    watch(
      () => route.name,
      () => useMeta({ title: `${route.name} | ${info.value.name}` })
    );
    function checkAuth() {
      api
        .get("auth/user")
        .catch((e) => {
          store.$state.token = null;
          store.$state.user = {};
          router.push("/login");
        })
        .then(() => {
          getPermission();
          getLevel();
        });
    }
    function getLevel() {
      api
        .get("categories?type=jenjang")
        .then((res) => (store.$state.levels = res.data.data));
    }
    onMounted(() => store.getInfo());
    onBeforeMount(() => checkAuth());
    function logout() {
      const c = confirm("Yakin untuk keluar dari aplikasi ?");
      if (!c) return;
      api.get("auth/logout").then((res) => {
        store.$state.user = {};
        store.$state.token = null;
        store.$state.permissions = [];
        router.push("/");
      });
    }
    function getPermission() {
      api.get("permission").then((res) => {
        menu.value = res.data;
      });
    }
    return {
      logout,
      info,
      leftDrawerOpen,
      user: store.$state.user,
      menu,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
