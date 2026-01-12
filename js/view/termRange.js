import updateModel from "./../utils/updateModel.js";

function init(getData) {
  const slider = document.querySelector("#slider-term");
  const data = getData();

  noUiSlider.create(slider, {
    start: data.term,
    connect: "lower",
    tooltips: true,
    step: 1,
    range: {
      min: data.minYear,
      max: data.maxYear,
    },
    format: wNumb({
      decimals: 0,
      thousand: " ",
      suffix: "",
    }),
  });

  slider.noUiSlider.on("slide", function () {
    let sliderValue = slider.noUiSlider.get();
    sliderValue = sliderValue.split(".")[0];
    sliderValue = parseInt(String(sliderValue).replace(/ /g, ""));

    updateModel(slider, { term: sliderValue, onUpdate: "termSlider" });
  });

  return slider;
}

export default init;
