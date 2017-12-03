export const slugify = (str: string) =>
  str.toString().toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');

export const redirUrlOr = (str: string): string =>
  new URLSearchParams(window.location.search.slice(1)).get('redirectUrl') || str;
