import React from "react";

function viewTabGroup(tabGroup) {
  // return the render of tab titles to the popup.
  // return the render of tab URLs to the popup.
  return (
    <>
      <ul>
        {tabGroup.map((tab) => (
          <li key={tab.id}>
            {tab.title} -{" "}
            <a href={tab.url} target="_blank" rel="noopener noreferrer">
              Open
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default viewTabGroup;
