"use client";


import { MouseEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    setOutput("")

    try{
      const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({body: prompt})
    })
      const data = await res.json();

      if(res.ok){
        setOutput(data.output)
      } else {
        setOutput(data.error)
      }
  } catch(err){
    console.log(err)
  }
  }
  



  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="flex flex-col justify-center items-center w-full absolute top-[30%] gap-10">
        <h1 className="text-5xl font-bold text-white">
          TweetPeek
        </h1>
        <div className="flex ">
        <textarea  value={prompt} onChange={(e) => setPrompt(e.target.value)} className="bg-gray-800 w-[500px] h-[300px] text-white border-[2px] border-gray-700 rounded-lg p-2" typeof="text" />

        <button onClick={handleSubmit} className="bg-white justify-items-center text-black rounded-lg w-20 h-12">Enhance</button>
        <p dangerouslySetInnerHTML={{__html: output.replace(/\n/g, "<br />")}} className="text-white bg-gray-900 w-[500px] h-[300px] p-5 gap-5 overflow-scroll"></p>
        </div>

      </div>
    </div>
  );
}
