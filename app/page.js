import ClientHome from '@/components/ClientHome';
import { getAniListCollection } from '@/lib/anilist';
import { getLastFmTop } from '@/lib/lastfm';
import { getBooks } from '@/lib/books';

export default async function HomePage() {
  const [{ manga, manhwa }, { artists, albums }, books] = await Promise.all([
    getAniListCollection(),
    getLastFmTop(),
    getBooks(),
  ]);

  return (
    <ClientHome
      manga={manga}
      manhwa={manhwa}
      artists={artists}
      albums={albums}
      books={books}
    />
  );
}
