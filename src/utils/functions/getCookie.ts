export function getCookie(name: string, cookies: string): string {
  const cookie: Record<string, string> = {};
  cookies.split(';').forEach((el) => {
    const [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });
  return cookie[name];
}
