import uniq from 'lodash/uniq';
import { Url, TagLink } from '@context/urls/types';

// generate array of array for each tag
const sortLinks = (links: Url[]) => {
  // reduce over links and collect tags
  const tagLinks = uniq(
    links.reduce<string[]>((acc, link) => [...acc, ...link.tags], []),
  ).map<TagLink>((tag) => ({ tag, links: [] }));

  let untaggedLinks = { tag: '#untagged', links: [] as Url[] };

  // map over tags and add link to tag
  links.forEach((link) => {
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
