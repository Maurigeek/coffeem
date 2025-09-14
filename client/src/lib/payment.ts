export function luhnCheck(cardNumber: string): boolean {
  const sanitized = (cardNumber || '').replace(/\s+/g, '');
  if (!/^\d{12,19}$/.test(sanitized)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export type CardBrand = 'visa' | 'mastercard' | 'unknown';

export function detectBrand(cardNumber: string): CardBrand {
  const n = (cardNumber || '').replace(/\s+/g, '');
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(n)) return 'visa';
  if (/^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/.test(n)) return 'mastercard';
  return 'unknown';
}
