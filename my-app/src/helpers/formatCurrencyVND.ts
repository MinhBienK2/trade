export function formatVND(data: number): string {
  return data.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
