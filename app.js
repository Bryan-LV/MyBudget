
// grab buttons and add event listeners
let incomeButton = document.querySelector('#addIncome');
let expenseButton = document.querySelector('#addExpense');
incomeButton.addEventListener('click', addIncome);
expenseButton.addEventListener('click',addExpense);


// Display UI header
let displayTotal = document.querySelector('#total');
let displayIncome = document.querySelector('#displayIncome');
let displayExpense = document.querySelector('#displayExpense');

// Budget Account
let Budget = {
    total: 0,
    income: [],
    totalIncome: 0,
    expenses:[],
    totalExpenses: 0,
    updateTotal: function(){
        // update Total
        let total = this.totalIncome - this.totalExpenses;
        this.total = total;
        displayTotal.innerHTML = this.total;

    },
    addIncome: function () {
        let totalIncome = 0;
        this.income.forEach(function(current){
            totalIncome += current;
        });
        this.totalIncome = totalIncome;  
    },
    updateIncome: function(number){
        //update income total
        this.income.push(number);
        this.addIncome();
        displayIncome.innerHTML = this.totalIncome;
    },
    addExpenses: function() {
        let totalExpenses = 0;
        this.expenses.forEach(function(current){
            totalExpenses += current;
        });
        this.totalExpenses = totalExpenses;
    },
    updateExpenses:function(number){
        //update expense total
        this.expenses.push(number);
        this.addExpenses();
        displayExpense.innerHTML = this.totalExpenses;
    }
};



function addIncome() {
    // Grab Inputs
    let incomeName = document.querySelector('#incomeName').value;
    let incomeNumber = parseInt(document.querySelector('#income').value);

    addTemplate(incomeName,incomeNumber,'income');
    Budget.updateIncome(incomeNumber);
    Budget.updateTotal();
    addToLS(incomeName,incomeNumber,'income');
}

function addExpense (){
    // grab inputs
    let expenseName = document.querySelector('#expenseName').value;
    let expenseNumber = parseInt(document.querySelector('#expense').value);

    addTemplate(expenseName,expenseNumber,'expense');
    Budget.updateExpenses(expenseNumber);
    Budget.updateTotal();
    addToLS(expenseName,expenseNumber,'expense');
}

function addTemplate(name,number,type){
    // create new income template
    let input = `<li class="inputFormat">
        <span>${name}</span>
        <span>$${number}</span>
        <span><i class="far fa-trash-alt"></i></span>
    </li>`;
    
    // add new template to page
    if(type === 'income'){
    let incomeDiv = document.querySelector('#incomeUL');
    incomeDiv.innerHTML += input;
    } else if (type === 'expense'){
    let incomeDiv = document.querySelector('#expenseUL');
    incomeDiv.innerHTML += input;
    }
    else{
        console.log('template conditional is not working');
    }
}

function addToLS (name,number,type){
    // check if income arr is in local storage, if not then create it
    let incomeLS;
    if(localStorage.getItem('income') === null){
        incomeLS = [];
    } else{
        incomeLS = JSON.parse(localStorage.getItem('income'));
    }

    let expenseLS;
    if(localStorage.getItem('expense') === null){
        expenseLS = [];
    } else{
        expenseLS = JSON.parse(localStorage.getItem('expense'));
    }

    // add new item to storage
    let Item = {
        name: name,
        number: number,
        type:type
    }
    if(type === 'income'){   
        incomeLS.push(Item);
        localStorage.setItem('income',JSON.stringify(incomeLS));
    } else if( type === 'expense'){
        expenseLS.push(Item);
        localStorage.setItem('expense',JSON.stringify(expenseLS));
    }
    //put it back


}

// end block wrapper


