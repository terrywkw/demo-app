// routine.js
function initRoutinePlanner() {

$(document).ready(function() {
  let currentStep = 1;
  const totalSteps = 7; // Updated to include summary step
  let formData = {}; // Object to store form data

  function updateProgress() {
      let progress = (currentStep - 1) / (totalSteps - 1) * 100;
      $('.progress').css('width', progress + '%');
  }

  function showStep(step) {
      $('.section').hide();
      $('#step' + step).show();
      updateProgress();

      if (step === 1) {
          $('#prevBtn').hide();
      } else {
          $('#prevBtn').show();
      }

      if (step === totalSteps) {
          $('#nextBtn').hide();
          $('#finishBtn').show();
          updateSummary();
      } else {
          $('#nextBtn').show();
          $('#finishBtn').hide();
      }
  }

  function validateStep(step) {
      let isValid = true;
      $('.error-message').remove(); // Clear previous error messages

      if (step === 1) {
          if (!$('.plan-type.selected').length) {
              $('#step1').append('<p class="error-message">Please select a plan type.</p>');
              isValid = false;
          }
      } else if (step === 2) {
          if ($('#name').val().trim() === '') {
              $('#name').after('<p class="error-message">Please enter your name.</p>');
              isValid = false;
          }
          if ($('#age').val().trim() === '') {
              $('#age').after('<p class="error-message">Please enter your age.</p>');
              isValid = false;
          }
      } else if (step === 3) {
          if ($('#shortTermGoal').val().trim() === '') {
              $('#shortTermGoal').after('<p class="error-message">Please enter a short-term goal.</p>');
              isValid = false;
          }
          if ($('#longTermGoal').val().trim() === '') {
              $('#longTermGoal').after('<p class="error-message">Please enter a long-term goal.</p>');
              isValid = false;
          }
      } else if (step === 4) {
          if ($('#dietPreference').val() === '') {
              $('#dietPreference').after('<p class="error-message">Please select a dietary preference.</p>');
              isValid = false;
          }
          if ($('#activityPreference').val().trim() === '') {
              $('#activityPreference').after('<p class="error-message">Please enter preferred activities.</p>');
              isValid = false;
          }
      }

      return isValid;
  }

  function updateFormData() {
      formData = {
          planType: $('.plan-type.selected').data('type'),
          name: $('#name').val(),
          age: $('#age').val(),
          shortTermGoal: $('#shortTermGoal').val(),
          longTermGoal: $('#longTermGoal').val(),
          dietPreference: $('#dietPreference').val(),
          activityPreference: $('#activityPreference').val(),
          routine: $('#routineList').children().map(function() {
              return $(this).text();
          }).get(),
          reminders: {
              pushNotification: $('#pushNotification').is(':checked'),
              smsReminder: $('#smsReminder').is(':checked'),
              emailReminder: $('#emailReminder').is(':checked'),
              frequency: $('#reminderFrequency').val()
          }
      };
  }

  function updateSummary() {
      updateFormData();
      let summaryHtml = `
          <div class="summary-item">
              <h3>Plan Type:</h3>
              <p>${formData.planType}</p>
          </div>
          <div class="summary-item">
              <h3>Personal Information:</h3>
              <p>Name: ${formData.name}</p>
              <p>Age: ${formData.age}</p>
          </div>
          <div class="summary-item">
              <h3>Health Goals:</h3>
              <p>Short-term: ${formData.shortTermGoal}</p>
              <p>Long-term: ${formData.longTermGoal}</p>
          </div>
          <div class="summary-item">
              <h3>Preferences:</h3>
              <p>Diet: ${formData.dietPreference}</p>
              <p>Activities: ${formData.activityPreference}</p>
          </div>
          <div class="summary-item">
              <h3>Routine:</h3>
              <ul>
                  ${formData.routine.map(item => `<li>${item}</li>`).join('')}
              </ul>
          </div>
          <div class="summary-item">
              <h3>Reminders:</h3>
              <p>Push Notifications: ${formData.reminders.pushNotification ? 'Yes' : 'No'}</p>
              <p>SMS Reminders: ${formData.reminders.smsReminder ? 'Yes' : 'No'}</p>
              <p>Email Reminders: ${formData.reminders.emailReminder ? 'Yes' : 'No'}</p>
              <p>Frequency: ${formData.reminders.frequency}</p>
          </div>
      `;
      $('#summaryContent').html(summaryHtml);
  }

  $('#nextBtn').click(function() {
      if (validateStep(currentStep)) {
          if (currentStep < totalSteps) {
              currentStep++;
              showStep(currentStep);
          }
      }
  });

  $('#prevBtn').click(function() {
      if (currentStep > 1) {
          currentStep--;
          showStep(currentStep);
      }
  });

//   $('#finishBtn').click(function() {
//       alert('Routine plan created successfully!');
//       // Here you would typically send the data to a server
//       console.log(formData);
//   });

// In the initRoutinePlanner function, replace the existing $('#finishBtn').click handler with:
    $('#finishBtn').click(function() {
        alert('Routine plan created successfully!');
        // Here you would typically send the data to a server
        console.log(formData);
        // Close the modal and return to planner page
        window.parent.closeModal();
    });

  $('#saveProgressBtn').click(function() {
      updateFormData();
      localStorage.setItem('routinePlannerProgress', JSON.stringify(formData));
      alert('Progress saved successfully!');
  });

  $('.plan-type').click(function() {
      $('.plan-type').removeClass('selected');
      $(this).addClass('selected');
  });

  $('.voice-input').click(function() {
      alert('Voice input activated. In a real application, this would start voice recognition.');
  });

  $('#routineList').sortable({
      update: function(event, ui) {
          console.log('Routine order updated');
      },
      cancel: ''  // Allow keyboard-focused items to be sorted
  }).disableSelection();

  // Keyboard navigation for routine items
  $('#routineList').on('keydown', '.routine-item', function(e) {
      if (e.which === 38) { // Up arrow
          $(this).prev().before($(this));
          $(this).focus();
      } else if (e.which === 40) { // Down arrow
          $(this).next().after($(this));
          $(this).focus();
      }
  });

  $('input[type="checkbox"], #reminderFrequency').change(function() {
      updateReminderPreview();
  });

  function updateReminderPreview() {
      let previewText = 'Your reminder will look like this:\n\n';
      if ($('#pushNotification').is(':checked')) {
          previewText += 'Push Notification: ';
      }
      if ($('#smsReminder').is(':checked')) {
          previewText += 'SMS: ';
      }
      if ($('#emailReminder').is(':checked')) {
          previewText += 'Email: ';
      }
      previewText += 'Take your morning medication in ' + $('#reminderFrequency').val() + '.';
      $('#reminderPreview').text(previewText);
  }

  // Load saved progress if available
  let savedProgress = localStorage.getItem('routinePlannerProgress');
  if (savedProgress) {
      formData = JSON.parse(savedProgress);
      // Populate form fields with saved data
      $('.plan-type[data-type="' + formData.planType + '"]').addClass('selected');
      $('#name').val(formData.name);
      $('#age').val(formData.age);
      $('#shortTermGoal').val(formData.shortTermGoal);
      $('#longTermGoal').val(formData.longTermGoal);
      $('#dietPreference').val(formData.dietPreference);
      $('#activityPreference').val(formData.activityPreference);
      $('#routineList').html(formData.routine.map(item => `<div class="routine-item" draggable="true">${item}</div>`).join(''));
      $('#pushNotification').prop('checked', formData.reminders.pushNotification);
      $('#smsReminder').prop('checked', formData.reminders.smsReminder);
      $('#emailReminder').prop('checked', formData.reminders.emailReminder);
      $('#reminderFrequency').val(formData.reminders.frequency);
      updateReminderPreview();
  }

  showStep(currentStep);
});
}
// Call this function at the end of the file
initRoutine();