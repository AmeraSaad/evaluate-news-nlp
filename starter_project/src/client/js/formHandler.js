// Replace checkForName with a function that checks the URL
import { checkForName } from './nameChecker'
import { checkForUrl } from './urlChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // This is an example code that checks the submitted name. You may remove it from your code
    // checkForName(formText);
    
    // Check if the URL is valid
      if (!checkForUrl(formText)) {
        alert("Invalid URL. Please enter a valid URL.");
        return;
      }

      console.log("::: Form Submitted :::", formText);

      // If the URL is valid, send it to the server using the serverURL constant above
      postData(serverURL, { url: formText })
        .then((response) => {
            changeDom(response);
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while processing your request. Please try again later.");
        });

      
}

// Function to send data to the server
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); 
}


// Function to dynamically update the UI with results
function changeDom(response) {
    document.getElementById('text').textContent = `Text: ${response.text}`;
    document.getElementById('agreement').textContent = `Agreement: ${response.agreement}`;
    document.getElementById('confidence').textContent = `Confidence: ${response.confidence}`;
    document.getElementById('subjectivity').textContent = `Subjectivity: ${response.subjectivity}`;
    document.getElementById('irony').textContent = `Irony: ${response.irony}`;
}


// Export the handleSubmit function
export { handleSubmit };

