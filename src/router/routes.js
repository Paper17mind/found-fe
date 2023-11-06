const routes = [
  {
    path: "/",
    component: () => import("layouts/PublicLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/register",
        component: () => import("pages/Register.vue"),
        name: "Form Pendaftaran",
      },
      {
        path: "/information",
        name: "Information",
        component: () => import("pages/Information.vue"),
      },
      {
        path: "/success-screen",
        name: "Success",
        component: () => import("pages/ThxPage.vue"),
      },
      { path: "/admin", component: () => import("pages/Login.vue") },
      { path: "/login", component: () => import("pages/Login.vue") },
    ],
  },
  {
    path: "/dashboard/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Dashboard/Home.vue"),
        name: "Dashboard",
      },
      {
        path: "/dashboard/registrar",
        component: () => import("pages/Dashboard/Registrar.vue"),
        name: "List Pendaftar",
      },
      {
        path: "/dashboard/list-payment",
        component: () => import("pages/Dashboard/ListPayment.vue"),
        name: "List Pembayaran",
      },
      {
        path: "/dashboard/spp-payment",
        component: () => import("pages/Dashboard/PaymentSpp.vue"),
        name: "Pembayaran SPP",
      },
      {
        path: "/dashboard/payment",
        component: () => import("pages/Dashboard/Payment.vue"),
        name: "Pembayaran",
      },
      {
        path: "/dashboard/categories/:type",
        component: () => import("pages/Dashboard/Categories.vue"),
        name: "category",
      },
      {
        path: "/dashboard/registrar/:id",
        component: () => import("pages/Dashboard/RegDetail.vue"),
        name: "Detail Pendaftar",
      },
      {
        path: "/dashboard/registrar/:id/edit",
        component: () => import("pages/Dashboard/Register.vue"),
        name: "Edit Pendaftar",
      },
      {
        path: "/dashboard/students",
        component: () => import("pages/Dashboard/Students.vue"),
        name: "List siswa",
      },
      {
        path: "/dashboard/users",
        component: () => import("pages/Dashboard/Users.vue"),
      },
      {
        path: "/dashboard/bank-account",
        component: () => import("pages/Dashboard/BankAccount.vue"),
        name: "Akun Bank",
      },
      {
        path: "/dashboard/settings",
        component: () => import("pages/Dashboard/Settings.vue"),
        name: "Pengaturan Umum",
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
