/** ["A", "B", "C"] → "A, B, C" */
export function joinAuthors(authors: string[]): string {
  return authors.join(', ');
}
