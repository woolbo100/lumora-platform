"use client";

import { useEffect } from "react";

function shouldHandleHomeAnchor(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (event.defaultPrevented || event.button !== 0) {
    return false;
  }

  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }

  const href = anchor.getAttribute("href");
  return href === "/";
}

export function HomeRedirectAnchorHandler() {
  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href="/"]');

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (!shouldHandleHomeAnchor(event, anchor)) {
        return;
      }

      event.preventDefault();
      window.location.assign(`${window.location.origin}/`);
    }

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  return null;
}
