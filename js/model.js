let data = {
  selectedProgram: 0.23,
  programs: {
    base: 0.23,
    it: 0.06,
    gov: 0.06,
    zero: 0.26,
  },
};

function getData() {
  return { ...data };
}

function setData(newData) {
  data = {
    ...data,
    ...newData,
  };
}

export { getData, setData };
