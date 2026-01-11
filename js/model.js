let data = {
  selectedProgram: 0.23,
  programs: {
    base: 0.23,
    it: 0.06,
    gov: 0.06,
    zero: 0.26,
  },
};

let results = {
  rate: data.selectedProgram,
};

function getData() {
  return { ...data };
}

function getResults() {
  return { ...results };
}

function setData(newData) {
  data = {
    ...data,
    ...newData,
  };

  results = {
    rate: data.selectedProgram,
  };
}

export { getData, setData, getResults };
