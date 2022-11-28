class UI {
  constructor() {
    this.budgetFeedback = document.querySelector("#budget-feedback");
    this.expenseFeedback = document.querySelector("#expense-feedback");
    this.budgetForm = document.querySelector("#budget-form");
    this.budgetInput = document.querySelector("#budget-input");
    this.budgetAmount = document.querySelector("#budget-amount");
    this.expenseAmount = document.querySelector("#expense-amount");
    this.balance = document.querySelector("#balance");
    this.balanceAmount = document.querySelector("#balance-amount");
    this.expenseForm = document.querySelector("#expense-form");
    this.expenseInput = document.querySelector("#expense-input");
    this.expenseAmountInput = document.querySelector("#expense-amount-input");
    this.expenseList = document.querySelector("#expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  submitBudgetForm() {
    let value = this.budgetInput.value;

    // Lets validate our form values
    if (value === "" || value < 0) {
      this.budgetFeedback.classList.remove("hidden");
      this.budgetFeedback.innerHTML = `<p> Value cannot be empty or negative </p>`;

      setTimeout(() => {
        this.budgetFeedback.classList.add("hidden");
      }, 2000);
    } else {
      this.budgetAmount.textContent = value;
      this.expenseAmount.textContent = 0;
      this.budgetInput.value = "";

      // Show balance
      this.showBalance();
    }
  }

  // showBalance
  showBalance() {
    let expense = this.totalExpense();
    let totalBalance = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = totalBalance;
  }

  totalExpense() {
    let total = 0;

    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function (acc, curr) {
        acc += curr.amount;

        return acc;
      }, 0);

      this.expenseAmount.textContent = total;
    }
    this.expenseAmount.textContent = total;

    return total;
  }

  // submitExpenseForm
  submitExpenseForm() {
    let expenseText = this.expenseInput.value;
    let expenseAmount = this.expenseAmountInput.value;

    this.expenseInput.value = "";
    this.expenseAmountInput.value = "";
    let amount = parseInt(expenseAmount);

    const expense = {
      id: this.itemID,
      title: expenseText,
      amount: amount,
    };

    this.itemID++;
    this.itemList.push(expense);

    this.addExpense(expense);
    this.showBalance();
  }

  // Add expense
  addExpense(expense) {
    // create a new div
    const div = document.createElement("div");
    div.setAttribute("data-id", `${expense.id}`);
    div.classList.add(
      "w-full",
      "px-3",
      "py-2",
      "border",
      "bg-white",
      "rounded-md",
      "shadow-inner",
      "flex",
      "items-center",
      "justify-between",
      "mt-4"
    );

    div.innerHTML = `

    <div class="w-52 md:w-60 flex justify-between text-red-500 font-semibold">
    <p class="inline">${expense.title}</p>
    <p class="inline-block pl-4">${expense.amount}</p>
   </div>

     <div id="${expense.id}" class="flex space-x-1 md:space-x-4">
        <a href="#" id="${expense.id}" class="edit-expense text-blue-500 transform hover:scale-110 duration-300 edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 edit">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>

          </a>
          <a href="#" id="${expense.id}" class="delete-expense text-red-500 transform hover:scale-110 duration-300 delete">
          <svg class="w-6 h-6 delete" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>

          </a>
     </div>
    `;

    this.expenseList.appendChild(div);
  }

  editExpense(element) {
    const id = parseInt(element.id);
    const parent = element.parentElement.parentElement;

    // remove item from the Dom
    this.expenseList.removeChild(parent);

    // get single expense
    let singleExpense = this.itemList.filter((item) => {
      return item.id === id;
    });

    this.expenseInput.value = singleExpense[0].title;
    this.expenseAmountInput.value = singleExpense[0].amount;

    // get remaining expense that does not !== to the Id
    let tempExpense = this.itemList.filter((item) => {
      return item.id !== id;
    });

    // reassign the item list to the new list
    this.itemList = tempExpense;
    // show balance
    this.showBalance();
  }

  deleteExpense(element) {
    const id = parseInt(element.id);
    const parent = element.parentElement.parentElement;

    // remove item from the Dom
    this.expenseList.removeChild(parent);

    // get remaining expense that does not !== to the Id
    let tempExpense = this.itemList.filter((item) => {
      return item.id !== id;
    });

    // reassign the item list to the new list
    this.itemList = tempExpense;
    // show balance
    this.showBalance();
  }
}
function eventListeners() {
  // get events element
  const budgetForm = document.querySelector("#budget-form");
  const expenseForm = document.querySelector("#expense-form");
  const expenseList = document.querySelector("#expense-list");

  // Initialize a new instanse of the UI class
  const ui = new UI();

  // add event listeners to our event Elements
  budgetForm.addEventListener("submit", function (e) {
    e.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    ui.submitExpenseForm();
  });

  expenseList.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains("edit-expense")) {
      //  run function
      ui.editExpense(e.target.parentElement);
    } else if (e.target.parentElement.classList.contains("delete-expense")) {
      ui.deleteExpense(e.target.parentElement)
      console.log(e.target.parentElement)
    }
  });
}

window.addEventListener("DOMContentLoaded", function () {
  // Trigger this function after the page loads
  eventListeners();
});
