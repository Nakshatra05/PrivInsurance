import App from "./App";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3000"); // Adjust to your server URL
document.addEventListener("DOMContentLoaded", () => {
  // Create container div
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
  // ageMinInput.required = true;
  insuranceFormElement.appendChild(ageMinInput);

  const ageMaxInput = document.createElement("input");
  ageMaxInput.type = "number";
  ageMaxInput.placeholder = "Max Age";
  // ageMaxInput.required = true;
  insuranceFormElement.appendChild(ageMaxInput);

  // Height: Min and Max inputs
  const heightMinInput = document.createElement("input");
  heightMinInput.type = "number";
  heightMinInput.placeholder = "Min Height (cm)";
  // heightMinInput.required = true;
  insuranceFormElement.appendChild(heightMinInput);

  const heightMaxInput = document.createElement("input");
  heightMaxInput.type = "number";
  heightMaxInput.placeholder = "Max Height (cm)";
  // heightMaxInput.required = true;
  insuranceFormElement.appendChild(heightMaxInput);

  // Weight: Min and Max inputs
  const weightMinInput = document.createElement("input");
  weightMinInput.type = "number";
  weightMinInput.placeholder = "Min Weight (kg)";
  // weightMinInput.required = true;
  insuranceFormElement.appendChild(weightMinInput);

  const weightMaxInput = document.createElement("input");
  weightMaxInput.type = "number";
  weightMaxInput.placeholder = "Max Weight (kg)";
  // weightMaxInput.required = true;
  insuranceFormElement.appendChild(weightMaxInput);

  // Gender: Dropdown
  const genderSelect = document.createElement("select");
  const genders = ["Male", "Female", "Other"];
  genders.forEach((gender) => {
    const option = document.createElement("option");
    option.value = gender;
    option.textContent = gender;
    genderSelect.appendChild(option);
  });
  insuranceFormElement.appendChild(genderSelect);

  // Blood Group: Dropdown
  const bloodGroupSelect = document.createElement("select");
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  bloodGroups.forEach((bloodGroup) => {
    const option = document.createElement("option");
    option.value = bloodGroup;
    option.textContent = bloodGroup;
    bloodGroupSelect.appendChild(option);
  });
  insuranceFormElement.appendChild(bloodGroupSelect);

  // Submit Button
  const insuranceSubmitButton = document.createElement("button");
  insuranceSubmitButton.type = "submit";
  insuranceSubmitButton.textContent = "Submit Insurance";
  insuranceFormElement.appendChild(insuranceSubmitButton);

  insuranceForm.appendChild(insuranceFormElement);

  // Create the insurance list
  const insuranceListDiv = document.createElement("div");
  insuranceListDiv.classList.add("insurance-list");

  const insuranceListTitle = document.createElement("h3");
  insuranceListTitle.textContent = "Insurance List";
  insuranceListDiv.appendChild(insuranceListTitle);

  const insuranceList = document.createElement("ul");
  const insuranceItems = ["Insurance 1", "Insurance 2", "Insurance 3"];
  insuranceItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    insuranceList.appendChild(listItem);
  });
  insuranceListDiv.appendChild(insuranceList);
  insuranceForm.appendChild(insuranceListDiv);

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
  // userAgeInput.required = true;
  userFormElement.appendChild(userAgeInput);

  // Height Input
  const userHeightInput = document.createElement("input");
  userHeightInput.type = "number";
  userHeightInput.placeholder = "Height (cm)";
  // userHeightInput.required = true;
  userFormElement.appendChild(userHeightInput);

  // Weight Input
  const userWeightInput = document.createElement("input");
  userWeightInput.type = "number";
  userWeightInput.placeholder = "Weight (kg)";
  // userWeightInput.required = true;
  userFormElement.appendChild(userWeightInput);

  // Gender: Dropdown
  const userGenderSelect = document.createElement("select");
  const userGenders = ["Male", "Female", "Other"];
  userGenders.forEach((gender) => {
    const option = document.createElement("option");
    option.value = gender;
    option.textContent = gender;
    userGenderSelect.appendChild(option);
  });
  userFormElement.appendChild(userGenderSelect);

  // Blood Group: Dropdown
  const userBloodGroupSelect = document.createElement("select");
  const userBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  userBloodGroups.forEach((bloodGroup) => {
    const option = document.createElement("option");
    option.value = bloodGroup;
    option.textContent = bloodGroup;
    userBloodGroupSelect.appendChild(option);
  });
  userFormElement.appendChild(userBloodGroupSelect);

  // Exercise Frequency: Dropdown
  const exerciseFrequencySelect = document.createElement("select");
  const exerciseFrequencies = ["Daily", "Weekly", "Monthly", "Rarely"];
  exerciseFrequencies.forEach((frequency) => {
    const option = document.createElement("option");
    option.value = frequency;
    option.textContent = frequency;
    exerciseFrequencySelect.appendChild(option);
  });
  userFormElement.appendChild(exerciseFrequencySelect);

  // Exercise Duration: Input (in minutes)
  const exerciseDurationInput = document.createElement("input");
  exerciseDurationInput.type = "number";
  exerciseDurationInput.placeholder = "Exercise Duration (min)";
  // exerciseDurationInput.required = true;
  userFormElement.appendChild(exerciseDurationInput);

  // Submit Button
  const userSubmitButton = document.createElement("button");
  userSubmitButton.type = "submit";
  userSubmitButton.textContent = "Submit User";
  userFormElement.appendChild(userSubmitButton);

  userSubmitButton.addEventListener("click", async () => {
    // trigger mpc call

    let user_health_profile = {
      age: 25,
      height: 175,
      weight: 70,
    };
    let final_res = await app.find_insurar(user_health_profile);
    console.log("final_res: ", final_res);
  });

  insuranceSubmitButton.addEventListener("click", async () => {
    console.log("insurance submit button clicked");

    let insurance_profiles = {
      min_age: 20,
      max_age: 30,
      min_height: 170,
      max_height: 180,
      min_weight: 60,
      max_weight: 80,
    };
    console.log("manuel feeding to client");

    app.feed_to_client(insurance_profiles);
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
    console.log("insurance button clicked");

    // insurance
    // connect
    insuranceForm.classList.remove("hidden");
    userForm.classList.add("hidden");
    await app.connect("1", "bob");
    console.log("connected");

    await app.listen_for_user();
  });

  // Event listener to show User form and hide Insurance form
  toggleUserBtn.addEventListener("click", async () => {
    // user
    // connect user
    insuranceForm.classList.add("hidden");
    userForm.classList.remove("hidden");
    await app.connect("0", "alice");
    app.listen_for_policy_no();
  });

  insuranceFormElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
  });

  // Event listener for Insurance Form submission
  /*
  insuranceFormElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const data = {
      minAge: Number(ageMinInput.value),
      maxAge: Number(ageMaxInput.value),
      minHeight: Number(heightMinInput.value),
      maxHeight: Number(heightMaxInput.value),
      minWeight: Number(weightMinInput.value),
      maxWeight: Number(weightMaxInput.value),
      gender: genderSelect.value,
      bloodGroup: bloodGroupSelect.value,
    };
    // socket.emit("submitInsuranceData", data);

    let resultDiv = document.getElementById("resultDiv");
    if (!resultDiv) {
      resultDiv = document.createElement("div");
      resultDiv.id = "resultDiv";
      userForm.appendChild(resultDiv);
    }

    resultDiv.innerHTML = `<p>Sending insurance data...</p>`;

    alert(`Insurance Form Submitted:
      Min Age: ${data.minAge}
      Max Age: ${data.maxAge}
      Min Height: ${data.minHeight} cm
      Max Height: ${data.maxHeight} cm
      Min Weight: ${data.minWeight} kg
      Max Weight: ${data.maxWeight} kg
      Gender: ${data.gender}
      Blood Group: ${data.bloodGroup}`);
  });
  */

  userFormElement.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission
  });

  // Event listener for User Form submission with `find_insurar`
  /*
  userFormElement.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    const data = {
      age: Number(userAgeInput.value),
      height: Number(userHeightInput.value),
      weight: Number(userWeightInput.value),
      gender: userGenderSelect.value,
      bloodGroup: userBloodGroupSelect.value,
      exerciseFrequency: exerciseFrequencySelect.value,
      exerciseDuration: Number(exerciseDurationInput.value),
    };
    // socket.emit("submitUserData", data);

    // resultDiv.innerHTML = `<p>Sending user data...</p>`;

    // Listen for the server response for user data
    // socket.on("userResponse", (response) => {
    //   let resultDiv = document.getElementById("resultDiv") as HTMLDivElement;
    //   resultDiv.innerHTML = `
    //   <h3>User Response:</h3>
    //   <p>${response}</p>
    // `;
    // });

    // Call the `find_insurar` function
    try {
      // Assuming `App` is your class
      const app = new App();
      const insurarResult = await app.find_insurar(data);

      // Dynamically display the result
      let resultDiv = document.getElementById("resultDiv");
      if (!resultDiv) {
        resultDiv = document.createElement("div");
        resultDiv.id = "resultDiv";
        userForm.appendChild(resultDiv);
      }

      resultDiv.innerHTML = `
          <h3>Insurance Recommendation:</h3>
          <p>${insurarResult}</p>
        `;
    } catch (error) {
      console.error("Error finding insurar:", error);
      alert(
        "An error occurred while processing your insurance recommendation.",
      );
    }

    alert(`User Form Submitted:
      Age: ${data.age}
      Height: ${data.height} cm
      Weight: ${data.weight} kg
      Gender: ${data.gender}
      Blood Group: ${data.bloodGroup}
      Exercise Frequency: ${data.exerciseFrequency}
      Exercise Duration: ${data.exerciseDuration} min`);
  });
  */
});
