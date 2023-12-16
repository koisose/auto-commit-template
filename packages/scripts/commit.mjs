import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { execSync } from 'child_process'
dotenv.config();
import ky from 'ky';

const API_KEY = process.env.GOOGLE_API_KEY; // Replace with your actual API key
const systemMessage=`You are a commit message generator by creating exactly one commit message by the diff strings without adding unnecessary information! Here is the format of a good commit message from https://karma-runner.github.io/6.4/dev/git-commit-msg.html guides:

---
<emoji> <type>(<scope>): <subject>
<body>
---

With allowed <type> values are feat, fix, perf, docs, style, refactor, test, and build. Translate the commit <subject> and <body> to indonesian language. And here's an example of a good commit message:

---
😆 fix(middleware): ensure Range headers adhere more closely to RFC 2616
Add one new dependency, use \`range-parser\` (Express dependency) to compute range. It is more well-tested in the wild.
---

git diff:`;
const genAI = new GoogleGenerativeAI(API_KEY);
async function listModel(){
    const response = await ky.get('https://generativelanguage.googleapis.com/v1beta/models?key='+API_KEY).json();
    return response
}

async function run() {
    const allModel=await listModel();
    const geminiProTokenLimit=allModel.models[3].inputTokenLimit;
   
    const diffString = execSync(`git add -A && git diff --staged`).toString()
    if (!diffString.trim()) {
        throw { status: 5001, message: 'No changes to commit' }
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `${systemMessage}
        ${diffString}
        `
    const { totalTokens } = await model.countTokens(prompt);
    if(totalTokens<=geminiProTokenLimit){
        

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
//        execSync(`git reset`);
        execSync(`printf "${text.replace(/\`/gi, '\\\`')}" | git commit -F-`);
        execSync('git push -u origin HEAD')
        process.exit();
    }else{
        execSync(`git reset`);
        process.exit();
    }


}

run();