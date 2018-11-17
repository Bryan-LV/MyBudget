var ctx = document.getElementById('myChart').getContext('2d');

var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [Budget.totalIncome, Budget.totalExpenses],
            backgroundColor: ['rgb(69, 145, 49)','rgb(215, 22, 22)']
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Income',
            'Expenses'
        ]
    }
});