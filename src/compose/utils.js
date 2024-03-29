import collect from "collect.js";
import { api } from "src/boot/axios";

export function getPassYear(back = 100) {
  const year = new Date().getFullYear();
  const result = Array.from({ length: back }, (v, i) => year - back + i + 1);
  return collect(result).sortByDesc().toArray();
}

export const status = [
  "Belum Diverifikasi",
  "Lulus Berkas",
  "Tidak Lulus",
];

export function getSemester(level = "SMP") {
  if (level === "SMP") return ["VII", "VIII", "IX"];
  return ["X", "XI", "XII"];
}

export const price = (value, hide = false) => {
  let val = (value / 1).toFixed(hide ? 0 : 2).replace(".", ",");
  return (
    (hide ? "" : "Rp.") + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
};
export function usePeriode(semester = 6) {
  const attendances = ["Izin", "Sakit", "Alpha"].map((x) => {
    const classes = {};
    for (let i = 0; i < semester / 2; i++) {
      classes[`${i + 1}`] = {
        1: "",
        2: "",
      };
    }
    return {
      type: x,
      classes,
    };
  });
  const lesson_values = ["Bhs Inggris", "IPA", "IPS", "Matematika"].map((x) => {
    const classes = {};
    for (let i = 0; i < semester / 2; i++) {
      classes[`${i + 1}`] = {
        1: {
          kkm: "",
          nilai: "",
        },
        2: {
          kkm: "",
          nilai: "",
        },
      };
    }
    return {
      type: x,
      classes,
    };
  });
  return {
    attendances,
    lesson_values,
  };
}

export const usePaginate = (
  to,
  ref,
  page,
  loading,
  data,
  link,
  params = {}
) => {
  const lastIndex = data.value.length - 1;
  const { next, last } = page.value;
  if (!loading.value && next <= last && to === lastIndex) {
    loading.value = true;
    api
      .get(link, {
        params: {
          page: page.value.next,
          ...params,
        },
      })
      .then((res) => {
        page.value.next++;
        data.value.push(...res.data.data);
        ref.refresh();
        loading.value = false;
      });
  }
};
