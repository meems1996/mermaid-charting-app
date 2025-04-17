"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Button } from "@/components/ui/button";
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';


type MermaidProps = {
  chart: string;
};

export default function Home() {

  const [code, setCode] = useState(`graph TD\nA[Start] --> B{Is it working?}\nB -->|Yes| C[Done]\nB -->|No| D[Fix it]`);
  const [rendered, setRendered] = useState(code);

  return (
    <div className="space-y-4 max-w-3xl mx-auto mt-10">
      <div className="border rounded-md overflow-hidden">
        <CodeMirror
          value={code}
          height="200px"
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
      <Button onClick={() => setRendered(code)}>Render</Button>
      <div className="border p-4 rounded-md">
        <Mermaid chart={rendered} />
      </div>
    </div>
  );
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useRef(`mermaid-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    if (!ref.current) return;

    const renderChart = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false
        });

        const { svg } = await mermaid.render(id.current, chart);

        ref.current!.innerHTML = svg;
      } catch(error) {
        console.error("Error rendering chart:", error);
        ref.current!.innerHTML = `<div class="text-red-500">Error rendering chart: ${error}</div>`;
      }
    }

    renderChart();
  }, [chart]);

  return (
    <div
      ref={ref}
    />
  );
}
