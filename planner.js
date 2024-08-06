function addTask(timeOfDay) {
    const input = document.getElementById(`new${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}Task`);
    const taskList = document.getElementById(`${timeOfDay}Tasks`);
    
    if (input.value.trim() === '') return;

    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `<input type="checkbox"><span>${input.value}</span>`;
    taskList.appendChild(li);

    input.value = '';
}

// add new routine 
function openModal() {
    document.getElementById('routineModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('routineModal').style.display = 'none';
}

function loadRoutineSetup() {
    const routineSetupContent = document.getElementById('routineSetupContent');
    fetch('routine.html')
        .then(response => response.text())
        .then(html => {
            routineSetupContent.innerHTML = html;
            openModal();
            // Load and execute routine.js
            const script = document.createElement('script');
            script.src = 'routine.js';
            script.onload = function() {
                if (typeof initRoutinePlanner === 'function') {
                    initRoutinePlanner();
                } else {
                    console.error('initRoutinePlanner function not found');
                }
            };
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error loading routine setup:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateNewRoutine');
    generateButton.addEventListener('click', loadRoutineSetup);

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('routineModal')) {
            closeModal();
        }
    });
});

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateNewRoutine');
    generateButton.addEventListener('click', loadRoutineSetup);

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('routineModal')) {
            closeModal();
        }
    });
});