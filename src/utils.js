import { Children } from 'react';
import slugify from 'slugify';

export const getChildrenText = (children) => {
  let text = '';

  Children.map(children, (child) => {
    if (typeof child === 'string') {
      text += child;
    } else {
      text += `-${getChildrenText(child.props.children)}`;
    }
  });

  return text;
};

export const makeSlug = (children) =>
  slugify(getChildrenText(children).toLowerCase(), {
    remove: /[^ a-z0-9-]/g,
    lower: true,
  });
