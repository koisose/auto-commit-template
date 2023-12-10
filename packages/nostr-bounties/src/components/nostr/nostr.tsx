import { component$, useSignal } from "@builder.io/qwik";
//import { palm } from "~/utils/palm";
//import { server$ } from "@builder.io/qwik-city";

//const serverGreeter = server$(async () => {
//    return await palm("haha");
//});
export default component$(() => {
  const closeModal = useSignal(false);
  


  return (
    <>

    <div class="relative w-full h-full flex items-center justify-center py-5">
      <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center space-y-4 text-center">
          <div class="space-y-2">
            <h1 class="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none">
              Nostr Bounties
            </h1>
          </div>
          <div class="space-x-4">
            <button
              onClick$={() => (closeModal.value = !closeModal.value)}
              class="ring-offset-background focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
              Create Bounty
            </button>
            <button class="ring-offset-background focus-visible:ring-ring border-input bg-background inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-gray-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Login with Alby
            </button>
          </div>
        </div>
      </div>
    </div>
    {closeModal.value &&  <div class="relative w-full h-full flex items-center justify-center">
  <div class="max-w-md rounded-md shadow-2xl bg-white p-6 text-center flex flex-col justify-center items-center border border-black border-4">

    <h2 class="mb-4 text-xl font-bold">Create Bounty using ai</h2>
    <textarea class="mb-4 h-24 w-full rounded border p-2" placeholder="Bounty Description"></textarea>
    <button class="ring-offset-background focus-visible:ring-ring hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">
      Generate Bounty using AI
    </button>
    <h2 class="mb-4 mt-4 text-xl font-bold">Create Bounty</h2>
    <div>
      <input class="mb-4 w-full rounded border p-2" placeholder="Bounty Title" type="text" />
      <textarea class="mb-4 h-24 w-full rounded border p-2" placeholder="Bounty Description"></textarea>
      <input class="mb-4 w-full rounded border p-2" placeholder="Bounty Price" type="text" />
      <button class="ring-offset-background focus-visible:ring-ring hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">
        Submit
      </button>
    </div>

  </div>
    </div> }

    <div class="p-3">
      <input
      class="mb-4 w-full rounded border p-2 mr-5"
      placeholder="Search bounty..."
      type="text"
      />
    </div>

      <div
        class="bg-card text-card-foreground m-4 cursor-pointer rounded-lg border shadow-sm hover:shadow-lg"
        data-v0-t="card"
      >
        <div class="flex flex-col items-start gap-2 p-4">
          <h3 class="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
            Bounty Title Here
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Bounty description here...
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Price: $500</p>
        </div>
      </div>
    </>
  );
});
