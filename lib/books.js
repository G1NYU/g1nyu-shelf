export async function getBooks() {
  const seeded = (process.env.OPENLIBRARY_BOOKS || '9780811204816,9781400079273,9780802128251,9780811200320')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

  const books = await Promise.all(
    seeded.map(async (isbn) => {
      const searchRes = await fetch(`https://openlibrary.org/search.json?isbn=${isbn}`, {
        next: { revalidate: 86400 },
      });
      const json = await searchRes.json();
      const doc = json?.docs?.[0];

      return {
        title: doc?.title || `Book ${isbn}`,
        subtitle: doc?.author_name?.[0] || 'Unknown author',
        image: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
        link: doc?.key ? `https://openlibrary.org${doc.key}` : 'https://openlibrary.org/',
        tags: doc?.subject?.slice(0, 4) || [],
        description: doc?.first_sentence?.[0] || '',
      };
    })
  );

  return books;
}
