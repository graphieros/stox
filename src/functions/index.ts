export default {
  toFrenchDate(time: string | number) {
    return new Date(time).toLocaleString("fr-FR");
  },
};
