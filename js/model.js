let data = {
  selectedProgram: 0.23,
  cost: 12000000,
  minPrice: 375000,
  maxPrice: 100000000,
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
  console.log("New data", newData);
  if (newData.onUpdate === "inputCost") {
    // price update
    if (newData.cost < data.minPrice) newData.cost = data.minPrice;
    if (newData.cost > data.maxPrice) newData.cost = data.maxPrice;
  }

  data = {
    ...data,
    ...newData,
  };

  results = {
    rate: data.selectedProgram,
  };
}

export { getData, setData, getResults };
