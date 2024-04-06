import React, { useEffect } from "react";
import axios from "axios";
import { Nodes } from "database";

export default function SVGCanvas(props: {
  path?: Nodes[];
  currentMap: string;
  currentLevel: string;
  nodeClicked?: Nodes | undefined;
  handleNodeClicked?: (node: Nodes) => void;
}) {
  const [nodesData, setNodesData] = React.useState<Nodes[]>([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  // console.log(props);

  async function fetchNodes() {
    try {
      const res = await axios.get("/api/admin/allnodes");
      if (res.status === 200) {
        console.log("Successfully fetched nodes");
        setNodesData(res.data);
      } else {
        console.error("Failed to fetch nodes");
      }
    } catch (error) {
      console.error("An error occurred while fetching nodes:", error);
    }
  }

  function handleCircleClick(node: Nodes) {
    if (props.handleNodeClicked) {
      props.handleNodeClicked(node);
    }
  }

  const filteredNodes = nodesData.filter(
    (node) => node.Floor === props.currentLevel,
  );

  return (
    <svg
      height="100vh"
      width="auto"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 5000 3400"
    >
      <image href={props.currentMap} height="3400" width="5000" />
      {(props.path ?? []).map((node, i) => {
        if (i < (props.path ?? []).length - 1) {
          const nextNode = (props.path ?? [])[i + 1];
          return (
            <line
              x1={node.Xcoord}
              y1={node.Ycoord}
              x2={nextNode.Xcoord}
              y2={nextNode.Ycoord}
              stroke="blue"
              strokeWidth="5"
            />
          );
        }
        return null;
      })}
      {filteredNodes.map((node) => (
        <g onClick={() => handleCircleClick(node)}>
          <circle cx={node.Xcoord} cy={node.Ycoord} r="10" fill="red" />
        </g>
      ))}
    </svg>
  );
}
