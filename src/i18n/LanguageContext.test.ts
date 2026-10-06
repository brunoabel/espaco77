import { describe, expect, it } from "vitest";

import { applyDocumentLanguage } from "./LanguageContext";

describe("applyDocumentLanguage", () => {
  it("synchronizes the document language for assistive technology", () => {
    const root = { lang: "pt" };

    applyDocumentLanguage("en", root);

    expect(root.lang).toBe("en");
  });
});
