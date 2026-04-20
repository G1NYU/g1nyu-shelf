const API = 'https://ws.audioscrobbler.com/2.0/';

function cleanImage(images = []) {
  return images?.[3]?.['#text'] || images?.[2]?.['#text'] || images?.[1]?.['#text'] || '';
}

export async function getLastFmTop() {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USERNAME || 'G1NYU';

  if (!apiKey) {
    return { artists: [], albums: [], recent: [] };
  }

  const [artistsRes, albumsRes, recentRes] = await Promise.all([
    fetch(`${API}?method=user.gettopartists&user=${user}&api_key=${apiKey}&format=json&period=12month&limit=12`, { next: { revalidate: 3600 } }),
    fetch(`${API}?method=user.gettopalbums&user=${user}&api_key=${apiKey}&format=json&period=12month&limit=12`, { next: { revalidate: 3600 } }),
    fetch(`${API}?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=10`, { next: { revalidate: 900 } }),
  ]);

  const artistsJson = await artistsRes.json();
  const albumsJson = await albumsRes.json();
  const recentJson = await recentRes.json();

  const artists = (artistsJson?.topartists?.artist || []).map((artist) => ({
    title: artist.name,
    subtitle: `${artist.playcount} plays`,
    image: cleanImage(artist.image),
    banner: cleanImage(artist.image),
    link: artist.url,
    tags: ['artist', 'lastfm'],
    description: `${artist.name} with ${artist.playcount} plays in your top artists.`,
  }));

  const albums = (albumsJson?.topalbums?.album || []).map((album) => ({
    title: album.name,
    subtitle: album.artist?.name || '',
    image: cleanImage(album.image),
    banner: cleanImage(album.image),
    link: album.url,
    tags: ['album', 'lastfm'],
    description: `${album.name} by ${album.artist?.name || 'Unknown artist'}.`,
  }));

  const recent = (recentJson?.recenttracks?.track || []).map((track) => ({
    title: track.name,
    subtitle: track.artist?.['#text'] || '',
    image: cleanImage(track.image),
    banner: cleanImage(track.image),
    link: track.url,
    tags: ['recent', 'track'],
    description: `Recently played: ${track.name} by ${track.artist?.['#text'] || 'Unknown artist'}.`,
  }));

  return { artists, albums, recent };
}
