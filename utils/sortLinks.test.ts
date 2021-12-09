import { sortLinks } from '.';
import { Url } from '@context/types';

const links: Url[] = [
  {
    _id: '1',
    name: 'btest',
    slug: 'test',
    url: 'test',
    isListed: true,
    tags: ['#one', '#two'],
    opens: [],
  },
  {
    _id: '2',
    name: 'ctest',
    slug: 'test1',
    url: 'test1',
    isListed: false,
    tags: ['#three'],
    opens: [],
  },
  {
    _id: '3',
    name: 'atest',
    slug: 'test2',
    url: 'test2',
    isListed: true,
    tags: ['#two', '#three'],
    opens: [],
  },
];

describe('sortLinks', () => {
  it('remove unlisted links if not logged in', () => {
    const sortedLinks = sortLinks(links, false);
    expect(sortedLinks[sortedLinks.length - 1].links.length).toBe(2);
  });

  it('should organize links by tag  a-z', () => {
    const sortedLinks = sortLinks(links, true);
    // sortedLinks[0].tag //?
    expect(sortedLinks[0].tag).toBe('#one');
    expect(sortedLinks[1].tag).toBe('#three');
    expect(sortedLinks[2].tag).toBe('#two');

    expect(sortedLinks[0].links[0].name).toBe('btest');
    expect(sortedLinks[1].links[0].name).toBe('atest');
    expect(sortedLinks[1].links[1].name).toBe('ctest');
    expect(sortedLinks[2].links[0].name).toBe('atest');
    expect(sortedLinks[2].links[1].name).toBe('btest');
  });
});
