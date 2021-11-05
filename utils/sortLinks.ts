import { Url } from '@context/urls/types';

type TagLink = { tag: string; links: Url[] };

// generate array of array for each tag
const sortLinks = (links: Url[]) => {
  // reduce over links and collect tags

  let tagLinks = links.reduce<TagLink[]>(
    (acc, link) => {
      const tags = link.tags.map<TagLink>((tag) => ({ tag, links: [] }));
      return [...acc, ...tags];
    },
    [],
  );

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
