// dashboard.js

document.addEventListener('DOMContentLoaded', function() {

    const clickableCards = document.querySelectorAll('.vital-sign-card.clickable');
    clickableCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            window.location.href = target;
        });
    });

    // // Add Custom Info Card Functionality
    // const addCustomCard = document.querySelector('.add-custom-card');
    // addCustomCard.addEventListener('click', function() {
    //     // Placeholder for custom info card addition functionality
    //     alert('Custom info card addition feature coming soon!');
    // });


    // Heart Rate Chart
    // const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
    // new Chart(heartRateCtx, {
    //     type: 'line',
    //     data: {
    //         labels: ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'],
    //         datasets: [{
    //             label: 'Heart Rate',
    //             data: [68, 72, 70, 74, 72],
    //             borderColor: 'rgb(255, 99, 132)',
    //             tension: 0.1
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         scales: {
    //             y: {
    //                 beginAtZero: false
    //             }
    //         }
    //     }
    // });

    // Blood Pressure Chart
    const bloodPressureCtx = document.getElementById('bloodPressureChart').getContext('2d');
    new Chart(bloodPressureCtx, {
        type: 'line',
        data: {
            labels: ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'],
            datasets: [{
                label: 'Systolic',
                data: [118, 122, 120, 121, 120],
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
            }, {
                label: 'Diastolic',
                data: [78, 82, 80, 81, 80],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // Blood Sugar Chart
    // const bloodSugarCtx = document.getElementById('bloodSugarChart').getContext('2d');
    // new Chart(bloodSugarCtx, {
    //     type: 'line',
    //     data: {
    //         labels: ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'],
    //         datasets: [{
    //             label: 'Blood Sugar',
    //             data: [92, 98, 94, 97, 95],
    //             borderColor: 'rgb(255, 159, 64)',
    //             tension: 0.1
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         scales: {
    //             y: {
    //                 beginAtZero: false
    //             }
    //         }
    //     }
    // });

    // Add Custom Info Card Functionality
    const addCustomCard = document.querySelector('.add-custom-card');
    addCustomCard.addEventListener('click', function() {
        // Placeholder for custom info card addition functionality
        alert('Custom info card addition feature coming soon!');
    });
});
