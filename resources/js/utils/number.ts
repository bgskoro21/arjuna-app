// utils/number.ts
export function formatNumber(
  value: number | string,
  options?: { locale?: string; currency?: string; style?: 'decimal' | 'currency' }
) {
  const number = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(number)) return value;

  return new Intl.NumberFormat(options?.locale ?? 'id-ID', {
    style: options?.style ?? 'decimal',
    currency: options?.currency ?? 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}
