export function slugify(text: string | undefined) {
  return text
    ? text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    : '';
}

export function slugify_file(text: string | undefined) {
  return text
    ? text.replaceAll(':', '').replaceAll('/', '').replaceAll('\"', '_').replaceAll("'", '_').replaceAll('?', '')
    : '';
}

export function createIdGenerator() {
  const ids = new Map<string, number>();

  return (text?: string) => {
    const slug = slugify(text);

    if (!slug) return '';

    const count = ids.get(slug);

    if (count === undefined) {
      ids.set(slug, 1);
      return slug;
    }

    ids.set(slug, count + 1);
    return `${slug}-${count}`;
  };
}
