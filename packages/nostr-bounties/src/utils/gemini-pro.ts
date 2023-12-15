import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.GOOGLE_API_KEY;
export async function textGenerate(prompt:string):string {
    const allModel=await listModel();
    const geminiProTokenLimit=allModel.models[3].inputTokenLimit;
   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
   const { totalTokens } = await model.countTokens(prompt);
    if(totalTokens<=geminiProTokenLimit){
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text
    }


}

