import { component$, useSignal } from "@builder.io/qwik";
import  { type DocumentHead,server$ } from "@builder.io/qwik-city";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generateTextFromImage = server$(async function* (imageBase64: string) {
  // @ts-ignore
  const genAI = new GoogleGenerativeAI(this.env.get('GOOGLE_API_KEY'));
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision",generationConfig : {
     maxOutputTokens: 100,
  } });

  const prompt = `Deskripsikan gambar berikut ini, jangan mengulangi kata kata yang sama`;
 
  const imageParts = [
    
    {
      inlineData: {
        data: imageBase64,
        mimeType:"image/png"
      },
    },

    ];

  const result = await model.generateContentStream([prompt, ...imageParts]);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
      yield chunkText.replace(/_/g,"");

  }
  
});
function speakText(text: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1; // Set pitch
    utterance.rate = 1; // Set rate
    utterance.volume = 0.8; // Set volume

    // Select an Indonesian voice
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(voice => voice.lang === 'id-ID');

    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    } else {
      // Fallback to a generic voice if Indonesian voice is not available
      console.warn('Indonesian voice not found. Using a generic voice.');
    }

    window.speechSynthesis.speak(utterance);
  } else {
    console.error('Text-to-speech not supported in this browser.');
  }
}
 const displayMediaOptions = {
  video: {
    displaySurface: "monitor",
  },
   audio: {
    suppressLocalAudioPlayback: false,
   }
};
// @ts-ignore
 async function startCapture(videoElem) {


  try {
    videoElem.srcObject =
    // @ts-ignore
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

  } catch (err) {
    console.error(err);
  }
}
// @ts-ignore
  function stopCapture(videoElem) {
  const tracks = videoElem.srcObject.getTracks();
  // @ts-ignore
  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}
// @ts-ignore
function takeVideoScreenshot(videoElem) {
   const canvas = document.createElement('canvas');
   canvas.width = videoElem.videoWidth;
   canvas.height = videoElem.videoHeight;
   const context = canvas.getContext('2d');
   // @ts-ignore
   context.drawImage(videoElem, 0, 0, canvas.width, canvas.height);

   const imageDataURL = canvas.toDataURL('image/png');
   return imageDataURL.replace("data:image/png;base64,","")
   
  
 }
// @ts-ignore
function delay(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }
export default component$(() => {
  const videoRef = useSignal<Element>();
  const imgRef = useSignal<Element>();
  const generatedText = useSignal<string>();
 
  const checkVideoRef = useSignal<Boolean>(false);
  const checkSpeak = useSignal<Boolean>(false);
  // @ts-ignore
    return (
    <>
    
    <button  onClick$={()=>{
      // @ts-ignore
        // eslint-disable-next-line qwik/valid-lexical-scope
      checkVideoRef.value=true;
      // @ts-ignore
        // eslint-disable-next-line qwik/valid-lexical-scope
      checkSpeak.value=true
      startCapture(videoRef.value);}}>start</button>
    <button disabled={checkVideoRef.value && !checkSpeak.value} onClick$={async () => {
      try{
        // @ts-ignore
          // eslint-disable-next-line no-constant-condition
        while(true){
          // @ts-ignore
            // eslint-disable-next-line qwik/valid-lexical-scope
          checkVideoRef.value=false;
          // @ts-ignore
            // eslint-disable-next-line qwik/valid-lexical-scope
          checkSpeak.value=false
          console.log("speak")
          const imageBase64=takeVideoScreenshot(videoRef.value);

          if (imgRef.value) {
            (imgRef.value as HTMLImageElement).src = "data:image/png;base64," + imageBase64;
          }
          generatedText.value="";
          const response = await generateTextFromImage(imageBase64);
          for await (const chunk of response) {
            const chunkText = chunk;
            generatedText.value+=chunkText;

            speakText(chunkText)
          }
          // @ts-ignore
            // eslint-disable-next-line qwik/valid-lexical-scope
          checkVideoRef.value=true;
          // @ts-ignore
            // eslint-disable-next-line qwik/valid-lexical-scope
          checkSpeak.value=true
          console.log("delay")
          await delay(50000)
        }  
      }catch(e){
        // @ts-ignore
        generatedText.value=e.message
        // @ts-ignore
        speakText(e.message)
        // @ts-ignore
          // eslint-disable-next-line qwik/valid-lexical-scope
        checkVideoRef.value=true;
        // @ts-ignore
          // eslint-disable-next-line qwik/valid-lexical-scope
        checkSpeak.value=true
      }
      
      
    }}>speak</button>
    
    <button disabled={checkVideoRef.value && !checkSpeak.value} onClick$={()=>{
      // @ts-ignore
        // eslint-disable-next-line qwik/valid-lexical-scope
      checkVideoRef.value=false;
      // @ts-ignore
        // eslint-disable-next-line qwik/valid-lexical-scope
      checkSpeak.value=false
      stopCapture(videoRef.value);}}>stop</button>
    <video  width="320" height="240" ref={videoRef} id="video" autoplay></video>
    gambare:
    <img ref={imgRef} src="" width="320" height="240"/>
      <h1>Narrated Text:</h1>
      <p>
        {generatedText.value}
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
