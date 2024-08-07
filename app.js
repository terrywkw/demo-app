// app.js
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

document.addEventListener('DOMContentLoaded', (event) => {
  const hamburger = document.querySelector('.hamburger-menu');
  const sidebar = document.querySelector('.sidebar');
  const container = document.querySelector('#healthInsight-container');

  hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('active');
  });
});

function initApp() {
  setupNavigation();
  setupHamburgerMenu();
  setupModalListeners();
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
  document.getElementById('sidebar').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

function loadView(view) {
  const mainContent = document.querySelector('[role="main"]');
  if (routes[view]) {
      fetch(routes[view].url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.text();
          })
          .then(html => {
              mainContent.innerHTML = html;
              document.title = routes[view].title;
              history.pushState(null, '', `#${view}`);
              executePageScripts(view);
              closeSidebar();
          })
          .catch(error => console.error('Error loading view:', error));
  } else {
      console.error('View not found:', view);
  }
}
  
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
      case 'routine':
        initRoutinePlanner();
        break;
      // Add other cases as needed
    }
  }

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
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.text();
          })
          .then(html => {
              modalContent.innerHTML = html;
              openModal();
              if (view === 'routine') {
                  initRoutinePlanner();
              }
          })
          .catch(error => console.error('Error loading view in modal:', error));
  } else {
      console.error('View not found:', view);
  }
}

function setupModalListeners() {
  document.getElementById('generatePlan').addEventListener('click', () => loadViewInModal('routine'));
  document.querySelector('.close').addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
      if (event.target == document.getElementById('routineModal')) {
          closeModal();
      }
  });
}

window.addEventListener('popstate', () => {
  const view = window.location.hash.slice(1) || 'dashboard';
  loadView(view);
});

document.addEventListener('DOMContentLoaded', initApp);


