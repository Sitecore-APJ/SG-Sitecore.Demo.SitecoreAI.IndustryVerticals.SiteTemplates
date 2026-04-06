export const resolveBackgroundClassFromStyles = (styles: string = ''): string => {
  const styleToClassMap: Record<string, string> = {
    'container-white-background': 'bg-background',
    /** CMS style id; maps to cool neutral section (MOM-style highlights) */
    'container-gold-background': 'bg-background-accent',
    'container-gray-background': 'bg-background-muted',
  };
  const priority = Object.keys(styleToClassMap);
  const matchedStyle = priority.find((style) => styles.includes(style));
  return styleToClassMap[matchedStyle!] || 'bg-background'; // default
};
