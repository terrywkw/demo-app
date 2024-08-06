// chat.js

function initChat() {
    const chatHistory = document.getElementById('chatHistory');
    const textInput = document.getElementById('textInput');
    const sendTextBtn = document.getElementById('sendTextBtn');
    const startVoiceBtn = document.getElementById('startVoiceBtn');
    const textModeBtn = document.getElementById('textModeBtn');
    const voiceModeBtn = document.getElementById('voiceModeBtn');
    const textInputArea = document.getElementById('textInputArea');
    const voiceInputArea = document.getElementById('voiceInputArea');
    const voiceModal = document.getElementById('voiceModal');
    const closeVoiceModal = document.getElementById('closeVoiceModal');
    const voiceStatus = document.getElementById('voiceStatus');
    const voiceText = document.getElementById('voiceText');
    const voiceResponse = document.getElementById('voiceResponse');
  
    let isListening = false;
    let animationId = null;
  
    function sendMessage(message, isUser = true) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-message', isUser ? 'user-message' : 'ai-message');
      messageElement.textContent = message;
      chatHistory.appendChild(messageElement);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  
    function handleTextInput() {
      const message = textInput.value.trim();
      if (message) {
        sendMessage(message);
        setTimeout(() => {
          sendMessage("Thank you for your message. How can I assist you today?", false);
        }, 1000);
        textInput.value = '';
      }
    }
  
    function animateVoiceBars() {
      const bars = document.querySelectorAll('.voice-bar');
      bars.forEach(bar => {
        const height = Math.random() * 50 + 10;
        bar.style.height = `${height}px`;
      });
      if (isListening) {
        animationId = requestAnimationFrame(animateVoiceBars);
      }
    }
  
    function stopVoiceRecognition() {
      voiceModal.style.display = 'none';
      isListening = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  
    function simulateVoiceInteraction() {
      const voiceResponses = [
        "I understood that you said: 'What's the weather like today?'",
        "I heard you ask: 'What are my appointments for tomorrow?'",
        "You said: 'Remind me to take my medication at 2 PM.'",
        "I think you asked: 'What were my latest test results?'",
        "You requested: 'Schedule a doctor's appointment for next week.'"
      ];
  
      isListening = true;
      voiceModal.style.display = 'block';
      voiceStatus.textContent = "Listening...";
      voiceText.textContent = "";
      voiceResponse.textContent = "";
  
      animateVoiceBars();
  
      // Simulate listening for 3 seconds
      setTimeout(() => {
        voiceStatus.textContent = "Processing...";
        
        // Simulate processing for 2 seconds
        setTimeout(() => {
          const randomResponse = voiceResponses[Math.floor(Math.random() * voiceResponses.length)];
          voiceText.textContent = randomResponse;
          
          // Simulate AI thinking for 2 seconds
          setTimeout(() => {
            const aiResponse = "Certainly! I'll process that request for you right away.";
            voiceResponse.textContent = aiResponse;
            voiceStatus.textContent = "Done";
            
            // Add the interaction to the chat history
            sendMessage(randomResponse.split(': ')[1].replace(/^['"]|['"]$/g, ''), true);
            sendMessage(aiResponse, false);
  
            // Reset after 3 more seconds
            setTimeout(() => {
              stopVoiceRecognition();
            }, 2500);
  
          }, 1500);
        }, 1000);
      }, 2000);
    }
  
    function toggleVoiceRecognition() {
      if (!isListening) {
        simulateVoiceInteraction();
      } else {
        stopVoiceRecognition();
      }
    }
  
    function switchToTextMode() {
      textModeBtn.classList.add('active');
      voiceModeBtn.classList.remove('active');
      textInputArea.style.display = 'flex';
      voiceInputArea.style.display = 'none';
    }
  
    function switchToVoiceMode() {
      textModeBtn.classList.remove('active');
      voiceModeBtn.classList.add('active');
      textInputArea.style.display = 'none';
      voiceInputArea.style.display = 'flex';
    }
  
    // Event listeners
    sendTextBtn.addEventListener('click', handleTextInput);
    textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleTextInput();
      }
    });
    startVoiceBtn.addEventListener('click', toggleVoiceRecognition);
    closeVoiceModal.addEventListener('click', stopVoiceRecognition);
    textModeBtn.addEventListener('click', switchToTextMode);
    voiceModeBtn.addEventListener('click', switchToVoiceMode);
  
    console.log('Chat initialized');
  }
  
  // Call initChat when the script loads
  initChat();