export function generateMindMap(topic) {
  if (!topic) {
    return {
      nodes: [],
      edges: [],
    };
  }

  const mainIdeas = topic.mainIdeas || [];
  const mainCount = mainIdeas.length;

  const centerX = 720;
  const centerY = 420;

  // Tự động tăng khoảng cách theo số lượng nhánh chính
  const mainRadius = Math.max(420, 260 + mainCount * 70);
  const childRadius = 270;

  const nodes = [
    {
      id: "root",
      type: "custom",
      position: {
        x: centerX,
        y: centerY,
      },
      data: {
        label: topic.title,
        summary: topic.description,
        nodeType: "root",
      },
    },
  ];

  const edges = [];
  const startAngle = -Math.PI / 2;

  mainIdeas.forEach((idea, index) => {
    const mainAngle = startAngle + (index / mainCount) * Math.PI * 2;

    const mainX = centerX + Math.cos(mainAngle) * mainRadius;
    const mainY = centerY + Math.sin(mainAngle) * (mainRadius * 0.7);

    const mainId = `main-${idea.id || index}`;

    nodes.push({
      id: mainId,
      type: "custom",
      position: {
        x: mainX,
        y: mainY,
      },
      data: {
        label: idea.label,
        summary: idea.summary,
        nodeType: "main",
      },
    });

    edges.push({
      id: `edge-root-${mainId}`,
      source: "root",
      target: mainId,
      animated: true,
      type: "smoothstep",
      style: {
        stroke: "#b8860b",
        strokeWidth: 1.5,
      },
    });

    const children = idea.children || [];
    const childCount = children.length;

    // Góc mở của cụm node con quanh node cha
    const spread =
      childCount <= 1 ? 0 : Math.min(1.35, 0.45 * (childCount - 1));

    children.forEach((child, childIndex) => {
      const offset =
        childCount <= 1
          ? 0
          : -spread / 2 + (childIndex * spread) / (childCount - 1);

      const childAngle = mainAngle + offset;

      // Tăng khoảng cách xen kẽ để tránh node con chồng lên nhau
      const adaptiveChildRadius =
        childRadius + (childIndex % 2 === 0 ? 20 : 70);

      const childX = mainX + Math.cos(childAngle) * adaptiveChildRadius;
      const childY =
        mainY + Math.sin(childAngle) * (adaptiveChildRadius * 0.78);

      const childId = `sub-${idea.id || index}-${childIndex}`;

      nodes.push({
        id: childId,
        type: "custom",
        position: {
          x: childX,
          y: childY,
        },
        data: {
          label: child.label,
          summary: child.summary,
          nodeType: "sub",
        },
      });

      edges.push({
        id: `edge-${mainId}-${childId}`,
        source: mainId,
        target: childId,
        type: "smoothstep",
        style: {
          stroke: "#d6a738",
          strokeWidth: 1.2,
        },
      });
    });
  });

  return {
    nodes,
    edges,
  };
}