export function getPassYear(back = 100) {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (v, i) => year - back + i + 1);
}
