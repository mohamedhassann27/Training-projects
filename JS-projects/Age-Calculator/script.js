const inputElements = document.querySelectorAll(".card__input");
const submitButton = document.querySelector(".card__button");
const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthdate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  const dayDiff = today.getDay - birthdate.getDay;
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};

const onclickHandler = () => {
  const yearElemnt = document.querySelector('.card__input[name="year"]');
  const monthElement = document.querySelector('.card__input[name="month"]');
  const dayElement = document.querySelector('.card__input[name="day"]');
  const resultElement = document.querySelector(".card__resultValue");
  resultElement.textContent = calculateAge(
    yearElemnt.value,
    monthElement.value,
    dayElement.value
  );
  console.log("you clicked me");
};
inputElements.forEach((item) => {
  item.addEventListener("keydown", (event) => {
    event.key === "Enter" && onclickHandler();
  });
});
submitButton.addEventListener("click", onclickHandler);
