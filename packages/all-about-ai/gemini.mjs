import { GoogleGenerativeAI } from "@google/generative-ai";
import ky from 'ky';
async function listModel(API_KEY){
    const response = await ky.get('https://generativelanguage.googleapis.com/v1beta/models?key='+API_KEY).json();
    return response
}
export async function textGenerate(API_KEY,prompt) {
    console.log("dassda")
    const genAI = new GoogleGenerativeAI(API_KEY);
    const allModel=await listModel(API_KEY);
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

