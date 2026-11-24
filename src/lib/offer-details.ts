export const offerDetails = {
  originalPrice: 97,
  promotionalPrice: 24.97,
  guaranteeDays: 14,
  bonusCount: 5,
  checkoutUrl: "https://pay.cakto.com.br/pwcar69_1217800",
} as const;

export const formatOfferPrice = (price: number) => price.toFixed(2).replace(".", ",");

export const offerAssurances = [
  "ACESSO IMEDIATO",
  "COMPRA 100% SEGURA",
  `${offerDetails.guaranteeDays} DIAS DE GARANTIA`,
] as const;

export const offerItems = [
  "Guia digital completo, direto ao ponto e aplicável à prática clínica.",
  "Estrutura do que observar, perguntar e priorizar nas primeiras sessões com adolescentes.",
  "Orientações para favorecer o vínculo e compreender as dificuldades de comunicação do adolescente.",
  "Caminhos para investigar o contexto familiar e escolar e compreender a relação com pais e responsáveis.",
  "Direcionamento para transformar a queixa inicial em uma direção de investigação clara.",
  "Ferramentas para organizar o caso e definir os próximos passos.",
  "5 materiais complementares inclusos gratuitamente.",
] as const;