// app.js

document.addEventListener('DOMContentLoaded', (event) => {
  const hamburger = document.querySelector('.hamburger-menu');
  const sidebar = document.querySelector('.sidebar');

  hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('active');
  });
});
function initApp() {
  setupNavigation();
  setupHamburgerMenu();
  loadView('dashboard');
}

function setupNavigation() {
  document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const view = e.target.getAttribute('data-view');
          loadView(view);
          closeSidebar();
      });
  });
}

function executePageScripts(view) {
  if (view === 'routine') {
    const script = document.createElement('script');
    script.src = 'routine.js';
    script.onload = function() {
      // This function will be called once the script is loaded
      console.log('Routine script loaded');
      // You might need to initialize some functions here
      // For example: initRoutinePlanner();
    };
    document.body.appendChild(script);
  }
  // Add similar conditions for other views that require specific scripts
}

function setupHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const sidebar = document.getElementById('sidebar');
  const content = document.querySelector('main');

  hamburgerBtn.addEventListener('click', toggleSidebar);
  content.addEventListener('click', closeSidebar);
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('open');
}

function loadView(view) {
  // Existing loadView code...
  closeSidebar();
}

// Existing loadView, executePageScripts, etc. functions...

document.addEventListener('DOMContentLoaded', initApp);

const routes = {
    'dashboard': { url: 'dashboard.html', title: 'Dashboard' },
    'chat': { url: 'chat.html', title: 'AI Chat' },
    'routine': { url: 'routine.html', title: 'Create Routine' },
    'caregiver': { url: 'careGiverSupport.html', title: 'Caregiver Support' },
    'consultation': { url: 'consultation.html', title: 'Consultation' },
    'emergency': { url: 'emergencyResponse.html', title: 'Emergency Response' },
    'healthcare': { url: 'healthcareInfo.html', title: 'Healthcare Info' },
    'insights': { url: 'healthInsight.html', title: 'Health Insights' },
    'iot': { url: 'iotDeviceIntegration.html', title: 'IoT Devices' },
    'medical': { url: 'medicalInfo.html', title: 'Medical Info' },
    'medication': { url: 'medicationManage.html', title: 'Medication' },
    'planner': { url: 'planner.html', title: 'Planner' },
    'records': { url: 'medicalRecord.html', title: 'Medical Records' },
    'settings': { url: 'setting.html', title: 'Settings' }
  };
  
  function initApp() {
    setupNavigation();
    loadView('dashboard');
  }
  
  function setupNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = e.target.getAttribute('data-view');
        loadView(view);
      });
    });
  }
  
  function loadView(view) {
    const mainContent = document.querySelector('[role="main"]');
    if (routes[view]) {
      fetch(routes[view].url)
        .then(response => response.text())
        .then(html => {
          mainContent.innerHTML = html;
          // Update page title
          document.title = routes[view].title;
          // Update URL without reloading the page
          history.pushState(null, '', `#${view}`);
          if (view === 'chat') {
            initChat();
          } else if (view === 'routine') {
            initRoutinePlanner();
          }
        })
        .catch(error => console.error('Error loading view:', error));
    } else {
      console.error('View not found:', view);
    }
  }
  
  function initChat() {
    // Initialize chat functionality
    console.log('Chat initialized');
    // Add any specific chat initialization code here
  }
  
  function initRoutinePlanner() {
    // Initialize routine planner functionality
    console.log('Routine Planner initialized');
    // Add any specific routine planner initialization code here
  }
  
  // Initialize app when DOM is ready
  document.addEventListener('DOMContentLoaded', initApp);
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', () => {
    const view = window.location.hash.slice(1) || 'dashboard';
    loadView(view);
  });

  // Add this function to app.js
function executePageScripts(view) {
    switch(view) {
      case 'chat':
        initChat();
        break;
      case 'routine':
        initRoutinePlanner();
        break;
      // Add other cases as needed
    }
  }
  
  function loadView(view) {
    const mainContent = document.querySelector('[role="main"]');
    if (routes[view]) {
      fetch(routes[view].url)
        .then(response => response.text())
        .then(html => {
          mainContent.innerHTML = html;
          document.title = routes[view].title;
          history.pushState(null, '', `#${view}`);
          executePageScripts(view);  // This line calls the function to load and execute scripts
        })
        .catch(error => console.error('Error loading view:', error));
    } else {
      console.error('View not found:', view);
    }
  }

  // Add these functions to your app.js

function openModal() {
  document.getElementById('routineModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('routineModal').style.display = 'none';
}

function loadViewInModal(view) {
  const modalContent = document.getElementById('modalContent');
  if (routes[view]) {
    fetch(routes[view].url)
      .then(response => response.text())
      .then(html => {
        modalContent.innerHTML = html;
        openModal();
        executePageScripts(view);
      })
      .catch(error => console.error('Error loading view:', error));
  } else {
    console.error('View not found:', view);
  }
}

// // Modify your initApp function to include event listeners for the modal
// function initApp() {
//   setupNavigation();
//   setupHamburgerMenu();
//   loadView('dashboard');

//   // Add event listener for the Generate New Routine button
//   document.getElementById('generatePlan').addEventListener('click', function() {
//     loadViewInModal('routine');
//   });

//   // Add event listener for closing the modal
//   document.querySelector('.close').addEventListener('click', closeModal);

//   // Close the modal if user clicks outside of it
//   window.addEventListener('click', function(event) {
//     if (event.target == document.getElementById('routineModal')) {
//       closeModal();
//     }
//   });
// }