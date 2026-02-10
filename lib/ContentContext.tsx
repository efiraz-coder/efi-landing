"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { SiteContent } from "./content";
import { DEFAULT_CONTENT } from "./content";

const ContentContext = createContext<SiteContent>(DEFAULT_CONTENT);

export function useContent() {
  return useContext(ContentContext);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.hero) {
          setContent(data);
        }
      })
      .catch(() => {
        // Use defaults silently
      });
  }, []);

  return (
    <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
  );
}
