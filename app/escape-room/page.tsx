"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Hotspot = {
  id: string;
  x: number;
  y: number;
  question: string;
  answer: string;
};

type EscapeRoom = {
  id: string;
  title: string;
  description?: string;
  backgroundImage: string;
  timerSeconds: number;
  hotspots: Hotspot[];
};

export default function EscapeRoomPage() {
  const [mode, setMode] = useState<"builder" | "play">("builder");
  const [timerMinutes, setTimerMinutes] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const room: EscapeRoom = {
    id: "default-room",
    title: "Escape Room",
    backgroundImage: "/escape-room-bg.jpg",
    timerSeconds: 60,
    hotspots: [],
  };

  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [tempX, setTempX] = useState(0);
  const [tempY, setTempY] = useState(0);
  const [tempQuestion, setTempQuestion] = useState("");
  const [tempAnswer, setTempAnswer] = useState("");
  const [editingHotspotId, setEditingHotspotId] = useState<string | null>(null);

  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Fetch hotspots from DB for this room
  useEffect(() => {
    async function fetchHotspots() {
      try {
        const res = await fetch(`/api/escape-room/hotspot?roomId=${room.id}`);
        const data: Hotspot[] = await res.json();
        setHotspots(data);
        setTimerMinutes(Math.ceil(room.timerSeconds / 60));
      } catch (err) {
        console.error("Failed to fetch hotspots:", err);
      }
    }
    fetchHotspots();
  }, []);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== "builder") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTempX(e.clientX - rect.left);
    setTempY(e.clientY - rect.top);
    setTempQuestion("");
    setTempAnswer("");
    setEditingHotspotId(null);
    setShowPopup(true);
  };

  const handleEditHotspot = (h: Hotspot) => {
    if (mode !== "builder") return;
    setTempX(h.x);
    setTempY(h.y);
    setTempQuestion(h.question);
    setTempAnswer(h.answer);
    setEditingHotspotId(h.id);
    setShowPopup(true);
  };

  const saveHotspot = async () => {
    if (!tempQuestion.trim() || !tempAnswer.trim()) return;

    try {
      if (editingHotspotId) {
        const res = await fetch(`/api/escape-room/hotspot/${editingHotspotId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ x: tempX, y: tempY, question: tempQuestion, answer: tempAnswer }),
        });
        const updated: Hotspot = await res.json();
        setHotspots((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
      } else {
        const res = await fetch(`/api/escape-room/hotspot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ x: tempX, y: tempY, question: tempQuestion, answer: tempAnswer, roomId: room.id }),
        });
        const newHotspot: Hotspot = await res.json();
        setHotspots((prev) => [...prev, newHotspot]);
      }

      setShowPopup(false);
      setEditingHotspotId(null);
    } catch (err) {
      console.error("Failed to save hotspot:", err);
    }
  };

  const deleteHotspot = async () => {
    if (!editingHotspotId) return;
    try {
      await fetch(`/api/escape-room/hotspot/${editingHotspotId}`, { method: "DELETE" });
      setHotspots((prev) => prev.filter((h) => h.id !== editingHotspotId));
      setShowPopup(false);
      setEditingHotspotId(null);
    } catch (err) {
      console.error("Failed to delete hotspot:", err);
    }
  };

  const submitAnswer = () => {
    if (!activeHotspot || gameOver) return;
    if (playerAnswer.trim().toLowerCase() === activeHotspot.answer.toLowerCase()) {
      const filtered = hotspots.filter((h) => h.id !== activeHotspot.id);
      setHotspots(filtered);
      setActiveHotspot(null);

      if (filtered.length === 0) {
        setShowWinModal(true);
        setGameOver(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    } else {
      alert("Incorrect answer! Try again.");
    }
  };

  const startGame = () => {
    if (hotspots.length === 0) {
      alert("Add at least one hotspot!");
      return;
    }
    setMode("play");
    setTimeLeft(timerMinutes * 60);
    setGameOver(false);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setGameOver(true);
          setShowLoseModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
}, []);


  const formatTime = (seconds: number) => `${Math.floor(seconds/60).toString().padStart(2,"0")}:${(seconds%60).toString().padStart(2,"0")}`;

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      {/* Timer Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <div className="flex items-center gap-3">
          <label className="font-semibold text-lg">Set Timer (minutes):</label>
          <input
            type="number"
            min={1}
            value={timerMinutes}
            onChange={(e) => setTimerMinutes(parseInt(e.target.value))}
            className="border px-3 py-1 rounded bg-white dark:bg-gray-700"
            disabled={mode === "play"}
          />
          {mode === "play" && <span className="ml-4 font-bold text-lg">Time Left: {formatTime(timeLeft)}</span>}
        </div>
        <div className="flex items-center gap-3">
          {mode === "builder" && (
            <button onClick={startGame} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white shadow">
              Save & Start Game
            </button>
          )}
          {mode === "play" && (
            <button onClick={() => {setMode("builder"); timerRef.current && clearInterval(timerRef.current);}} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white shadow">
              Back to Builder
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full mx-auto border-2 rounded-lg overflow-hidden shadow-lg" onClick={handleMapClick}>
        <Image src={room.backgroundImage} alt="Escape Room" width={1600} height={900} className="w-full h-auto object-cover" />
        {mode === "builder" && <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded text-sm">Builder Mode: Click anywhere to add or edit a question.</div>}
        {mode === "play" && <div className="absolute top-4 left-4 bg-green-600 bg-opacity-80 text-white px-4 py-2 rounded text-sm">Play Mode: Answer all hotspots to escape!</div>}

        {hotspots.map(h => (
          <div key={h.id} className="absolute text-8xl font-bold text-blue-300 cursor-pointer select-none" style={{ top: h.y-15, left: h.x-10 }}
            onClick={(e) => {
              e.stopPropagation();
              if (mode === "play" && !gameOver) { setActiveHotspot(h); setPlayerAnswer(""); }
              if (mode === "builder") handleEditHotspot(h);
            }}
          >!</div>
        ))}
      </div>

      {/* Popup for add/edit */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{editingHotspotId ? "Edit Hotspot" : "Add Hotspot"}</h2>
            <div><label className="font-medium">Question:</label>
              <input type="text" value={tempQuestion} onChange={(e) => setTempQuestion(e.target.value)} className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 mt-1"/>
            </div>
            <div><label className="font-medium">Correct Answer:</label>
              <input type="text" value={tempAnswer} onChange={(e) => setTempAnswer(e.target.value)} className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 mt-1"/>
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">Cancel</button>
              {editingHotspotId && <button onClick={deleteHotspot} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Delete</button>}
              <button onClick={saveHotspot} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Play Mode Popup */}
      {activeHotspot && !gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-3">Solve the Riddle</h2>
            <p className="font-medium mb-4">{activeHotspot.question}</p>
            <input type="text" value={playerAnswer} onChange={(e) => setPlayerAnswer(e.target.value)} placeholder="Enter your answer..." className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 mb-4"/>
            <div className="flex justify-end gap-3">
              <button onClick={() => setActiveHotspot(null)} className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white">Cancel</button>
              <button onClick={submitAnswer} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Win/Lose Modals */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg w-80">
            <h2 className="text-xl font-bold mb-3">Congratulations!</h2>
            <p className="mb-4">You escaped the room!</p>
            <button onClick={() => setShowWinModal(false)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Close</button>
          </div>
        </div>
      )}

      {showLoseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg w-80">
            <h2 className="text-xl font-bold mb-3">Time is Up!</h2>
            <p className="mb-4">You ran out of time!</p>
            <button onClick={() => setShowLoseModal(false)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
