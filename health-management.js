// health-management.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const addMedicationBtn = document.getElementById('addMedicationBtn');
    const addHealthInfoBtn = document.getElementById('addHealthInfoBtn');
    const addMedicationModal = document.getElementById('addMedicationModal');
    const addHealthInfoModal = document.getElementById('addHealthInfoModal');
    const addMedicationForm = document.getElementById('addMedicationForm');
    const addHealthInfoForm = document.getElementById('addHealthInfoForm');
    const medicationList = document.getElementById('medicationList');
    const healthInfoList = document.getElementById('healthInfoList');
    const insightsList = document.getElementById('insightsList');
    const insightsInfographic = document.getElementById('insightsInfographic');

    let healthChart;

    // Open modals
    addMedicationBtn.addEventListener('click', () => addMedicationModal.style.display = 'block');
    addHealthInfoBtn.addEventListener('click', () => addHealthInfoModal.style.display = 'block');

    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            addMedicationModal.style.display = 'none';
            addHealthInfoModal.style.display = 'none';
        });
    });

    // Add medication
    addMedicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('medicationName').value;
        const dosage = document.getElementById('medicationDosage').value;
        const frequency = document.getElementById('medicationFrequency').value;
        
        const li = document.createElement('li');
        li.textContent = `${name} - ${dosage} - ${frequency}`;
        medicationList.appendChild(li);
        
        addMedicationModal.style.display = 'none';
        addMedicationForm.reset();
    });

    // Add health info
    addHealthInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const type = document.getElementById('healthInfoType').value;
        const value = document.getElementById('healthInfoValue').value;
        const date = new Date(document.getElementById('healthInfoDate').value).toLocaleString();
        
        const li = document.createElement('li');
        li.textContent = `${type}: ${value} - ${date}`;
        // healthInfoList.appendChild(li);
        
        addHealthInfoModal.style.display = 'none';
        addHealthInfoForm.reset();
        
        updateHealthChart();
        generateInsights();
    });

    // Function to create SVG circle with percentage
    function createCirclePercentage(percentage, color) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "60");
        svg.setAttribute("height", "60");
        svg.setAttribute("viewBox", "0 0 36 36");
        svg.setAttribute("class", "infographic-icon");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#eee");
        path.setAttribute("stroke-width", "3");

        const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const arcLength = percentage / 100 * 100;
        arc.setAttribute("d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831");
        arc.setAttribute("fill", "none");
        arc.setAttribute("stroke", color);
        arc.setAttribute("stroke-width", "3");
        arc.setAttribute("stroke-dasharray", `${arcLength}, 100`);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "18");
        text.setAttribute("y", "20.35");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "12");
        text.setAttribute("fill", color);
        text.textContent = `${percentage}%`;

        svg.appendChild(path);
        svg.appendChild(arc);
        svg.appendChild(text);

        return svg;
    }

    // Function to create infographic item
    function createInfographicItem(icon, value, label) {
        const item = document.createElement('div');
        item.className = 'infographic-item';
        
        item.appendChild(icon);
        
        const valueElement = document.createElement('div');
        valueElement.className = 'infographic-value';
        valueElement.textContent = value;
        item.appendChild(valueElement);
        
        const labelElement = document.createElement('div');
        labelElement.className = 'infographic-label';
        labelElement.textContent = label;
        item.appendChild(labelElement);
        
        return item;
    }

    // Function to update infographics
    function updateInfographics(glucosePercentage, medicationPercentage, exercisePercentage) {
        insightsInfographic.innerHTML = ''; // Clear existing infographics
        
        const glucoseIcon = createCirclePercentage(glucosePercentage, '#4CAF50');
        const glucoseItem = createInfographicItem(glucoseIcon, `${glucosePercentage}%`, 'Glucose In Range');
        insightsInfographic.appendChild(glucoseItem);
        
        const medicationIcon = createCirclePercentage(medicationPercentage, '#2196F3');
        const medicationItem = createInfographicItem(medicationIcon, `${medicationPercentage}%`, 'Medication Adherence');
        insightsInfographic.appendChild(medicationItem);
        
        const exerciseIcon = createCirclePercentage(exercisePercentage, '#FFC107');
        const exerciseItem = createInfographicItem(exerciseIcon, `${exercisePercentage}%`, 'Exercise Goal');
        insightsInfographic.appendChild(exerciseItem);
    }

    // Function to initialize the health chart
    function initializeHealthChart() {
        console.log('Initializing health chart');
        const ctx = document.getElementById('healthChart');
        if (!ctx) {
            console.error('Cannot find element with id "healthChart"');
            return;
        }
        healthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Blood Glucose',
                    data: [120, 115, 130, 125, 118, 122],
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
        console.log('Health chart initialized:', healthChart);
    }

    // Function to update the health chart
    function updateHealthChart() {
        if (healthChart) {
            const newData = [
                Math.floor(Math.random() * (140 - 100) + 100),
                Math.floor(Math.random() * (140 - 100) + 100),
                Math.floor(Math.random() * (140 - 100) + 100),
                Math.floor(Math.random() * (140 - 100) + 100),
                Math.floor(Math.random() * (140 - 100) + 100),
                Math.floor(Math.random() * (140 - 100) + 100)
            ];
            healthChart.data.datasets[0].data = newData;
            healthChart.update();
        }
    }

    // Function to generate insights
    function generateInsights() {
        insightsList.innerHTML = ''; // Clear existing insights
        
        const insights = [
            'Your blood glucose levels have been stable over the past week.',
            // 'Great job on medication adherence! Keep it up.',
            // 'You\'re making progress on your exercise goals. Try to increase your activity to reach your target.'
        ];
        
        insights.forEach(insight => {
            const li = document.createElement('li');
            li.textContent = insight;
            insightsList.appendChild(li);
        });
        
        // Update infographics with new random data (in a real app, this would use actual user data)
        const newGlucose = Math.floor(Math.random() * (100 - 60) + 60);
        const newMedication = Math.floor(Math.random() * (100 - 80) + 80);
        const newExercise = Math.floor(Math.random() * (100 - 40) + 40);
        updateInfographics(newGlucose, newMedication, newExercise);
    }

    // Function to handle window resize
    function handleResize() {
        if (healthChart) {
            healthChart.resize();
        }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initialize the chart and infographics
    initializeHealthChart();
    updateInfographics(75, 90, 60);
    generateInsights();

    console.log('Initialization complete');
});