document.addEventListener('DOMContentLoaded', function() {
    // Blood Pressure Chart
    new Chart(document.getElementById('bpChart'), {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Systolic',
          data: [120, 118, 122, 121, 119, 120, 118],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }, {
          label: 'Diastolic',
          data: [80, 79, 81, 80, 78, 79, 77],
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  
    // Step Count Chart
    new Chart(document.getElementById('stepChart'), {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Steps',
          data: [7500, 8200, 7800, 9000, 8500, 7000, 8800],
          backgroundColor: 'rgb(75, 192, 192)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  
    // Sleep Quality Chart
    new Chart(document.getElementById('sleepChart'), {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Hours of Sleep',
          data: [7, 6.5, 8, 7.5, 6, 8.5, 7],
          borderColor: 'rgb(153, 102, 255)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  
    // Medication Adherence Chart
    new Chart(document.getElementById('medicationChart'), {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Adherence',
          data: [100, 100, 100, 100, 100, 100, 100],
          backgroundColor: 'rgb(255, 159, 64)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  });