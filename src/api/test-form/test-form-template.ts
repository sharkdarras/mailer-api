export const testFormTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mailer Test Form</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .form-container {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #555;
    }

    input[type="email"],
    input[type="tel"],
    input[type="text"],
    textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    .submit-btn {
      background-color: #007bff;
      color: white;
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
      margin-top: 10px;
    }

    .submit-btn:hover {
      background-color: #0056b3;
    }

    .required {
      color: #e74c3c;
    }

    .status-message {
      margin-top: 20px;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      display: none;
    }

    .success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  </style>
</head>

<body>
  <div class="form-container">
    <h1>Mailer Test Form</h1>
    <form id="contactForm" method="POST" action="send-message">
      <div class="form-group">
        <label for="senderName">Sender Full Name</label>
        <input type="text" id="senderName" name="senderName" placeholder="John Doe">
      </div>

      <div class="form-group">
        <label for="senderEmail">Sender Email <span class="required">*</span></label>
        <input type="email" id="senderEmail" name="senderEmail" required>
      </div>

      <div class="form-group">
        <label for="senderPhone">Sender Phone Number</label>
        <input type="tel" id="senderPhone" name="senderPhone" placeholder="+1 234 567 8900">
      </div>

      <div class="form-group">
        <label for="subject">Subject <span class="required">*</span></label>
        <input type="text" id="subject" name="subject" required>
      </div>

      <div class="form-group">
        <label for="message">Message <span class="required">*</span></label>
        <textarea id="message" name="message" placeholder="Your message..." required></textarea>
      </div>

      <div class="form-group">
        <label for="website">Website <span class="required">*</span></label>
        <input type="text" id="website" name="website" placeholder="example.com" required>
      </div>

      <button type="submit" class="submit-btn">Send Message</button>
    </form>
    
    <div id="statusMessage" class="status-message"></div>
  </div>

  <script>
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.querySelector('.submit-btn');
      const statusMessage = document.getElementById('statusMessage');
      
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      statusMessage.style.display = 'none';
      
      // Collect form data in SendMessageRequest format
      const formData = {
        sender: {
          email: document.getElementById('senderEmail').value,
          fullName: document.getElementById('senderName').value || undefined,
          phoneNumber: document.getElementById('senderPhone').value || undefined
        },
        subject: document.getElementById('subject').value,
        text: document.getElementById('message').value,
        website: document.getElementById('website').value
      };
      
      try {
        const response = await fetch('send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          statusMessage.textContent = 'Message sent successfully!';
          statusMessage.className = 'status-message success';
          statusMessage.style.display = 'block';
          document.getElementById('contactForm').reset();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error sending message');
        }
      } catch (error) {
        statusMessage.textContent = 'Error: ' + error.message;
        statusMessage.className = 'status-message error';
        statusMessage.style.display = 'block';
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  </script>
</body>

</html>`;
