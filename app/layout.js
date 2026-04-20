export const metadata = {
  title: 'G1NYU Shelf',
  description: 'A neo-otaku media shelf for manga, manhwa, music, and books.',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
