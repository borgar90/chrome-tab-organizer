import React, { useState } from "react";

function AddTabsToGroup({ tabs, setTabGroupTabs }) {
  const [selectedTabs, setSelectedTabs] = useState([]);

  const handleSelectionChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTabs(selectedOptions);
  };

  const handleAddTabs = () => {
    setTabGroupTabs(selectedTabs);
  };

  return (
    <div className="p-0">
      <select
        multiple
        className="w-full p-4 border rounded"
        onChange={handleSelectionChange}
      >
        {tabs.map((tab, index) => (
          <option key={index} value={tab.id}>
            <hr className="mt-1 mb-1" />
            {tab.title}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
        onClick={handleAddTabs}
      >
        Add Selected Tabs to Group
      </button>
    </div>
  );
}

export default AddTabsToGroup;
