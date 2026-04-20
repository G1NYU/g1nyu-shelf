export async function getBooks() {
  const books = [
    {
      title: 'The Setting Sun',
      subtitle: 'Osamu Dazai',
      image: 'https://covers.openlibrary.org/b/isbn/9780811200320-L.jpg',
      link: 'https://openlibrary.org/',
    },
    {
      title: 'No Longer Human',
      subtitle: 'Osamu Dazai',
      image: 'https://covers.openlibrary.org/b/isbn/9780811204816-L.jpg',
      link: 'https://openlibrary.org/',
    },
    {
      title: 'Kafka on the Shore',
      subtitle: 'Haruki Murakami',
      image: 'https://covers.openlibrary.org/b/isbn/9781400079273-L.jpg',
      link: 'https://openlibrary.org/',
    },
    {
      title: 'Convenience Store Woman',
      subtitle: 'Sayaka Murata',
      image: 'https://covers.openlibrary.org/b/isbn/9780802128251-L.jpg',
      link: 'https://openlibrary.org/',
    },
  ];

  return books;
}
