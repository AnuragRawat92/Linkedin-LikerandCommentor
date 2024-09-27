(() => {
    // Initialize variables for like count, comment count, and counters for posts liked and commented
    let likec, commentc, i = 0, k = 0;
  
    // Send message to popup.js to fetch like and comment count data
    chrome.runtime.sendMessage({ data: "DataFetched Successfully" }, function (response) {
        console.log(response);
        
        // Parse response data to integers for like and comment counts
        likec = parseInt(response.data); // like count
        commentc = parseInt(response.data1); // comment count
        
        // Log the fetched like and comment counts for debugging
        console.log("Like count is: " + likec);
        console.log("Comment count is: " + commentc);
    });
  
    // Function to automate liking and commenting on LinkedIn posts
    function changehere() {
        // Process likes if the like counter is less than the desired like count
        if (i < likec) {
            // Find the like button of the current post by targeting specific class names
            let likeButton = document.querySelector('.scaffold-finite-scroll__content')
                ?.querySelectorAll('div .feed-shared-social-action-bar__action-button .react-button__trigger')[i];
  
            // If the like button is found, click it and log success
            if (likeButton) {
                likeButton.click();
                console.log(`Liked post ${i + 1}`);
                i++; // Increment like counter
            } else {
                console.log(`Like button not found for post ${i + 1}`);
            }
        } else {
            // Log when all likes have been processed
            console.log("All likes processed.");
        }
  
        // Process comments if the comment counter is less than the desired comment count
        if (k < commentc) {
            // Find the comment button of the current post
            let commentButton = document.querySelector('.scaffold-finite-scroll__content')
                ?.querySelectorAll('div.comment span div button')[k];
  
            // If the comment button is found, click to open the comment box
            if (commentButton) {
                commentButton.click(); // Open comment box
                console.log(`Opened comment box for post ${k + 1}`);
  
                // Delay for the comment box to appear before proceeding
                setTimeout(() => {
                    // Find the comment input field in the comment box
                    let commentBox = document.querySelector('.scaffold-finite-scroll__content')
                        ?.querySelectorAll('div .feed-shared-update-v2__comments-container .comments-comment-box .comments-comment-box__form-container .comments-comment-texteditor .comments-comment-box-comment__text-editor .editor-container .editor-content .ql-editor')[k];
  
                    // If the comment box is found, input the comment and trigger the input event
                    if (commentBox) {
                        commentBox.focus();
                        commentBox.innerHTML = "CFBR"; // Insert the comment text "CFBR"
                        commentBox.dispatchEvent(new Event('input', { bubbles: true })); // Trigger the input event
                        console.log(`Inserted comment "CFBR" in post ${k + 1}`);
                        
                        // Optional: Add visual feedback by changing the background color of the comment box
                        commentBox.style.backgroundColor = "lightyellow"; // Highlight the comment box
                        console.log("Comment box highlighted");
  
                        // Find the post button to submit the comment
                        let postButton = document.querySelector('.scaffold-finite-scroll__content')
                            ?.querySelectorAll('div .social-details-social-activity .feed-shared-update-v2__comments-container .comments-comment-box .comments-comment-box__form-container form')[k]
                            ?.querySelectorAll('div button')[2]; // Third button is usually the post button
  
                        // If the post button is found, click it to submit the comment
                        if (postButton) {
                            postButton.click();
                            console.log(`Commented on post ${k + 1}`);
                            k++; // Increment comment counter
                        } else {
                            console.log(`Post button not found for comment ${k + 1}`);
                        }
                    } else {
                        console.log(`Comment box not found for post ${k + 1}`);
                    }
                }, 1500); // Delay for the comment box to become available
            } else {
                console.log(`Comment button not found for post ${k + 1}`);
            }
        } else {
            // Log when all comments have been processed
            console.log("All comments processed.");
        }
    }
  
    // Call the changehere function at a regular interval of 4 seconds
    setInterval(changehere, 4000);
  })();
  