const { execSync } = require("child_process");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const textToSpeech = require("@google-cloud/text-to-speech");

// Import other required libraries

const util = require("util");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

async function quickStart(text) {
  // The text to synthesize

  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: "id-ID",
      name: "id-ID-Standard-B",
      ssmlGender: "MALE",
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent, "binary");
  execSync(`play output.mp3`, { stdio: "inherit" });

  console.log("Audio content written to file: output.mp3");
}
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "deskripsikan gambar ini sepanjang panjangnya";

  const imageParts = [fileToGenerativePart("screen1.png", "image/png")];

  const result = await model.generateContentStream([prompt, ...imageParts]);
  let text = "";
  for await (const chunk of result.stream) {
    let chunkText = chunk.text();
    console.log(chunkText.replace(/_/g, ""));
    await quickStart(chunkText.replace(/_/g, ""));
  }
}

function delay(delayInMilliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Resolve the Promise after the delay
    }, delayInMilliseconds);
  });
}
async function pocin() {
  try {
    while (true) {
      execSync(`nircmd.exe savescreenshot screen1.png`, { stdio: "inherit" });
      console.log(`Screenshot captured`);
      await run();
      execSync(`rm -rf output.mp3 screen1.png`, { stdio: "inherit" });
      console.log("delay");
      await delay(10000);
    }
  } catch (error) {
    await pocin();
    console.error("Error capturing screenshot:", error.message);
  }
}
pocin();
