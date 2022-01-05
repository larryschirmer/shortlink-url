import uniq from 'lodash/uniq';
import sortby from 'lodash/sortBy';
import { Url, TagLink, User } from '@models/types';

// generate array of array for each tag
const sortLinks = (links: Url[], isLoggedIn: boolean, user: User | null) => {
  // remove unlisted links if not logged in
  const listedLinks = isLoggedIn ? links : links.filter(link => link.isListed);

  // sort links by alphabetical order
  const linksAZ = sortby(listedLinks, 'name');

  // create group of favorited links
  const favoriteLinks = {
    tag: 'Favorites',
    links: linksAZ.filter(link => user?.favorites.includes(link._id)),
  };

  // reduce over links and collect tags
  const tagLinks = uniq(
    listedLinks.reduce<string[]>((acc, link) => [...acc, ...link.tags], []),
  ).map<TagLink>(tag => ({ tag, links: [] }));

  // map over tags and add link to tag
  linksAZ.forEach(link => {
    const tags = link.tags;
    if (tags.length) {
      link.tags.forEach(tag => {
        const tagLink = tagLinks.find(t => t.tag === tag);
        if (tagLink) tagLink.links.push(link);
      });
    }
  });

  // create group of all links
  const allLinks = { tag: 'All Links', links: linksAZ };

  let list = [...sortby(tagLinks, 'tag'), allLinks];
  if (user?.favorites.length) list = [favoriteLinks, ...list];

  return list;
};

export default sortLinks;
