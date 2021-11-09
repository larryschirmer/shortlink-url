import uniq from 'lodash/uniq';
import sortby from 'lodash/sortBy';
import { Url, TagLink } from '@context/types';

// generate array of array for each tag
const sortLinks = (links: Url[], isLoggedIn: boolean) => {
  // remove unlisted links if not logged in
  const listedLinks = isLoggedIn ? links : links.filter((link) => link.isListed);

  // sort links by alphabetical order
  const linksAZ = sortby(listedLinks, 'name');

  // reduce over links and collect tags
  const tagLinks = uniq(
    listedLinks.reduce<string[]>((acc, link) => [...acc, ...link.tags], []),
  ).map<TagLink>((tag) => ({ tag, links: [] }));

  const allLinks = { tag: 'All Links', links: linksAZ };

  // map over tags and add link to tag
  linksAZ.forEach((link) => {
    const tags = link.tags;
    if (tags.length) {
      link.tags.forEach((tag) => {
        const tagLink = tagLinks.find((t) => t.tag === tag);
        if (tagLink) tagLink.links.push(link);
      });
    }
  });

  return [...sortby(tagLinks, 'tag'), allLinks]
};

export default sortLinks;
