const routes = [
  {
    path: "/",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/register", component: () => import("pages/Register.vue") },
      { path: "/information", component: () => import("pages/Information.vue") },
      { path: "/login", component: () => import("pages/Login.vue") },
    ],
  },
  {
    path: "/dashboard/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Dashboard/Home.vue") },
      {
        path: "/dashboard/registrar",
        component: () => import("pages/Dashboard/Registrar.vue"),
      },
      {
        path: "/dashboard/registrar/:id",
        component: () => import("pages/Dashboard/RegDetail.vue"),
      },
      {
        path: "/dashboard/students",
        component: () => import("pages/Dashboard/Students.vue"),
      },
      {
        path: "/dashboard/users",
        component: () => import("pages/Dashboard/Users.vue"),
      },
      {
        path: "/dashboard/bank-account",
        component: () => import("pages/Dashboard/BankAccount.vue"),
      },
      {
        path: "/dashboard/settings",
        component: () => import("pages/Dashboard/Settings.vue"),
      },
      {
        path: "/dashboard/profile",
        component: () => import("pages/Dashboard/Profile.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
