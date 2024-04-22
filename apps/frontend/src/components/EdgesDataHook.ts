import { useState } from "react";
import { Edges } from "database";

const EdgesCustomHook = () => {
  const [edgesData, setEdgesData] = useState<Edges[]>([]);
  return { edgesData, setEdgesData };
};

export default EdgesCustomHook;
