import React, {useEffect, useRef} from "react";
import firstFloorMap from "./maps/00_thelowerlevel1.png";
export default function Canvas() {

const canvasRef = useRef<HTMLCanvasElement | null>(null);

const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);

const image = new Image();

image.src = firstFloorMap;

    useEffect(() => {
        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
        }
    }, []);

    function Draw() {
        ctx!.drawImage(image, 0, 0, 3000, 1500);
        ctx!.lineTo(3000, 1500);
        ctx!.beginPath(); // Note the Non Null Assertion
        ctx!.moveTo(0, 0);
        ctx!.stroke();
    }



    return (
        <canvas ref={canvasRef} className="absolute top-0 left-0 "> </canvas>

    );
}
