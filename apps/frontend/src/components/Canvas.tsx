import React, {useEffect, useRef} from "react";
import firstFloorMap from "./maps/00_thelowerlevel1.png";
import axios from "axios";
import { Nodes } from "database";

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    const [path, setPath] = React.useState< Nodes[] >();

    const image = new Image();
    image.src = firstFloorMap;

    useEffect(() => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
        }
    }, []);

    useEffect(() => {
        fetchNodes();
    }, []);

    useEffect(() => {
        async function fetchPath() {
            const res = await axios.get('/api/map/pathfind', {
                params: {
                    startNodeID: "CCONF002L1",
                    endNodeID: "CRETL001L1",
                }
            });
            if (res.status === 200) {
                console.log("Successfully fetched path");
            } else {
                console.error("Failed to fetch path");
            }
            console.log(res.data);
            setPath (res.data);
        }
        fetchPath().then();
    }, []);

    async function fetchNodes() {
        try {
            const res = await axios.get("/api/admin/allnodes");
            if (res.status === 200) {
                console.log("Successfully fetched nodes");
                return res.data;
            } else {
                console.error('Failed to fetch nodes');
            }
        } catch (error) {
            console.error('An error occurred while fetching nodes:', error);
        }
    }

    async function draw(ctx: CanvasRenderingContext2D) {
        const nodesData = await fetchNodes();

        if (nodesData && path) {
            ctx.drawImage(image, 0, 0, 5000, 3400);
            for (let i = 0; i < path!.length - 1; i++) {
                const node = path![i];
                ctx.beginPath();
                ctx.moveTo(Number(node.Xcoord), Number(node.Ycoord));
                ctx.lineWidth = 5;
                ctx.lineTo(Number(path![i + 1].Xcoord), Number(path![i + 1].Ycoord));
                ctx.strokeStyle = 'blue';
                ctx.stroke();
            }
            for (let i = 0; i < nodesData.length; i++) {
                const node = nodesData[i];
                ctx.beginPath();
                ctx.arc(node.Xcoord, node.Ycoord, 10, 0, 2 * Math.PI);
                ctx.strokeStyle = 'white';
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    setTimeout(() => {
        if (canvasCtxRef.current) {
            draw(canvasCtxRef.current);
        }
    }, 100);

    return (
        <canvas ref={canvasRef} height={"3400"} width={"5000"} className="absolute top-0 left-0 max-h-screen"></canvas>
    );
}
