import { useMemo, useState } from "react";

import { mindmapContentData } from "../data/mindmapContentData";
import { generateMindMap } from "../utils/generateMindMap";

export function useMindMap() {
  const [selectedTopicId, setSelectedTopicId] = useState(
    mindmapContentData[0]?.id
  );

  const [selectedNode, setSelectedNode] = useState(null);

  const selectedTopic = useMemo(() => {
    return mindmapContentData.find((topic) => topic.id === selectedTopicId);
  }, [selectedTopicId]);

  const graphData = useMemo(() => {
    return generateMindMap(selectedTopic);
  }, [selectedTopic]);

  function handleTopicChange(topicId) {
    setSelectedTopicId(topicId);
    setSelectedNode(null);
  }

  function handleNodeClick(node) {
    setSelectedNode(node.data);
  }

  function closeNodeDetail() {
    setSelectedNode(null);
  }

  return {
    topics: mindmapContentData,
    selectedTopic,
    selectedTopicId,
    selectedNode,
    nodes: graphData.nodes,
    edges: graphData.edges,
    handleTopicChange,
    handleNodeClick,
    closeNodeDetail,
  };
}