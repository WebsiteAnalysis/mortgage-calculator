let data = {
  selectedProgram: 0.23,
  cost: 12000000,
  minPrice: 375000,
  maxPrice: 100000000,
  minPaymentPercents: 0.2,
  maxPaymentPercents: 0.9,
  paymentPercents: 0.5,
  payment: 6000000,
  getMinPayment: function () {
    return this.cost * this.minPaymentPercents;
  },
  getMaxPayment: function () {
    return this.cost * this.maxPaymentPercents;
  },
  minYear: 1,
  maxYear: 30,
  term: 10,
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
  if (newData.onUpdate === "radioProgram") {
    if (newData.id === "zero-value") {
      data.minPaymentPercents = 0;
    } else {
      data.minPaymentPercents = 0.2;
    }
  }

  if (newData.onUpdate === "inputCost" || newData.onUpdate === "costSlider") {
    // Price update
    // If the cost is less than the min price
    if (newData.cost < data.minPrice) newData.cost = data.minPrice;

    // If the cost is greater than the max price
    if (newData.cost > data.maxPrice) newData.cost = data.maxPrice;

    // If the new cost is less than the down payment
    if (data.payment > data.getMaxPayment()) {
      data.payment = data.getMaxPayment();
    }

    // If the down payment amount is less than the allowable min payment
    if (data.payment < data.getMinPayment()) {
      data.payment = data.getMinPayment();
    }

    data.paymentPercents = (data.payment * 100) / newData.cost / 100;
  }

  if (newData.onUpdate === "inputPayment") {
    // Recalculate %
    newData.paymentPercents = (newData.payment * 100) / data.cost / 100;

    // If the percentage is more than 90%
    if (newData.paymentPercents > data.maxPaymentPercents) {
      newData.paymentPercents = data.maxPaymentPercents;
      newData.payment = data.cost * data.maxPaymentPercents;
    }

    // If the percentage is less than 90%
    if (newData.paymentPercents < data.minPaymentPercents) {
      newData.paymentPercents = data.minPaymentPercents;
      newData.payment = data.cost * data.minPaymentPercents;
    }
  }

  if (newData.onUpdate === "paymentSlider") {
    newData.paymentPercents = newData.paymentPercents / 100;
    data.payment = data.cost * newData.paymentPercents;
  }

  if (newData.onUpdate === "inputTerm") {
    if (newData.term > data.maxYear) {
      newData.term = data.maxYear;
    }

    if (newData.term < data.minYear) {
      newData.term = data.minYear;
    }
  }

  data = {
    ...data,
    ...newData,
  };

  // Mortgage calculation
  const months = data.term * 12;
  const totalAmount = data.cost - data.payment;
  const monthRate = data.selectedProgram / 12;
  const generalRate = (1 + monthRate) ** months;
  const monthPayment =
    (totalAmount * monthRate * generalRate) / (generalRate - 1);
  const overPayment = monthPayment * months - totalAmount;

  results = {
    rate: data.selectedProgram,
    totalAmount,
    monthPayment,
    overPayment,
  };
}

export { getData, setData, getResults };
