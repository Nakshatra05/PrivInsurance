import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.classList.add("container");

  // Create the toggle container
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container");

  // Create Insurance button
  const toggleInsuranceBtn = document.createElement("button");
  toggleInsuranceBtn.textContent = "Insurance";
  toggleInsuranceBtn.classList.add("toggle-button");
  toggleInsuranceBtn.id = "toggleInsuranceBtn";

  // Create User button
  const toggleUserBtn = document.createElement("button");
  toggleUserBtn.textContent = "User";
  toggleUserBtn.classList.add("toggle-button");
  toggleUserBtn.id = "toggleUserBtn";

  // Append buttons to toggle container
  toggleContainer.appendChild(toggleInsuranceBtn);
  toggleContainer.appendChild(toggleUserBtn);

  // Create form container
  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  // Create the insurance form div
  const insuranceForm = document.createElement("div");
  insuranceForm.id = "insuranceForm";
  insuranceForm.classList.add("hidden");

  const insuranceTitle = document.createElement("h2");
  insuranceTitle.textContent = "Insurance Form";
  insuranceForm.appendChild(insuranceTitle);

  const insuranceFormElement = document.createElement("form");

  // Age: Min and Max inputs
  const ageMinInput = document.createElement("input");
  ageMinInput.type = "number";
  ageMinInput.placeholder = "Min Age";
  insuranceFormElement.appendChild(ageMinInput);

  const ageMaxInput = document.createElement("input");
  ageMaxInput.type = "number";
  ageMaxInput.placeholder = "Max Age";
  insuranceFormElement.appendChild(ageMaxInput);

  // Height: Min and Max inputs
  const heightMinInput = document.createElement("input");
  heightMinInput.type = "number";
  heightMinInput.placeholder = "Min Height (cm)";
  insuranceFormElement.appendChild(heightMinInput);

  const heightMaxInput = document.createElement("input");
  heightMaxInput.type = "number";
  heightMaxInput.placeholder = "Max Height (cm)";
  insuranceFormElement.appendChild(heightMaxInput);

  // Weight: Min and Max inputs
  const weightMinInput = document.createElement("input");
  weightMinInput.type = "number";
  weightMinInput.placeholder = "Min Weight (kg)";
  insuranceFormElement.appendChild(weightMinInput);

  const weightMaxInput = document.createElement("input");
  weightMaxInput.type = "number";
  weightMaxInput.placeholder = "Max Weight (kg)";
  insuranceFormElement.appendChild(weightMaxInput);

  // Submit Button
  const insuranceSubmitButton = document.createElement("button");
  insuranceSubmitButton.type = "submit";
  insuranceSubmitButton.textContent = "Submit Insurance";
  insuranceFormElement.appendChild(insuranceSubmitButton);

  insuranceForm.appendChild(insuranceFormElement);

  // Create the user form div
  const userForm = document.createElement("div");
  userForm.id = "userForm";
  userForm.classList.add("hidden");

  const userTitle = document.createElement("h2");
  userTitle.textContent = "User Form";
  userForm.appendChild(userTitle);

  const userFormElement = document.createElement("form");

  // Age Input
  const userAgeInput = document.createElement("input");
  userAgeInput.type = "number";
  userAgeInput.placeholder = "Age";
  userFormElement.appendChild(userAgeInput);

  // Height Input
  const userHeightInput = document.createElement("input");
  userHeightInput.type = "number";
  userHeightInput.placeholder = "Height (cm)";
  userFormElement.appendChild(userHeightInput);

  // Weight Input
  const userWeightInput = document.createElement("input");
  userWeightInput.type = "number";
  userWeightInput.placeholder = "Weight (kg)";
  userFormElement.appendChild(userWeightInput);

  // Submit Button
  const userSubmitButton = document.createElement("button");
  userSubmitButton.type = "submit";
  userSubmitButton.textContent = "Submit User";
  userFormElement.appendChild(userSubmitButton);

  // User form submit event
  userSubmitButton.addEventListener("click", async () => {
    const user_health_profile = {
      age: Number(userAgeInput.value),
      height: Number(userHeightInput.value),
      weight: Number(userWeightInput.value),
    };

    app.find_insurar_caller(user_health_profile);
    console.log("User data sent to algorithm", user_health_profile);
  });

  // Insurance form submit event
  insuranceSubmitButton.addEventListener("click", async () => {
    console.log("Insurance submit button clicked");

    const insurance_profiles = {
      min_age: Number(ageMinInput.value),
      max_age: Number(ageMaxInput.value),
      min_height: Number(heightMinInput.value),
      max_height: Number(heightMaxInput.value),
      min_weight: Number(weightMinInput.value),
      max_weight: Number(weightMaxInput.value),
    };
    console.log(insurance_profiles);

    app.feed_to_client_caller(insurance_profiles);
  });

  userForm.appendChild(userFormElement);

  // Append forms to the form container
  formContainer.appendChild(insuranceForm);
  formContainer.appendChild(userForm);

  // Append toggle container and form container to the main container
  container.appendChild(toggleContainer);
  container.appendChild(formContainer);

  // Append the container to the body
  document.body.appendChild(container);

  const app = new App();

  // Event listener to show Insurance form and hide User form
  toggleInsuranceBtn.addEventListener("click", async () => {
    insuranceForm.classList.remove("hidden");
    userForm.classList.add("hidden");
    await app.connect("1", "bob");
    app.listen_for_user();
  });

  // Event listener to show User form and hide Insurance form
  toggleUserBtn.addEventListener("click", async () => {
    insuranceForm.classList.add("hidden");
    userForm.classList.remove("hidden");
    await app.connect("0", "alice");
  });

  insuranceFormElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
  });

  userFormElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
  });

  // Add three customized insurance options
  // Add three customized insurance options
  const insuranceOptions = [
    {
      name: "Basic Health Plan",
      min_age: 18,
      max_age: 60,
      min_height: 150,
      max_height: 190,
      min_weight: 40,
      max_weight: 100,
    },
    {
      name: "Premium Health Plan",
      min_age: 21,
      max_age: 65,
      min_height: 160,
      max_height: 200,
      min_weight: 50,
      max_weight: 120,
    },
    {
      name: "Family Health Plan",
      min_age: 30,
      max_age: 70,
      min_height: 155,
      max_height: 185,
      min_weight: 45,
      max_weight: 110,
    },
  ];

  // Create buttons for each insurance plan
  insuranceOptions.forEach((option) => {
    const insuranceOptionBtn = document.createElement("button");
    insuranceOptionBtn.textContent = option.name;
    insuranceOptionBtn.classList.add("insurance-option-button");

    insuranceOptionBtn.addEventListener("click", () => {
      ageMinInput.value = option.min_age.toString();
      ageMaxInput.value = option.max_age.toString();
      heightMinInput.value = option.min_height.toString();
      heightMaxInput.value = option.max_height.toString();
      weightMinInput.value = option.min_weight.toString();
      weightMaxInput.value = option.max_weight.toString();
    });

    insuranceForm.appendChild(insuranceOptionBtn);
  });
});
