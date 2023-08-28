import styles from './LinkComponent.module.css';

interface LinkAttr {
   name: string;
   value: string;
}

interface ProcessedLink {
   content: string;
   attrs: LinkAttr[];
}

interface LinkComponentProps {
   content: string;
}

type DynamicAttributes = {
   [key: string]: string;
};

export const LinkComponent: React.FC<LinkComponentProps> = ({ content }) => {
   const regex = /<a\b[^>]*>(.*?)<\/a>/g;
   const matches = content.match(regex);
   var processedLinks: ProcessedLink[] = [];

   if (matches) {
      processedLinks = matches.map(match => {
         const linkContentMatch = match.match(/<a\b[^>]*>(.*?)<\/a>/);
         const linkContent = linkContentMatch ? linkContentMatch[1] : '';

         const linkAttrsMatch = match.match(/<a\b([^>]*)>/);
         const linkAttrs = linkAttrsMatch
            ? linkAttrsMatch[1]
               .split(/\s+/)
               .map(attr => {
                  const [attrName, attrValue] = attr.split('=');

                  if (attrName.length === 0) return null;
                  return { name: attrName, value: attrValue ? attrValue.replace(/["']/g, '') : '' };
               })
               .filter(attr => attr !== null) as LinkAttr[]
            : [];

         return { content: linkContent, attrs: linkAttrs };
      });

      if (Array.isArray(processedLinks) && processedLinks.length > 0) {
         return (
            <p>
               {processedLinks.map((link) => {
                  const linkAttrs: DynamicAttributes = link.attrs.reduce((attrsObj, attr) => {
                     if (attr && attr.name) {
                        attrsObj[attr.name] = attr.value;
                     }
                     return attrsObj;
                  }, {} as DynamicAttributes);

                  return (
                     <a key={link.content} className={styles.postlink} {...linkAttrs}>
                        {link.content}
                     </a>
                  );
               })}
            </p>
         );
      }
   }

   return null;
};
