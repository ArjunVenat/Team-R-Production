import React, {useEffect, useRef} from "react";
import firstFloorMap from "./maps/00_thelowerlevel1.png";

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(canvasCtxRef.current);

    const image = new Image();
    image.src = firstFloorMap;

    useEffect(() => {
        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
        }
    }, []);

    function draw() {
        setCtx(canvasCtxRef.current);
        if (ctx !== null) {
            ctx!.beginPath();
            ctx!.drawImage(image, 0, 0, 5000, 3400);
            ctx!.moveTo(0, 0);
            ctx!.lineTo(5000, 3400);
            ctx!.stroke();
        }
    }

    setTimeout(draw, 100);
    return (
        <canvas ref={canvasRef} height={"3400"} width={"5000"} className="absolute top-0 left-0 max-h-screen"></canvas>

    );
}
