import uniq from 'lodash/uniq';
import { Url, TagLink } from '@context/types';

// generate array of array for each tag
const sortLinks = (links: Url[], isLoggedIn: boolean) => {
  // remove unlised links if not logged in
  const filteredLinks = isLoggedIn ? links : links.filter(link => link.isListed);

  // reduce over links and collect tags
  const tagLinks = uniq(
    filteredLinks.reduce<string[]>((acc, link) => [...acc, ...link.tags], []),
  ).map<TagLink>((tag) => ({ tag, links: [] }));

  let untaggedLinks = { tag: '#untagged', links: [] as Url[] };

  // map over tags and add link to tag
  filteredLinks.forEach((link) => {
    const tags = link.tags;
    if (!tags.length) {
      untaggedLinks.links.push(link);
    } else {
      link.tags.forEach((tag) => {
        const tagLink = tagLinks.find((t) => t.tag === tag);
        if (tagLink) tagLink.links.push(link);
      });
    }
  });

  return [...tagLinks, untaggedLinks];
};

export default sortLinks;
