// background.js

// Function to fetch the list of open tabs
function fetchTabs(sendResponse) {
  chrome.tabs.query({}, (result) => {
    // Log the tab titles to verify they are available
    result.forEach((tab) => {
      console.log("title:", tab.title);
    });
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
