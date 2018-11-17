// grab buttons and add event listeners
let incomeButton = document.querySelector('#addIncome');
let expenseButton = document.querySelector('#addExpense');
let columns = document.querySelector('#columns');
incomeButton.addEventListener('click', function(){
    // check if inputs have values
    let income = document.querySelector('#incomeName');
    let number = document.querySelector('#income');
    if(income.value && number.value){
        addIncome();
    } else{
        alert('Please add income first')
    }
});

expenseButton.addEventListener('click', function(){
    // check if inputs have values
    let expense = document.querySelector('#expenseName');
    let number = document.querySelector('#expense');
    if(expense.value && number.value){
        addExpense();
    } else{
        alert('Please add expense first')
    }
});

columns.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-trash-alt')) {
        deleteItem(e.target);
    }
});

// Display UI header
let displayTotal = document.querySelector('#total');
let displayIncome = document.querySelector('#displayIncome');
let displayExpense = document.querySelector('#displayExpense');

// Budget Account
let Budget = {
    total: 0,
    income: [],
    totalIncome: 0,
    expenses: [],
    totalExpenses: 0,
    updateTotal: function () {
        // update Total
        let total = this.totalIncome - this.totalExpenses;
        this.total = total;
        displayTotal.innerHTML = this.total;

    },
    addIncome: function () {
        let totalIncome = 0;
        this.income.forEach(function (current) {
            totalIncome += current;
        });
        this.totalIncome = totalIncome;
    },
    updateIncome: function (number) {
        //update income total
        this.income.push(number);
        this.addIncome();
        displayIncome.innerHTML = this.totalIncome;
    },

    deleteIncome: function () {
        this.addIncome();
        displayIncome.innerHTML = this.totalIncome;
    },
    addExpenses: function () {
        let totalExpenses = 0;
        this.expenses.forEach(function (current) {
            totalExpenses += current;
        });
        this.totalExpenses = totalExpenses;
    },
    updateExpenses: function (number) {
        //update expense total
        this.expenses.push(number);
        this.addExpenses();
        displayExpense.innerHTML = this.totalExpenses;
    },
    deleteExpense: function () {
        this.addExpenses();
        displayExpense.innerHTML = this.totalExpenses;
    }
};



function addIncome() {
    // Grab Inputs
    let incomeName = document.querySelector('#incomeName').value;
    let incomeNumber = parseInt(document.querySelector('#income').value);

    addTemplate(incomeName, incomeNumber, 'income');
    Budget.updateIncome(incomeNumber);
    Budget.updateTotal();
    addToLS(incomeName, incomeNumber, 'income');
    // clear fields after submit
    document.querySelector('#incomeName').value = '';
    document.querySelector('#income').value = '';
}

function addExpense() {
    // grab inputs
    let expenseName = document.querySelector('#expenseName').value;
    let expenseNumber = parseInt(document.querySelector('#expense').value);

    addTemplate(expenseName, expenseNumber, 'expense');
    Budget.updateExpenses(expenseNumber);
    Budget.updateTotal();
    addToLS(expenseName, expenseNumber, 'expense');
    // clear fields after submit
    document.querySelector('#expenseName').value = '';
    document.querySelector('#expense').value = '';
}


// add new income or expense to page
function addTemplate(name, number, type) {
    // create new income template
    let input = `<li class="inputFormat ${type}">
        <span class="templateName">${name}</span>
        <span class="templateNumber">$${number}</span>
        <span><i class="far fa-trash-alt"></i></span>
    </li>`;

    // add new template to page
    if (type === 'income') {
        let incomeDiv = document.querySelector('#incomeUL');
        incomeDiv.innerHTML += input;
    } else if (type === 'expense') {
        let incomeDiv = document.querySelector('#expenseUL');
        incomeDiv.innerHTML += input;
    } else {
        console.log('template conditional is not working');
    }
}

