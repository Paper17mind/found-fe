const routes = [
  {
    path: "/",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/register", component: () => import("pages/Register.vue") },
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
        path: "/dashboard/students",
        component: () => import("pages/Dashboard/Students.vue"),
      },
      {
        path: "/dashboard/users",
        component: () => import("pages/Dashboard/Users.vue"),
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
