document.addEventListener('DOMContentLoaded', function() {
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const ctx = document.getElementById('dataChart').getContext('2d');

    // Simulated data
    const weightData = [69.8, 70.2, 70.5, 70.3, 70.5, 70.1, 70.5];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Create chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight (kg)',
                data: weightData,
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

    // Add device button click event
    addDeviceBtn.addEventListener('click', function() {
        alert('Add new device functionality will be implemented here.');
    });

    // Save settings button click event
    saveSettingsBtn.addEventListener('click', function() {
        const frequency = document.getElementById('dataFrequency').value;
        const notifications = document.getElementById('notifications').checked;
        const unitSystem = document.getElementById('unitSystem').value;
        
        alert(`Settings saved!\nFrequency: ${frequency} minutes\nNotifications: ${notifications ? 'Enabled' : 'Disabled'}\nUnit System: ${unitSystem}`);
    });

    // Toggle device status
    document.querySelectorAll('.switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const deviceName = this.closest('.device-item').querySelector('span').textContent;
            alert(`${deviceName} is now ${this.checked ? 'connected' : 'disconnected'}.`);
        });
    });
});