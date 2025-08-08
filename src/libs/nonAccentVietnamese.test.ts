import { describe, expect, it } from "vitest";
import ToNonAccentVietnamese, { ConvertToNameFormat } from "./nonAccentVietnamese";

describe("ToNonAccentVietnamese", () => {
  it("removes Vietnamese accents", () => {
    expect(ToNonAccentVietnamese("Đặng")).toBe("Dang");
    expect(ToNonAccentVietnamese("Trần")).toBe("Tran");
  });
});

describe("ConvertToNameFormat", () => {
  it("formats text to slug-style", () => {
    expect(ConvertToNameFormat("Hello World!")).toBe("Hello-World");
  });
});

