import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Tile, Heading } from '@smallstep/step-ui';

import Link from '../../ui/components/Link';

const COLORS = {
  default: {
    icon: 'text.secondary',
    heading: 'secondary',
  },
  blue: {
    icon: 'text.blue',
    heading: 'blue',
  },
};

const ProductTile = ({ href, icon, title, color, children }) => (
  <Link href={href} underline="none">
    <Tile button p={4}>
      <Box textAlign="left">
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            display="flex"
            alignItems="center"
            color={COLORS[color].icon}
            mr={1}
          >
            {icon}
          </Box>
          <Heading variant="subtitle2" color={COLORS[color].heading} mb={0}>
            {title}
          </Heading>
        </Box>
        {children}
      </Box>
    </Tile>
  </Link>
);

ProductTile.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ProductTile.defaultProps = {
  color: 'default',
};

export default ProductTile;
