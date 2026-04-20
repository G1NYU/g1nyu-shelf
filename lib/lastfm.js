const API = 'https://ws.audioscrobbler.com/2.0/';

export async function getLastFmTop() {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USERNAME || 'G1NYU';

  if (!apiKey) {
    return { artists: [], albums: [] };
  }

  const [artistsRes, albumsRes] = await Promise.all([
    fetch(`${API}?method=user.gettopartists&user=${user}&api_key=${apiKey}&format=json&period=12month&limit=12`, { next: { revalidate: 3600 } }),
    fetch(`${API}?method=user.gettopalbums&user=${user}&api_key=${apiKey}&format=json&period=12month&limit=12`, { next: { revalidate: 3600 } }),
  ]);

  const artistsJson = await artistsRes.json();
  const albumsJson = await albumsRes.json();

  const artists = (artistsJson?.topartists?.artist || []).map((artist) => ({
    title: artist.name,
    subtitle: `${artist.playcount} plays`,
    image: artist.image?.[3]?.['#text'] || artist.image?.[2]?.['#text'] || '',
    link: artist.url,
  }));

  const albums = (albumsJson?.topalbums?.album || []).map((album) => ({
    title: album.name,
    subtitle: album.artist?.name || '',
    image: album.image?.[3]?.['#text'] || album.image?.[2]?.['#text'] || '',
    link: album.url,
  }));

  return { artists, albums };
}
