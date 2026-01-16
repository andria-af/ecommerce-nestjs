type WhatsappSettings = {
  whatsappNumber: string;
};

export function buildWhatsappMessage(
  productTitle: string,
  priceLabel?: string | null
) {
  return (
    `Olá! Tenho interesse no produto "${productTitle}".\n\n` +
    (priceLabel ? `Valor: ${priceLabel}\n` : "") +
    `Poderia me passar mais informações?`
  );
}

export function buildWhatsappUrl(settings: WhatsappSettings, message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${settings.whatsappNumber}?text=${text}`;
}
