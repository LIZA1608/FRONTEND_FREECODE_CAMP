document.addEventListener("DOMContentLoaded", () => {
  const numberInput = document.getElementById("number-input");
  const convertBtn = document.getElementById("convert-btn");
  const result = document.getElementById("result");
  const animationContainer = document.getElementById("animation-container");

  const decimalToBinary = (input) => {
    if (input === 0 || input === 1) {
      return String(input);
    } else {
      return decimalToBinary(Math.floor(input / 2)) + (input % 2);
    }
  };

  const generateAnimationData = (input) => {
    const animationData = [];
    let currentVal = input;

    // Generating animation data
    while (currentVal > 1) {
      const nextVal = Math.floor(currentVal / 2);
      const message = `Binary: ${decimalToBinary(currentVal)} and gives that value to the stack below. Then it pops off the stack.`;

      animationData.push({
        inputVal: currentVal,
        msg: message,
      });

      currentVal = nextVal;
    }

    // Handle the base case explicitly
    animationData.push({
      inputVal: 1,
      msg: `Binary: 1 is the base case and is returned directly.`,
    });

    return animationData;
  };

  const showAnimation = (inputVal) => {
    result.innerText = "Call Stack Animation";
    animationContainer.innerHTML = "";

    const animationData = generateAnimationData(inputVal);

    animationData.forEach((obj, index) => {
      const addElDelay = index * 1000;
      setTimeout(() => {
        animationContainer.innerHTML += `
          <p id="step-${obj.inputVal}" class="animation-frame">
            decimalToBinary(${obj.inputVal})
          </p>
        `;
      }, addElDelay);
    });

    animationData.reverse().forEach((obj, index) => {
      const showMsgDelay = (index + 1) * 3000;
      const removeElDelay = showMsgDelay + 2000;

      setTimeout(() => {
        const element = document.getElementById(`step-${obj.inputVal}`);
        if (element) {
          element.textContent = obj.msg;
        }
      }, showMsgDelay);

      setTimeout(() => {
        const element = document.getElementById(`step-${obj.inputVal}`);
        if (element) {
          element.remove();
        }
      }, removeElDelay);
    });

    const totalDelay = animationData.length * 2000 + 2000;
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

document.getElementById('backButton').addEventListener('click', function() {
  window.history.back();
});
