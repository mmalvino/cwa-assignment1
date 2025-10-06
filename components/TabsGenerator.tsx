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

  const [generatedCode, setGeneratedCode] = useState("");

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

  const handleGenerateCode = () => {
    const html = `
<div data-tabs-container style="display:flex; flex-direction:column; font-family:sans-serif;">
  <div style="display:flex; gap:4px; border-bottom:2px solid #ccc;">
    ${tabs
      .map(
        (t, i) =>
          `<button data-tab-button onclick="showTab(this, ${i})" style="padding:8px 16px; border:1px solid #ccc; border-bottom:none; background:${i === 0 ? '#eee' : '#fff'}; cursor:pointer;">${t.title}</button>`
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

      {/* Generate HTML Button */}
      <button onClick={handleGenerateCode} style={{ padding: "8px 16px", cursor: "pointer" }}>
        Generate HTML
      </button>

      {/* Generated HTML Output */}
      {generatedCode && (
        <div>
          <h3 style={{ fontWeight: "bold", marginBottom: "4px" }}> Generated HTML:</h3>
          <textarea
            readOnly
            value={generatedCode}
            style={{ width: "100%", height: "300px", fontFamily: "monospace", fontSize: "12px", padding: "4px" }}
          />
        </div>
      )}
    </div>
  );
};

export default TabsGenerator;
