//  element selections
const transactionsEl = document.querySelector(".transactions");
const balanceNumberEl = document.querySelector(".balance-number");
const numberIncomeEl = document.querySelector(".number--income");
const numberExpensesEl = document.querySelector(".number--expenses");
const formEl = document.querySelector(".form");
const inputDescriptionEl = document.querySelector(".input--description");
const inputAmountEl = document.querySelector(".input--amount");

// Keywords for income
const incomeKeywords = [
  "salary","bonus","income","sale","profit","Overtime Pay","Business Income","Interest","Dividends","Capital Gains","Property Rental","pension","investment returns","stipend","commission","consulting services","rental income","business income","Freelance Income","project",];
  
// Keywords for  expenses
const expenseKeywords = ["rent","groceries","expense","bill","purchase","taxes","fuel","insurance","public Transport","dining Out","medical Insurance","tuition Fees","books and Supplies","subscriptions","credit Card Payments","loans","home Insurance","life Insurance","emi","recharge",];

// Function to handle form submission
const submitHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  // get input values
  const description = inputDescriptionEl.value.toLowerCase();
  const amount = +inputAmountEl.value;

  // Check if the description is empty
  if (!description) {
    alert("Please enter the description.");
    return;
  }

  // Check if the amount is missing or invalid
  if (isNaN(amount) || amount === 0) {
    alert("Please enter a valid amount.");
    return;
  }

  // Determine if the transaction is income or expense based on description keywords
  let transactionType;
  if (incomeKeywords.some((keyword) => description.includes(keyword))) {
    transactionType = "income";
  } else if (expenseKeywords.some((keyword) => description.includes(keyword))) {
    transactionType = "expense";
  } else {
    alert("Please enter the valid inputs");
    return;
  }

  // create transaction item HTML
  const transactionItemHTML = `
    <li class="transaction transaction--${transactionType}">
      <span class="transaction__text">${description}</span>
      <span class="transaction__amount">${amount}</span>
      <button class="transaction__btn">X</button>
    </li>
  `;

  // insert new HTML
  transactionsEl.insertAdjacentHTML("beforeend", transactionItemHTML);

  // clear form inputs
  inputDescriptionEl.value = "";
  inputAmountEl.value = "";

  // unfocus (blur) form inputs
  inputDescriptionEl.blur();
  inputAmountEl.blur();

  // Update income or expenses based on removed transaction type
  if (transactionType === "income") {
    const currentIncome = +numberIncomeEl.textContent;
    const updatedIncome = currentIncome + amount;
    numberIncomeEl.textContent = updatedIncome;
  } else {
    const currentExpenses = +numberExpensesEl.textContent;
    const updatedExpenses = currentExpenses + amount;
    numberExpensesEl.textContent = updatedExpenses;
  }

  // update balance
  const income = +numberIncomeEl.textContent;
  const expenses = +numberExpensesEl.textContent;
  const updatedBalance = income - expenses;
  balanceNumberEl.textContent = updatedBalance;

  // Change balance color based on whether it's negative or not
  if (updatedBalance < 0) {
    balanceNumberEl.classList.add("red-balance");
    balanceNumberEl.classList.remove("black");
  } else {
    balanceNumberEl.classList.add("black");
    balanceNumberEl.classList.remove("red-balance");
  }
};

// Add event listener for form submission
formEl.addEventListener("submit", submitHandler);

// Function to handle clicks on transaction items
const clickHandler = (event) => {
  if (event.target.classList.contains("transaction__btn")) {
    // remove transaction item visually
    const clickedEl = event.target.parentNode;
    clickedEl.remove();

    // Get amount and description from the removed transaction item
    const amountEl = clickedEl.querySelector(".transaction__amount");
    const amount = parseFloat(amountEl.textContent.replace(/[^\d.-]/g, ""));
    const description = clickedEl
      .querySelector(".transaction__text")
      .textContent.toLowerCase();

    // Determine if the transaction was income or expense based on description keywords
    let transactionType;
    if (incomeKeywords.some((keyword) => description.includes(keyword))) {
      transactionType = "income";
    } else if (
      expenseKeywords.some((keyword) => description.includes(keyword))
    ) {
      transactionType = "expense";
    }

    // Update income or expenses based on removed transaction type
    if (transactionType === "income") {
      const currentIncome = +numberIncomeEl.textContent;
      const updatedIncome = currentIncome - amount;
      numberIncomeEl.textContent = updatedIncome;
    } else {
      const currentExpenses = +numberExpensesEl.textContent;
      const updatedExpenses = currentExpenses - amount;
      numberExpensesEl.textContent = updatedExpenses;
    }

    // update balance
    const income = +numberIncomeEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    const updatedBalance = income - expenses;
    balanceNumberEl.textContent = updatedBalance;

    // Change balance color based on whether it's negative or not
    if (updatedBalance < 0) {
      balanceNumberEl.classList.add("red-balance");
      balanceNumberEl.classList.remove("black");
    } else {
      balanceNumberEl.classList.add("black");
      balanceNumberEl.classList.remove("red-balance");
    }
  }
};

// Add event listener for clicks on transaction items
transactionsEl.addEventListener("click", clickHandler);
