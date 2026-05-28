import { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from "reactflow";
import { toPng } from "html-to-image";

import CustomNode from "./CustomNode";
import MindMapToolbar from "./MindMapToolbar";
import NodeDetailPanel from "./NodeDetailPanel";

const nodeTypes = {
  custom: CustomNode,
};

function MindMapCanvas({
  nodes,
  edges,
  selectedNode,
  onNodeClick,
  onCloseNode,
}) {
  const flowWrapperRef = useRef(null);
  const { fitView } = useReactFlow();

  const handleResetView = useCallback(() => {
    fitView({
      padding: 0.28,
      duration: 600,
    });
  }, [fitView]);

  const handleExport = useCallback(async () => {
    if (!flowWrapperRef.current) return;

    const dataUrl = await toPng(flowWrapperRef.current, {
      backgroundColor: "#f7f1e5",
      quality: 1,
    });

    const link = document.createElement("a");
    link.download = "mindmap-ho-chi-minh.png";
    link.href = dataUrl;
    link.click();
  }, []);

  return (
    <div
      ref={flowWrapperRef}
      className="relative h-[820px] overflow-hidden rounded-[2rem] border border-yellow-700/20 bg-[#f7f1e5] shadow-2xl shadow-red-950/10"
    >
      <MindMapToolbar onResetView={handleResetView} onExport={handleExport} />

      <NodeDetailPanel node={selectedNode} onClose={onCloseNode} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onNodeClick(node)}
        fitView
        minZoom={0.18}
        maxZoom={1.35}
        defaultViewport={{ x: 0, y: 0, zoom: 0.65 }}
        className="bg-[#f7f1e5]"
      >
        <Background color="#d6a738" gap={28} size={1} />

        <Controls />

        <MiniMap
          pannable
          zoomable
          nodeColor={(node) => {
            if (node.data?.nodeType === "root") return "#450a0a";
            if (node.data?.nodeType === "main") return "#b8860b";
            return "#f5f5f4";
          }}
          maskColor="rgba(69, 10, 10, 0.08)"
        />
      </ReactFlow>
    </div>
  );
}

export default MindMapCanvas;
