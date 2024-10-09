// ai-assistant.js

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const voiceButton = document.getElementById('voiceButton');
    const listeningIndicator = document.getElementById('listeningIndicator');

    // Pre-written dialogues
    const preWrittenDialogues = [
        {
            trigger: "hi",
            response: "Hello there! It's great to see you, John. How are you feeling today? I noticed from your last check-in that you've been sticking to your exercise routine. That's fantastic!"
        },
        {
            trigger: "my diet",
            response: "As you know, managing your diet is crucial for your diabetes. Here are some recommendations:\n\n1. Focus on low glycemic index foods like whole grains, leafy greens, and lean proteins.\n2. Aim for consistent carbohydrate intake at each meal.\n3. Include fiber-rich foods to help stabilize blood sugar levels.\n4. Stay hydrated with water or unsweetened beverages.\n5. Consider having small, frequent meals throughout the day.\n\nRemember to monitor your blood glucose levels regularly and adjust your diet as needed. If you have any concerns, please consult with your healthcare provider."
        },
        {
            trigger: "summary",
            response: "Here's a summary of your conversation:\n\n1. Monitor your blood glucose levels regularly.\n2. Take your medications as prescribed.\n3. Follow a balanced diet rich in whole grains, vegetables, and lean proteins.\n4. Exercise regularly, aiming for at least 150 minutes per week.\n5. Check your feet daily for any cuts or sores.\n6. Stay hydrated and limit alcohol consumption.\n7. Manage stress through relaxation techniques or activities you enjoy.\n8. Attend all scheduled check-ups with your healthcare team.\n9. Learn to recognize and manage the symptoms of high and low blood sugar.\n10. Keep up with recommended vaccinations to prevent complications.\n11. Your next appointment is 23rd of September 2024."
        }
    ];

    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'ai-message');
        
        // Check if the message contains a numbered list
        if (message.includes('\n1.')) {
            const parts = message.split('\n\n');
            const intro = parts[0];
            const listItems = parts[1].split('\n');
            
            messageElement.innerHTML = `<p>${intro}</p><ol>`;
            listItems.forEach(item => {
                if (item.trim() !== '') {
                    messageElement.innerHTML += `<li>${item.substring(item.indexOf('.') + 2)}</li>`;
                }
            });
            messageElement.innerHTML += '</ol>';
            
            if (parts[2]) {
                messageElement.innerHTML += `<p>${parts[2]}</p>`;
            }
        } else {
            messageElement.textContent = message;
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to handle user input
    function handleInput() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, true);
            userInput.value = '';

            // Check for pre-written dialogues (case-insensitive)
            const matchedDialogue = preWrittenDialogues.find(dialog => 
                dialog.trigger.toLowerCase() === userMessage.toLowerCase()
            );
            if (matchedDialogue) {
                setTimeout(() => addMessage(matchedDialogue.response), 500);
            } else {
                // Handle other inputs or use a default response
                setTimeout(() => addMessage("I'm sorry, I don't have a specific response for that input. How else can I assist you today?"), 500);
            }
        }
    }

    // Event listeners
    sendButton.addEventListener('click', handleInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleInput();
        }
    });

    voiceButton.addEventListener('click', function() {
        listeningIndicator.classList.remove('hidden');
        // Simulate voice input (in a real app, this would use the Web Speech API)
        setTimeout(() => {
            listeningIndicator.classList.add('hidden');
            addMessage("summary", true);
            setTimeout(() => {
                const summaryDialogue = preWrittenDialogues.find(dialog => 
                    dialog.trigger.toLowerCase() === "summary"
                );
                addMessage(summaryDialogue.response);
            }, 500);
        }, 2000);
    });

    // Add initial greeting
    setTimeout(() => addMessage("Hello! I'm your AI Health Assistant. How can I help you today?"), 500);
});