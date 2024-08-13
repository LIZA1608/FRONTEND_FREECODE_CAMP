document.addEventListener("DOMContentLoaded", () => {
  const numberInput = document.getElementById("number-input");
  const convertBtn = document.getElementById("convert-btn");
  const result = document.getElementById("result");
  const animationContainer = document.getElementById("animation-container");

  const generateAnimationData = (input) => {
    const animationData = [];
    let currentVal = input;
 const binaryResult = decimalToBinary(input);

    // Generate animation data
    while (currentVal > 0) {
      const nextVal = Math.floor(currentVal / 2);
      const remainder = currentVal % 2;

      const message = `Binary: ${decimalToBinary(currentVal)} and gives that value to the stack below. Then it pops off the stack.`;

      animationData.unshift({
        inputVal: currentVal, // Place the data in reverse order
        msg: message,
      });

      currentVal = nextVal;
    }

    return animationData;
  };

  const decimalToBinary = (input) => {
    if (input === 0 || input === 1) {
      return String(input);
    } else {
      return decimalToBinary(Math.floor(input / 2)) + (input % 2);
    }
  };

  const showAnimation = (inputVal) => {
    result.innerText = "Call Stack Animation";
    animationContainer.innerHTML = ""; // Clear previous animation

    const animationData = generateAnimationData(inputVal);

    // Display the stack frames in the correct order
    animationData.reverse().forEach((obj, index) => {
      const addElDelay = index * 1000; // Delay for adding elements
      setTimeout(() => {
        animationContainer.innerHTML += `
          <p id="step-${obj.inputVal}" class="animation-frame">
            decimalToBinary(${obj.inputVal})
          </p>
        `;
      }, addElDelay);
    });

    // Process the stack frames in reverse order
    animationData.reverse().forEach((obj, index) => {
      const showMsgDelay = (index + 1) * 2000; // Delay for showing messages
      const removeElDelay = showMsgDelay + 2000; // Delay for removing elements

      setTimeout(() => {
        document.getElementById(`step-${obj.inputVal}`).textContent = obj.msg;
      }, showMsgDelay);

      setTimeout(() => {
        document.getElementById(`step-${obj.inputVal}`).remove();
      }, removeElDelay);
    });

    // Display the final result after all steps are completed
    const totalDelay = animationData.length * 2000 + 2000; // Adjust total delay for the final result
    setTimeout(() => {
      result.textContent = `${decimalToBinary(inputVal)}`;
    }, totalDelay);
  };

  const checkUserInput = () => {
    const inputInt = parseInt(numberInput.value);

    if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
      alert("Please provide a decimal number greater than or equal to 0");
      return;
    }

    showAnimation(inputInt);

    numberInput.value = "";
  };

  convertBtn.addEventListener("click", checkUserInput);

  numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkUserInput();
    }
  });
});

