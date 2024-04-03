import React, { useEffect, useRef } from "react";
import firstFloorMap from "./maps/00_thelowerlevel1.png";
import axios from "axios";
import { Nodes } from "database";

export default function Canvas(props: { path: Nodes[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  const image = new Image();
  image.src = firstFloorMap;

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext("2d");
    }
  }, []);

  useEffect(() => {
    fetchNodes();
  }, []);
  console.log(props);

  async function fetchNodes() {
    try {
      const res = await axios.get("/api/admin/allnodes");
      if (res.status === 200) {
        console.log("Successfully fetched nodes");
        return res.data;
      } else {
        console.error("Failed to fetch nodes");
      }
    } catch (error) {
      console.error("An error occurred while fetching nodes:", error);
    }
  }

  async function draw(ctx: CanvasRenderingContext2D) {
    const nodesData = await fetchNodes();
    if (nodesData && props.path) {
      ctx.drawImage(image, 0, 0, 5000, 3400);
      for (let i = 0; i < props.path!.length - 1; i++) {
        const node = props.path![i];
        ctx.beginPath();
        ctx.moveTo(Number(node.Xcoord), Number(node.Ycoord));
        ctx.lineWidth = 5;
        ctx.lineTo(
          Number(props.path![i + 1].Xcoord),
          Number(props.path![i + 1].Ycoord),
        );
        ctx.strokeStyle = "blue";
        ctx.stroke();

        const angle = Math.atan2(
          Number(props.path![i + 1].Ycoord) - Number(node.Ycoord),
          Number(props.path![i + 1].Xcoord) - Number(node.Xcoord),
        );

        const arrowX = Number(props.path![i + 1].Xcoord) - 10 * Math.cos(angle);
        const arrowY = Number(props.path![i + 1].Ycoord) - 10 * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
          arrowX - 15 * Math.cos(angle - Math.PI / 6),
          arrowY - 15 * Math.sin(angle - Math.PI / 6),
        );
        ctx.lineTo(
          arrowX - 15 * Math.cos(angle + Math.PI / 6),
          arrowY - 15 * Math.sin(angle + Math.PI / 6),
        );
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
      }
      for (let i = 0; i < nodesData.length; i++) {
        const node = nodesData[i];
        ctx.beginPath();
        ctx.arc(node.Xcoord, node.Ycoord, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = "transparent";
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  setTimeout(() => {
    if (canvasCtxRef.current) {
      draw(canvasCtxRef.current);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      height={"3400"}
      width={"5000"}
      className="top-0 left-0 max-h-screen"
    ></canvas>
  );
}
