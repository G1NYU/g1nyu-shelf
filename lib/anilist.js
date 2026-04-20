const ANILIST_API = 'https://graphql.anilist.co';

export async function getAniListCollection() {
  const userName = process.env.ANILIST_USERNAME || 'G1NYU';

  const query = `
    query ($userName: String) {
      MediaListCollection(userName: $userName, type: MANGA) {
        lists {
          name
          entries {
            score
            status
            media {
              id
              title { romaji english native }
              type
              format
              genres
              averageScore
              siteUrl
              coverImage { extraLarge large color }
              bannerImage
              description(asHtml: false)
            }
          }
        }
      }
    }
  `;

  const res = await fetch(ANILIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { userName } }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  const lists = json?.data?.MediaListCollection?.lists || [];
  const entries = lists.flatMap((list) => list.entries || []);

  const favorites = entries
    .filter((entry) => ['MANGA', 'NOVEL', 'ONE_SHOT'].includes(entry.media?.format) || entry.media?.type === 'MANGA')
    .slice(0, 24)
    .map((entry) => ({
      id: entry.media.id,
      title: entry.media.title.english || entry.media.title.romaji || entry.media.title.native,
      subtitle: entry.media.format,
      image: entry.media.coverImage?.extraLarge || entry.media.bannerImage,
      banner: entry.media.bannerImage || entry.media.coverImage?.extraLarge,
      genres: entry.media.genres || [],
      score: entry.score || entry.media.averageScore || null,
      link: entry.media.siteUrl,
      description: entry.media.description || '',
    }));

  const manga = favorites.filter((item) => !item.genres.some((g) => /webtoon|manhwa/i.test(g)));
  const manhwa = favorites.filter((item) => item.genres.some((g) => /webtoon|manhwa/i.test(g)));

  return { manga, manhwa, all: favorites };
}
