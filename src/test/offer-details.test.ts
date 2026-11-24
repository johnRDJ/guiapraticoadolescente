import { describe, expect, it } from "vitest";
import { offerDetails, formatOfferPrice, offerItems, offerAssurances } from "../lib/offer-details";

describe("Preserved offer conditions", () => {
  it("keeps the original price at R$ 97,00", () => {
    expect(offerDetails.originalPrice).toBe(97);
    expect(formatOfferPrice(offerDetails.originalPrice)).toBe("97,00");
  });
  it("keeps the promotional price at R$ 24,97", () => {
    expect(offerDetails.promotionalPrice).toBe(24.97);
    expect(formatOfferPrice(offerDetails.promotionalPrice)).toBe("24,97");
  });
  it("keeps the guarantee at 14 days", () => {
    expect(offerDetails.guaranteeDays).toBe(14);
  });
  it("includes five complimentary materials", () => {
    expect(offerDetails.bonusCount).toBe(5);
  });
  it("keeps the current Cakto purchase destination", () => {
    expect(offerDetails.checkoutUrl).toBe("https://pay.cakto.com.br/pwcar69_1217800");
  });
  it("keeps the two rewritten offer list lines", () => {
    expect(offerItems).toContain(
      "Orientações para favorecer o vínculo e compreender as dificuldades de comunicação do adolescente.",
    );
    expect(offerItems).toContain(
      "Direcionamento para transformar a queixa inicial em uma direção de investigação clara.",
    );
    expect(offerItems.join(" ")).not.toMatch(/objetivos terapêuticos|não sei/);
  });
  it("keeps the three compact assurances below the purchase button", () => {
    expect(offerAssurances).toEqual(["ACESSO IMEDIATO", "COMPRA 100% SEGURA", "14 DIAS DE GARANTIA"]);
    expect(offerAssurances.join(" • ")).toBe("ACESSO IMEDIATO • COMPRA 100% SEGURA • 14 DIAS DE GARANTIA");
    expect(offerAssurances.some((item) => item.includes("\n"))).toBe(false);
  });
});