document.addEventListener('DOMContentLoaded', function() {
    const bookButtons = document.querySelectorAll('.book-btn');
    const joinButton = document.querySelector('.join-btn');
    const callControls = document.querySelectorAll('.call-btn');
    const viewSummaryButtons = document.querySelectorAll('.view-summary-btn');

    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Appointment booked successfully!');
        });
    });

    joinButton.addEventListener('click', function() {
        document.querySelector('.video-container').style.backgroundColor = '#000';
        this.textContent = 'In Call';
        this.disabled = true;
    });

    callControls.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('mute-btn')) {
                this.textContent = this.textContent === 'Mute' ? 'Unmute' : 'Mute';
            } else if (this.classList.contains('video-btn')) {
                this.textContent = this.textContent === 'Turn Off Video' ? 'Turn On Video' : 'Turn Off Video';
            } else if (this.classList.contains('end-call-btn')) {
                document.querySelector('.video-container').style.backgroundColor = '#f0f0f0';
                document.querySelector('.join-btn').textContent = 'Join Call';
                document.querySelector('.join-btn').disabled = false;
            }
        });
    });

    viewSummaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Consultation summary viewed.');
        });
    });
});