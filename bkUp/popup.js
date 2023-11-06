// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const tabList = document.getElementById("tabList");
  const refreshButton = document.getElementById("refreshButton");

  // Function to fetch the list of tabs
  function fetchTabs() {
    chrome.runtime.sendMessage({ action: "getTabs" }, (response) => {
      const tabs = response.tabs;
      // Clear existing tab list
      tabList.innerHTML = "";
      // Create a list of tabs
      tabs.forEach((tab) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = tab.url;
        link.target = "_blank";
        link.innerText = tab.title;
        listItem.appendChild(link);
        tabList.appendChild(listItem);
      });
    });
  }

  // Refresh tab list when the "Refresh" button is clicked
  refreshButton.addEventListener("click", fetchTabs);

  // Initial fetch of tabs when the popup is opened
  fetchTabs();
});
