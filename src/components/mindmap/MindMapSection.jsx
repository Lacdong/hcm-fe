import { ReactFlowProvider } from "reactflow";

import { useMindMap } from "../../hooks/useMindMap";

import SectionTitle from "../common/SectionTitle";
import TopicSelector from "./TopicSelector";
import MindMapCanvas from "./MindMapCanvas";

function MindMapSection() {
  const {
    topics,
    selectedTopic,
    selectedTopicId,
    selectedNode,
    nodes,
    edges,
    handleTopicChange,
    handleNodeClick,
    closeNodeDetail,
  } = useMindMap();

  return (
    <section id="mindmap" className="bg-white section-padding">
      <div className="section-container">
        <SectionTitle
          label="Knowledge Graph"
          title="Sơ đồ tri thức"
          description="Chọn một chủ đề, hệ thống sẽ tự tạo sơ đồ dạng node liên kết từ dữ liệu nội dung tương ứng, mô phỏng trải nghiệm graph/canvas giống Obsidian."
        />

        <div className="mt-10">
          <TopicSelector
            topics={topics}
            selectedTopicId={selectedTopicId}
            onChange={handleTopicChange}
          />
        </div>

        {selectedTopic && (
          <div className="mt-8 rounded-[2rem] border border-yellow-700/20 bg-[#fffaf0] p-6">
            <h3 className="text-2xl font-bold text-red-950">
              {selectedTopic.title}
            </h3>

            <p className="mt-3 leading-8 text-stone-600">
              {selectedTopic.description}
            </p>
          </div>
        )}

        <div className="mt-8">
          <ReactFlowProvider>
            <MindMapCanvas
              nodes={nodes}
              edges={edges}
              selectedNode={selectedNode}
              onNodeClick={handleNodeClick}
              onCloseNode={closeNodeDetail}
            />
          </ReactFlowProvider>
        </div>
      </div>
    </section>
  );
}

export default MindMapSection;
