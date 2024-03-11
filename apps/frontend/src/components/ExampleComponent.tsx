import { useState } from "react";
import axios from "axios";

//this is a basic counter component to show where components should be placed
export function ExampleComponent() {
  //saves the count
  const [count, setCount] = useState(0);

  //submits the count as a high score
  async function submitHighscore() {
    const data = JSON.stringify({
      time: new Date(),
      score: count,
    });
    console.log(data);
    //sends a post request the /api/high-score
    const res = await axios.post("/api/high-score", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      console.log("added highscore");
    }
  }
  //the html returned from the component
  return (
    <div className={"example-component w-fit flex flex-col gap-5 px-5"}>
      <div>current count {count}</div>
      <button
        className={"border-black border-2 px-5 py-2"}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increment count
      </button>
      <button
        onClick={() => {
          submitHighscore().then();
        }}
      >
        Submit
      </button>
    </div>
  );
}
