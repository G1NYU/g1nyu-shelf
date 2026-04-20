const ANILIST_API = 'https://graphql.anilist.co';

function normalize(entry) {
  return {
    id: entry.media.id,
    title: entry.media.title.english || entry.media.title.romaji || entry.media.title.native,
    subtitle: entry.media.format,
    image: entry.media.coverImage?.extraLarge || entry.media.bannerImage,
    banner: entry.media.bannerImage || entry.media.coverImage?.extraLarge,
    genres: entry.media.genres || [],
    tags: (entry.media.tags || []).map((t) => t.name).slice(0, 5),
    score: entry.score || entry.media.averageScore || null,
    link: entry.media.siteUrl,
    description: entry.media.description || '',
    country: entry.media.countryOfOrigin || '',
    status: entry.status || '',
  };
}

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
              countryOfOrigin
              siteUrl
              coverImage { extraLarge large color }
              bannerImage
              description(asHtml: false)
              tags { name rank }
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

  const all = entries.map(normalize).slice(0, 40);
  const manhwa = all.filter((item) => item.country === 'KR' || item.tags.some((t) => /webtoon|manhwa/i.test(t)) || item.genres.some((g) => /webtoon|manhwa/i.test(g)));
  const manga = all.filter((item) => !manhwa.some((m) => m.id === item.id));

  return { manga, manhwa, all };
}
