import * as Model from "./model.js";
import updateResultsView from "./view/updateResultsView.js";
import programs from "./view/radioPrograms.js";
import { updateMinPercents } from "./view/utils.js";
import costInput from "./view/costInput.js";
import costRange from "./view/costRange.js";
import paymentInput from "./view/paymentInput.js";
import paymentRange from "./view/paymentRange.js";
import termInput from "./view/termInput.js";
import termRange from "./view/termRange.js";

window.onload = function () {
  const getData = Model.getData;

  // Init programs
  programs(getData);

  // Init costInput and costRange
  const cleaveCost = costInput(getData);
  const sliderCost = costRange(getData);

  // Init paymentInput and paymentRange
  const cleavePayment = paymentInput(getData);
  const sliderPayment = paymentRange(getData);

  // Init termInput and termRange
  const cleaveTerm = termInput(getData);
  const sliderTerm = termRange(getData);

  // Starting result
  Model.setData({});
  const results = Model.getResults();
  updateResultsView(results);

  document.addEventListener("updateForm", (e) => {
    Model.setData(e.detail);

    const data = Model.getData();
    const results = Model.getResults();

    // Update all form view based on model
    updateFormAndSliders(data);

    // Update results block
    updateResultsView(results);
  });

  function updateFormAndSliders(data) {
    // Radio buttons
    if (data.onUpdate === "radioProgram") {
      updateMinPercents(data);

      // Payment slider
      sliderPayment.noUiSlider.updateOptions({
        range: {
          min: data.minPaymentPercents * 100,
          max: data.maxPaymentPercents * 100,
        },
      });
    }

    // costInput
    if (data.onUpdate !== "inputCost") {
      cleaveCost.setRawValue(data.cost);
    }

    // costSlider
    if (data.onUpdate !== "costSlider") {
      sliderCost.noUiSlider.set(data.cost);
    }

    // paymentInput
    if (data.onUpdate !== "inputPayment") {
      cleavePayment.setRawValue(data.payment);
    }

    // paymentSlider
    if (data.onUpdate !== "paymentSlider") {
      sliderPayment.noUiSlider.set(data.paymentPercents * 100);
    }

    // termInput
    if (data.onUpdate !== "inputTerm") {
      cleaveTerm.setRawValue(data.term);
    }

    // termSlider
    if (data.onUpdate !== "termSlider") {
      sliderTerm.noUiSlider.set(data.term);
    }
  }

  // Order form
  const openFormButton = document.querySelector("#openFormBtn");
  const orderForm = document.querySelector("#orderForm");
  const submitFormButton = document.querySelector("#submitFormBtn");

  openFormButton.addEventListener("click", function () {
    orderForm.classList.remove("none");
    openFormButton.classList.add("none");
  });

  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collecting data from the form before disable
    const formData = new FormData(orderForm);

    // Disable for form elements
    submitFormButton.setAttribute("disabled", true);
    submitFormButton.innerText = "Заявка отправляется...";

    orderForm.querySelectorAll("input").forEach(function (input) {
      input.setAttribute("disabled", true);
    });

    fetchData();

    async function fetchData() {
      const data = Model.getData();
      const results = Model.getResults();

      let url = checkOnUrl(document.location.href);
      function checkOnUrl(url) {
        let urlArrayDot = url.split(".");
        if (urlArrayDot[urlArrayDot.length - 1] === "html") {
          urlArrayDot.pop();
          let newUrl = urlArrayDot.join(".");
          let urlArraySlash = newUrl.split("/");
          urlArraySlash.pop();
          newUrl = urlArraySlash.join("/") + "/";
          return newUrl;
        }
        return url;
      }

      const response = await fetch(url + "mail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          form: {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
          },
          data,
          results,
        }),
      });

      const result = await response.text();
      console.log(result);

      submitFormButton.removeAttribute("disabled", true);
      submitFormButton.innerText = "Оформить заявку";

      orderForm.querySelectorAll("input").forEach((input) => {
        input.removeAttribute("disabled", true);
      });

      // Clearing form fields
      orderForm.reset();
      orderForm.classList.add("none");

      // Show success or error message
      if (result === "SUCCESS") {
        document.getElementById("success").classList.remove("none");
      } else {
        document.getElementById("error").classList.remove("none");
      }
    }
  });
};
