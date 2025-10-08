'use client';

import React, { useState, useEffect } from "react";

interface Tab {
  id: number;
  title: string;
  content: string;
}

const TabsGenerator: React.FC = () => {
  // Initialize tabs from localStorage if available
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const saved = localStorage.getItem("tabsData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [{ id: 1, title: "Tab 1", content: "This is the first tab content." }];
      }
    }
    return [{ id: 1, title: "Tab 1", content: "This is the first tab content." }];
  });

  const [selectedTabId, setSelectedTabId] = useState<number>(tabs[0]?.id || 1);
  const [generatedCode, setGeneratedCode] = useState("");

  // Persist tabs to localStorage
  useEffect(() => {
    localStorage.setItem("tabsData", JSON.stringify(tabs));
  }, [tabs]);

  // Add new tab (max 15)
  const handleAddTab = () => {
    if (tabs.length >= 15) return;
    const newTab: Tab = {
      id: Date.now(),
      title: `Tab ${tabs.length + 1}`,
      content: `This is content for Tab ${tabs.length + 1}.`,
    };
    setTabs([...tabs, newTab]);
    setSelectedTabId(newTab.id);
  };

  // Remove tab
  const handleRemoveTab = (id: number) => {
    const filtered = tabs.filter((tab) => tab.id !== id);
    setTabs(filtered);
    if (selectedTabId === id && filtered.length > 0) {
      setSelectedTabId(filtered[0].id);
    }
  };

  // Edit tab title/content
  const handleEditTab = (id: number, field: "title" | "content", value: string) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, [field]: value } : tab)));
  };

  // Generate HTML output with inline CSS and clickable tabs
  const handleGenerateCode = () => {
    const html = `
<div data-tabs-container style="display:flex; flex-direction:column; font-family:sans-serif;">
  <div style="display:flex; gap:4px; border-bottom:2px solid #ccc;">
    ${tabs
      .map(
        (t, i) =>
          `<button data-tab-button onclick="showTab(this, ${i})" style="padding:8px 16px; border:1px solid #ccc; border-bottom:none; background:${i === 0 ? '#eee': '#fff'}; cursor:pointer;">${t.title}</button>`
      )
      .join("\n")}
  </div>
  <div>
    ${tabs
      .map(
        (t, i) =>
          `<div data-tab-content style="padding:12px; border:1px solid #ccc; border-top:none; display:${i === 0 ? 'block' : 'none'};">${t.content}</div>`
      )
      .join("\n")}
  </div>
</div>

<script>
function showTab(btn, index){
  const container = btn.closest('[data-tabs-container]');
  const buttons = container.querySelectorAll('[data-tab-button]');
  const contents = container.querySelectorAll('[data-tab-content]');
  buttons.forEach((b,i)=>b.style.background = i===index ? '#eee' : '#fff');
  contents.forEach((c,i)=>c.style.display = i===index ? 'block' : 'none');
}
</script>
`;
    setGeneratedCode(html.trim());
  };

  const selectedTab = tabs.find((t) => t.id === selectedTabId);

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "16px", gap: "16px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "left" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Tabs Generator</h2>
      </div>

      {/* Responsive 3-Column Layout */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",              
          gap: "24px",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT: Tab Titles */}
        <div
          style={{
            flex: "1 1 250px",          
            border: "1px solid #ccc",
            padding: "8px",
            minWidth: "250px",
            maxWidth: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>Tab Titles</h3>
            <button
              onClick={handleAddTab}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              + Add Tab
            </button>
          </div>

          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setSelectedTabId(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px",
                marginBottom: "4px",
                cursor: "pointer",
                backgroundColor: selectedTabId === tab.id ? "#f0f0f0" : "transparent",
                borderRadius: "4px",
              }}
            >
              <input
                value={tab.title}
                onChange={(e) => handleEditTab(tab.id, "title", e.target.value)}
                style={{ flex: 1, marginRight: "6px", padding: "4px" }}
              />
              <button onClick={() => handleRemoveTab(tab.id)} style={{ padding: "4px 8px" }}>
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* MIDDLE: Tab Content Editor */}
        <div
          style={{
            flex: "2 1 350px",          
            border: "1px solid #ccc",
            padding: "8px",
            minWidth: "300px",
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Tab Content</h3>
          {selectedTab ? (
            <textarea
              value={selectedTab.content}
              onChange={(e) => handleEditTab(selectedTab.id, "content", e.target.value)}
              style={{ width: "100%", height: "300px", padding: "8px", resize: "vertical" }}
            />
          ) : (
            <p>Select a tab to edit its content.</p>
          )}
        </div>

        {/* RIGHT: Generate HTML */}
        <div
          style={{
            flex: "1.5 1 300px",
            border: "1px solid #ccc",
            padding: "8px",
            minWidth: "280px",
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Output</h3>
          <button
            onClick={handleGenerateCode}
            style={{ padding: "8px 16px", marginBottom: "8px", cursor: "pointer" }}
          >
            Generate HTML
          </button>
          {generatedCode && (
            <textarea
              readOnly
              value={generatedCode}
              style={{
                width: "100%",
                height: "260px",
                fontFamily: "monospace",
                fontSize: "12px",
                padding: "4px",
                resize: "vertical",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsGenerator;
