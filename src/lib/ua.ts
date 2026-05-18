import { useEffect, useState } from 'react';

// Detect in-app webviews where heavy WebGL (aurora + model-viewer) is
// known to misbehave or stall the page: Instagram, Facebook, Threads,
// TikTok. Returns false on SSG render; flips to true after mount if the
// UA matches, so the page can swap to a lightweight version.
export function useIsRestrictedWebView() {
    const [restricted, setRestricted] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent || '';
        // Instagram/Facebook on iOS embed "Instagram" or "FBAN/FBAV" in the UA.
        // Android variant includes "Instagram" and "wv" (WebView).
        const match = /Instagram|FBAN|FBAV|FB_IAB|Threads|TikTok/i.test(ua);
        if (match) setRestricted(true);
    }, []);

    return restricted;
}
