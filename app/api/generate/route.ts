import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";

export async function POST(req: Request){

    const defaultPrompt = "Enhance the following tweet to make it more engaging, clear, and impactful while maintaining its original intent. if there are bullet point in the tweet add those and also add relevant details.You will also get the which type of emotion should a tweet deliver so make the tweet according to that emotion.Only return the improved tweet without any explanations or additional text and make it of altest 3 lines your tweet is :  "

    console.log("hi");

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

        const data = await req.json();

        const prompt = data.body;

        const result = await  model.generateContent({contents:[{role: 'user', parts: [{text:defaultPrompt +  prompt}]}]});
        

        const output = result.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";

    console.log(output);

    return NextResponse.json({ output });

        


    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error}, {status: 500})
        
    }
}