export function getInitials(fullName: string): string {
  const words = fullName.split(' ');
  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return initials;
}
