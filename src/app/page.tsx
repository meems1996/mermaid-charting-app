"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Button } from "@/components/ui/button";
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';


type MermaidProps = {
  chart: string;
  id: string;
};

export default function Home() {

  const [code, setCode] = useState(`graph TD\nA[Start] --> B{Is it working?}\nB -->|Yes| C[Done]\nB -->|No| D[Fix it]`);
  const [rendered, setRendered] = useState(code);
  const [savedCharts, setSavedCharts] = useState<string[]>([]);

  const handleSave = () => {
    setSavedCharts((prev) => [...prev, code]);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="border rounded-md overflow-hidden flex-1">
          <CodeMirror
            value={code}
            height="500px"
            extensions={[markdown()]}
            onChange={(value) => setCode(value)}
            theme="dark"
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              highlightActiveLine: true,
            }}
          />
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button onClick={() => setRendered(code)}>Run</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>

        {/* Rendered Chart */}
        <div className="border rounded-md p-4 bg-white flex-1 overflow-auto">
          <Mermaid chart={rendered} id="live-preview"/>
        </div>
      </div>

      {/* Saved Charts */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Saved Charts</h2>
        {savedCharts.length === 0 ? (
          <p className="text-gray-500">No charts saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedCharts.map((chart, index) => (
              <div key={index} className="border rounded-md p-4 bg-white">
                <Mermaid chart={chart} id={`saved-chart-${index}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Mermaid({ chart, id }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const renderChart = async () => {
      // try {
        mermaid.initialize({ startOnLoad: false });

        // Clear previous render just in case
        ref.current.innerHTML = "";

        mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch((error) => {
          console.error("Error rendering chart:", error);
          if (ref.current) {
            ref.current.innerHTML = `<div class="text-red-500">Error rendering chart: ${error}</div>`;
          }
        });
    }
      // Run in next animation frame to ensure DOM is ready
      requestAnimationFrame(renderChart);
  }, [chart, id]);

  return <div ref={ref} />
}
