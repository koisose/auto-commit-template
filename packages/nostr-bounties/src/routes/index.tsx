import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import NostrComponent from '~/components/nostr/nostr';

export const useDomain = routeLoader$((requestEvent) => {
  const url = new URL(requestEvent.request.url);
  return url.hostname; // returns the domain name
});

export const head: DocumentHead = ({ resolveValue }) => {
  const domain = resolveValue(useDomain);
  return {
    title: `Website at ${domain}`,
    meta: [
      {
        name: "domain",
        content: domain,
      },
    ],
  };
};
export default component$(() => {
//  const location = useLocation();
//  const domain = location.url.hostname;
  return (
    <>
    <NostrComponent/>
    </>
  );
});
