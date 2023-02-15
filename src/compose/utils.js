import collect from "collect.js";

export function getPassYear(back = 100) {
  const year = new Date().getFullYear();
  const result = Array.from({ length: back }, (v, i) => year - back + i + 1);
  return collect(result).sortByDesc().toArray();
}
export function getSemester(level = "SMP") {
  if (level === "SMP") return ["VII", "VIII", "IX"];
  return ["X", "XI", "XII"];
}
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
  const lessons = ["Bhs Inggris", "IPA", "IPS", "Matematika"].map((x) => {
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
    lessons,
  };
}
