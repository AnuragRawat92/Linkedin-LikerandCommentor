// Grab all necessary DOM elements from the popup
const like = document.querySelector('.cbtn'); // The input field for like count
const comment = document.querySelector('.cmbtn'); // The input field for comment count
const btnv = document.querySelector('.btn'); // The button that should appear after both inputs are filled
const go = document.querySelector('.gobtn'); // The 'Go' button to navigate to LinkedIn feed

// Add an event listener for the 'keyup' event on the "like" input field
like.addEventListener('keyup', function() {
    // Check if both the "like" and "comment" fields are not empty
    if (like.value !== "" && comment.value !== "") {
        // If both fields are filled, remove the 'hidden' class to show the button
        btnv.classList.remove('hidden');
    } else {
        // If either field is empty, add the 'hidden' class to hide the button
        btnv.classList.add('hidden');
    }
});

// Add an event listener for the 'keyup' event on the "comment" input field
comment.addEventListener('keyup', function() {
    // Check again if both the "like" and "comment" fields are filled
    if (like.value !== "" && comment.value !== "") {
        // Show the button if both fields are filled
        btnv.classList.remove('hidden');
    } else {
        // Hide the button if either field is empty
        btnv.classList.add('hidden');
    }
});

// This is a listener for receiving messages from the content script (contentScript.js)
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Log the message coming from the content script for debugging purposes
    console.log(message);

    // Respond back to the content script with the current values of like and comment inputs
    sendResponse({
        data: like.value, // Send the like count
        data1: comment.value // Send the comment count
    });
});

// Add an event listener for the 'Go' button click event
go.addEventListener('click', function() {
    // When the 'Go' button is clicked, grab the active tab and navigate to LinkedIn's feed page
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tab = tabs[0]; // Get the current active tab
        // Update the tab's URL to LinkedIn's feed page
        chrome.tabs.update(tab.id, { url: 'https://www.linkedin.com/feed/' });
    });
});
