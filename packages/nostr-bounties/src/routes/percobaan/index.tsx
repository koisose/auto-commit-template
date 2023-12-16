import { component$,useSignal  } from "@builder.io/qwik";
import  { type DocumentHead,server$,routeLoader$} from "@builder.io/qwik-city";
import {encodeToHex} from '~/utils/encode'

import {textGenerate} from '@koisose/ai'


const generateText = server$(async (prompt:string) => {
  return await textGenerate(process.env.GOOGLE_API_KEY,prompt);
});
export const useDomain = routeLoader$((requestEvent) => {
  return process.env.NODE_ENV !== "production"?requestEvent.request.url:requestEvent.request.url.replace(/http:\/\//g, 'https://'); // returns the domain name
});

export const head: DocumentHead = ({ resolveValue }) => {
  const domain = resolveValue(useDomain);
  return {
    title: `Nostr Bounties`,
    meta: [
      {
        property: "og:title",
        content: "Nostr Bounties",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:description",
        content: "Find bounty from nostr using AI",
      },
      {
        property: "og:image",
        content: `${domain}og/${encodeToHex(domain)+".png"}`,
      },
      {
            "name": "twitter:card",
            "content": "summary_large_image"
        },
        {
            "name": "twitter:site",
            "content": "@koisose_"
        },
        {
            "name": "twitter:creator",
            "content": "@koisose_"
        },
        {
            "name": "twitter:title",
            "content": "Nostr Bounties"
        },
        {
            "name": "twitter:description",
            "content": "Find nostr bounties with ai"
        },
        {
            "property": "twitter:image",
          "content": `${domain}og/${encodeToHex(domain)+".png"}`
        },
      {
        "property": "og:image:type",
        "content": "image/png"
      },
      {
        "property": "og:image:width",
        "content": "512"
      },
      {
        "property": "og:image:height",
        "content": "512"
      },

      {
        "name": "googlebot",
        "content": "index, follow"
      },
      {
        "name": "bingbot",
        "content": "index, follow"
      },
      {
        "name": "slurp",
        "content": "index, follow"
      },
      {
        "name": "duckduckbot",
        "content": "index, follow"
      },
      {
        "name": "baiduspider",
        "content": "index, follow"
      },
      {
        "name": "yandexbot",
        "content": "index, follow"
      },
      {
        "name": "naver",
        "content": "index, follow"
      },
      {
        "name": "facebookexternalhit",
        "content": "index, follow"
      },
      {
        "name": "twitterbot",
        "content": "index, follow"
      }
],
};
};
export default component$(() => {
  const inputPrompt= useSignal("");
  const generatedText = useSignal("");
  return (
    <>
    <div class="flex flex-col m-5">
      <textarea bind:value={inputPrompt}  class="rounded-md border border-gray-300 p-2 grow mb-2"></textarea>
      <button     onClick$={async() =>{
        const generated=await generateText(inputPrompt.value);
        generatedText.value=generated;
      }} class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</button>
    </div>
    <div class="m-5 rounded-md bg-gray-200 border border-gray-300 p-4 shadow-md">
      {generatedText.value}
    </div>


    </>
  );
});
