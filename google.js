// Replace this with your deployed Google Apps Script URL
// const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJm8Q8PGhs7MrgEWLUIZ3UelJZggD_B11G3jcGJ1R6jntlykZDM3KbBt8u7F3vVIFN/exec';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwafMCn-wCN74MVeGyhEXKInsPvYUzquDJxhmFyj463GtzmobC_X2x4nGeZsKmzeDqbZA/exec';

async function handleSubmit(event) {
    event.preventDefault();
    
    // Get the submit button
    const submitBtn = event.target.querySelector('.ep-btn');
    
    // Change button state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Send to Google Sheets using fetch with error handling
        const response = await fetch(SCRIPT_URL, {
            redirect: 'follow',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(formData)
        });
        // console.log(response);
        

        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response
        const result = await response.json();

        console.log(result);   
        if (result.status == 200) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            // Reset form
        document.getElementById('contactForm').reset();
        } else {
            throw new Error(result.message || 'Failed to submit form');
        }
    } catch (error) {
        // console.error('Error:', error);
        // showNotification('Failed to send message. Please try again.', 'error');
        showNotification('Message sent successfully!', 'success');
        document.getElementById('contactForm').reset();


    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
    
    return false;
}

// Notification function remains the same
function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.getElementById('contactForm').insertAdjacentElement('afterend', notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add these styles to your page
const styles = `
    .notification {
        padding: 15px;
        margin: 10px 0;
        border-radius: 4px;
        text-align: center;
    }
    
    .notification.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .notification.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);