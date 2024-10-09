document.addEventListener('DOMContentLoaded', function() {
    const emergencyCallBtn = document.getElementById('emergencyCallBtn');
    const contactButtons = document.querySelectorAll('.call-contact-btn');
    const firstAidSelect = document.getElementById('firstAidSelect');
    const firstAidInstructions = document.getElementById('firstAidInstructions');

    emergencyCallBtn.addEventListener('click', function() {
        // In a real app, this would initiate an actual emergency call
        alert('Simulating emergency call to 911');
    });

    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const number = this.getAttribute('data-number');
            alert(`Simulating call to ${number}`);
        });
    });

    const firstAidGuides = {
        cpr: [
            "Check the scene for safety",
            "Check for responsiveness",
            "Call 911 or ask someone else to",
            "Begin chest compressions: Push hard and fast in the center of the chest",
            "Give rescue breaths if trained",
            "Continue CPR until help arrives"
        ],
        choking: [
            "Encourage coughing",
            "If coughing doesn't work, perform back blows",
            "Alternate with abdominal thrusts (Heimlich maneuver)",
            "Call 911 if the person becomes unresponsive"
        ],
        bleeding: [
            "Apply direct pressure to the wound",
            "Use a clean cloth or sterile gauze if available",
            "Elevate the injured area above the heart if possible",
            "Call 911 for severe bleeding"
        ],
        burns: [
            "Remove the source of the burn",
            "Cool the burn with cool (not cold) running water for 10-20 minutes",
            "Cover the burn with a clean, dry dressing",
            "Do not apply ice, butter, or ointments",
            "Seek medical attention for severe burns"
        ]
    };

    firstAidSelect.addEventListener('change', function() {
        const selected = this.value;
        if (selected && firstAidGuides[selected]) {
            firstAidInstructions.innerHTML = '<ol>' + 
                firstAidGuides[selected].map(step => `<li>${step}</li>`).join('') + 
                '</ol>';
        } else {
            firstAidInstructions.innerHTML = '';
        }
    });
});