import updateModel from "./../utils/updateModel.js";

function init(getData) {
  const data = getData();
  const input = document.querySelector("#input-term");

  const settings = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  const cleaveInput = new Cleave(input, settings);
  cleaveInput.setRawValue(data.term);

  input.addEventListener("input", function () {
    const value = +cleaveInput.getRawValue();

    // checking the min and max price
    if (value < data.minYear || value > data.maxYear) {
      input.closest(".param__details").classList.add("param__details--error");
    }

    if (value >= data.minYear && value <= data.maxYear) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
    }

    // update model
    updateModel(input, { term: value, onUpdate: "inputTerm" });
  });

  // price reset
  input.addEventListener("change", function () {
    const value = +cleaveInput.getRawValue();

    if (value > data.maxYear) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(data.maxYear);
    }

    if (value < data.minYear) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      cleaveInput.setRawValue(data.minYear);
    }

    // update model
    updateModel(input, {
      term: +cleaveInput.getRawValue(),
      onUpdate: "inputTerm",
    });
  });

  return cleaveInput;
}

export default init;
