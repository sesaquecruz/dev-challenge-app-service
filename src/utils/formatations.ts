function getOnlyCnpjDigits(cnpj: string): string {
  return cnpj.replace(/[^\d]/g, "");
}

export { getOnlyCnpjDigits };