// Add income or expense to local storage
function addToLS(name, number, type) {
    // check if income arr is in local storage, if not then create it
    let incomeLS;
    if (localStorage.getItem('income') === null) {
        incomeLS = [];
    } else {
        incomeLS = JSON.parse(localStorage.getItem('income'));
    }

    let expenseLS;
    if (localStorage.getItem('expense') === null) {
        expenseLS = [];
    } else {
        expenseLS = JSON.parse(localStorage.getItem('expense'));
    }

    // add new item to storage
    let Item = {
        name: name,
        number: number,
        type: type
    }
    if (type === 'income') {
        incomeLS.push(Item);
        localStorage.setItem('income', JSON.stringify(incomeLS));
    } else if (type === 'expense') {
        expenseLS.push(Item);
        localStorage.setItem('expense', JSON.stringify(expenseLS));
    }
}

function retreiveFromLS() {
    // grab local storage
    let incomeLS;
    if (localStorage.getItem('income') === null) {
        return;
    } else {
        incomeLS = JSON.parse(localStorage.getItem('income'));
    }
    let incomeLI = '';
    // loop through array and objs and create template
    incomeLS.forEach(function (current) {
        incomeLI += `<li class="inputFormat ${current.type}">
        <span class="templateName">${current.name}</span>
        <span class="templateNumber">$${current.number}</span>
        <span><i class="far fa-trash-alt"></i></span>
    </li>`;

        Budget.updateIncome(current.number);
    });

    Budget.updateTotal();

    // add template to page
    document.querySelector('#incomeUL').innerHTML = incomeLI;

    let expenseLS;
    if (localStorage.getItem('expense') === null) {
        return;
    } else {
        expenseLS = JSON.parse(localStorage.getItem('expense'));
    }

    let expenseLI = '';
    // loop through array and objs and create template
    expenseLS.forEach(function (current) {
        expenseLI += `<li class="inputFormat">
        <span class="templateName">${current.name}</span>
        <span class="templateNumber">$${current.number}</span>
        <span><i class="far fa-trash-alt"></i></span>
    </li>`;
        Budget.updateExpenses(current.number);
    });

    // add template to page and update Total
    document.querySelector('#expenseUL').innerHTML = expenseLI;
    Budget.updateTotal();
}

retreiveFromLS();


// Delete Items from List 
function deleteItem(target) {
    // 1. Remove from local storage
    removeFromLS(target);

    // 2. Remove number from budget
    let li = target.parentElement.parentElement;
    let liNumber = li.children[1];
    // li number is $some_number, remove $ from infront and change string to number
    let liNumberFormatted = parseInt(liNumber.textContent.substring(1));
    if (li.classList.contains('income')) {
        Budget.income.forEach(function (current, index) {
            if (liNumberFormatted === current) {
                Budget.income.splice(index, 1);
            }
        });
        Budget.deleteIncome();
        Budget.updateTotal();
    } else if (li.classList.contains('expense')) {
        Budget.expenses.forEach(function (current, index) {
            if (liNumberFormatted === current) {
                Budget.expenses.splice(index, 1);
            }
        });
        Budget.deleteExpense();
        Budget.updateTotal();
    }

    // 3. Delete li
    li.remove();
}
// Delete items from Local storage
function removeFromLS(target) {
    let li = target.parentElement.parentElement;
    let liName = li.children[0];
    let liNumber = li.children[1];
    // li number is $some_number, remove $ from infront and change string to number
    let liNumberFormatted = parseInt(liNumber.textContent.substring(1));

    // LS for Income
    let incomeLS;
    if (localStorage.getItem('income') === null) {
        return;
    } else {
        incomeLS = JSON.parse(localStorage.getItem('income'));
    }

    incomeLS.forEach((current, index) => {
        if (current.name === liName.textContent && current.number === liNumberFormatted) {
            incomeLS.splice(index, 1);
        }
    });
    localStorage.setItem('income', JSON.stringify(incomeLS));

    // LS for Expenses
    let expenseLS;
    if (localStorage.getItem('expense') === null) {
        return;
    } else {
        expenseLS = JSON.parse(localStorage.getItem('expense'));
    }

    expenseLS.forEach((current, index) => {
        expenseLS.splice(index, 1);
    });

    localStorage.setItem('expense', JSON.stringify(expenseLS));

}

// end block wrapper