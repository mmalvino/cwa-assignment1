'use client';

import React, { useState } from "react";

interface Tab {
  id: number;
  title: string;
  content: string;
}

const TabsGenerator: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: "Tab 1", content: "This is the first tab content." },
  ]);

  const handleAddTab = () => {
    if (tabs.length >= 15) return;
    const newTab: Tab = {
      id: Date.now(),
      title: `Tab ${tabs.length + 1}`,
      content: `This is content for Tab ${tabs.length + 1}.`,
    };
    setTabs([...tabs, newTab]);
  };

  const handleRemoveTab = (id: number) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  const handleEditTab = (id: number, field: "title" | "content", value: string) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, [field]: value } : tab)));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}> Tabs Editor</h2>
        <button onClick={handleAddTab} style={{ padding: "6px 12px", cursor: "pointer" }}>
          + Add Tab
        </button>
      </div>

      {tabs.map((tab) => (
        <div key={tab.id} style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <input
              value={tab.title}
              onChange={(e) => handleEditTab(tab.id, "title", e.target.value)}
              style={{ flex: 1, marginRight: "8px", padding: "4px" }}
            />
            <button onClick={() => handleRemoveTab(tab.id)} style={{ padding: "4px 8px", cursor: "pointer" }}>✕</button>
          </div>
          <textarea
            value={tab.content}
            onChange={(e) => handleEditTab(tab.id, "content", e.target.value)}
            style={{ width: "100%", height: "80px", padding: "4px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default TabsGenerator;
