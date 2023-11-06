// background.js

// Function to fetch the list of open tabs
function fetchTabs(sendResponse) {
  chrome.tabs.query({}, (result) => {
    // Send the list of tabs to the popup
    sendResponse({ tabs: result });
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTabs") {
    fetchTabs(sendResponse);
    return true; // Indicates that we'll respond asynchronously
  }
});
