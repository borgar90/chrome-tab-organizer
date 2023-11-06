import React, { useState, useEffect } from "react";
import ViewTabGroup from "./ViewTabGroup";
import AddTabsToGroup from "./AddTabsToGroup";
function TabManager() {
  const [tabs, setTabs] = useState([]);
  const [tabGroups, setTabGroups] = useState([]);
  const [newTabGroupName, setNewTabGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const createTabGroup = () => {
    // Create a new tab group object and add it to the tabGroups state.
    const newTabGroup = {
      name: newTabGroupName,
      color: selectedColor,
      icon: selectedIcon,
      tabs: [], // This will hold tab information for this group.
    };
    setTabGroups([...tabGroups, newTabGroup]);

    // Clear the input fields after creating the group.
    setNewTabGroupName("");
    setSelectedColor("");
    setSelectedIcon("");
  };

  const deleteTabGroup = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tab group?"
    );
    if (confirmed) {
      // Remove the tab group from the tabGroups state.
      const updatedTabGroups = [...tabGroups];
      updatedTabGroups.splice(index, 1);
      setTabGroups(updatedTabGroups);
    }
  };
  // Function to fetch the list of tabs
  function fetchTabs() {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage({ action: "getTabs" }, (response) => {
      setTabs(response.tabs);
    });
  }

  useEffect(() => {
    fetchTabs();
  }, []);

  // Function to open a tab in a new window
  function openTab(tabId) {
    // eslint-disable-next-line no-undef
    chrome.tabs.update(tabId, { active: true });
  }

  console.log(tabs); // Add this line to log the fetched tabs

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tab Group Manager</h1>
      <div className="mb-4">
        <input
          className="w-64 p-2 border rounded "
          type="text"
          placeholder="Tab Group Name"
          value={newTabGroupName}
          onChange={(e) => setNewTabGroupName(e.target.value)}
        />
        <div className="flex items-center mt-2">
          <input
            className="p-2 border rounded"
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded ml-2"
            onClick={createTabGroup}
          >
            Create New Tab Group
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        {tabGroups.map((tabGroup, index) => (
          <div
            key={index}
            className="bg-white rounded border border-gray-300 flex flex-col mb-4 p-2"
          >
            <div className="flex flex-row">
              <div
                style={{ background: tabGroup.color }}
                className="h-12 w-12 flex items-center justify-center rounded-full mr-3 "
              >
                {tabGroup.icon}
              </div>
              <h2 className="text-lg font-semibold mb-2">{tabGroup.name}</h2>
            </div>
            <div>
              {/* ... (Display tab titles and URLs) */}

              <ul className="mt-3">
                {tabGroup.tabs.map((tabId) => {
                  const tab = tabs.find((t) => t.id === tabId);
                  return tab ? (
                    <li key={tabId}>
                      <div
                        className="flex flex-col"
                        onClick={() => openTab(tabId)}
                      >
                        <img
                          src={tab.favIconUrl}
                          alt=""
                          width="16"
                          height="16"
                          className="inline-block mr-2"
                        />
                        {tab.title}
                      </div>
                    </li>
                  ) : null;
                })}
              </ul>
              <AddTabsToGroup
                tabs={tabs}
                setTabGroupTabs={(tabs) => {
                  setTabGroups([...tabGroups, tabs]);
                  console.log("tabs", tabs);
                  console.log("tabGroups", tabGroups);
                }}
              />
            </div>
            <div className="flex flex-row mt-4">
              <button
                onClick={() => deleteTabGroup(index)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
              <button className="bg-blue-500 text-white p-2 rounded">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabManager;
