export function latexEscape(text: string): string {
  return text
    .replace(/&/g, '\\&')
    .replace(/\_/g, '\\_')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}
