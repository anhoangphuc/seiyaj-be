export function randomString(length: number, withNumber: boolean): string {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(Array(length).keys())
    .map((_) => s.charAt(Math.floor(Math.random() * (withNumber ? s.length : s.length - 10))))
    .join('');
}

export function randomEmail(): string {
  return `${randomString(10, false)}@email.com`;
}

export function randomPassword(): string {
  return `${randomString(10, true)}`;
}
