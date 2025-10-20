import { createClient, OAuthStrategy } from "@wix/sdk";

export const useWixClient = () => {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  if (!clientId) {
    // If clientId is missing, avoid creating the client which may throw.
    console.warn("NEXT_PUBLIC_WIX_CLIENT_ID missing — skipping Wix client creation.");
    return null;
  }

  const strategy = OAuthStrategy({ clientId });

  // Some SDK internals iterate over `auth`. Ensure we provide an iterable while
  // preserving the strategy shape. Types in the SDK are strict, so cast to any
  // to avoid TypeScript errors here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authIterable = ([strategy] as unknown) as any;

  const wixClient = createClient({ auth: authIterable });

  return wixClient;
};
