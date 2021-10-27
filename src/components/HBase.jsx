import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Subject, from } from 'rxjs';
import { switchMap, tap, delay } from 'rxjs/operators';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LinkIcon from '@material-ui/icons/Link';
import { Heading } from '@smallstep/step-ui';

import { makeSlug } from '../utils';

const WEBSITE_BASE_URL = 'https://smallstep.com';

const useStyles = makeStyles((theme) => ({
  heading: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginLeft: '-38px',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
    },
  },
  permalink: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
      marginRight: theme.spacing(1),
    },
  },
  permalinkButton: {
    color: theme.palette.text.grey,
    [theme.breakpoints.up('md')]: {
      color: theme.palette.text.primary,
    },
  },
}));

const HBase = ({ component, variant, color, mt, mb, children }) => {
  const [hover, setHover] = useState(false);
  const [copyHover, setCopyHover] = useState(false);
  const [url, setUrl] = useState();

  const copyMessage = 'Copy link to clipboard';
  const [tooltip, setTooltip] = useState(copyMessage);
  const copyClick$ = useState(new Subject())[0];

  const classes = useStyles();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const showTooltip = mdUp && copyHover;

  const slug = makeSlug(children);
  const search = typeof window !== 'undefined' && window.location.search;

  useEffect(() => {
    const { pathname, search } = window.location;
    const url = `${WEBSITE_BASE_URL}${pathname}${search}#${slug}`;
    setUrl(url);
  }, [slug, search]);

  // listen for copy button clicks and show "Copied!" text
  useEffect(() => {
    const sub = copyClick$
      .pipe(
        switchMap((text) =>
          from(copy(text)).pipe(
            tap(() => setTooltip('Copied!')),
            delay(3000)
          )
        )
      )
      .subscribe(() => {
        setTooltip(copyMessage);
      });

    return () => sub.unsubscribe();
  }, [copyClick$]);

  return (
    <Heading
      id={slug}
      component={component || variant}
      variant={variant}
      color={color}
      mt={mt}
      mb={mb}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={classes.heading}
    >
      <div>{children}</div>
      <div className={classes.permalink}>
        <Tooltip title={tooltip} placement="bottom" open={showTooltip}>
          <IconButton
            size="small"
            href={url}
            onClick={(event) => {
              if (!mdUp) {
                return;
              }
              event.preventDefault();
              copyClick$.next(url);
            }}
            onMouseEnter={() => setCopyHover(true)}
            onMouseLeave={() => setCopyHover(false)}
            className={classes.permalinkButton}
            style={{ visibility: hover ? 'visible' : 'hidden' }}
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Heading>
  );
};

HBase.propTypes = {
  component: PropTypes.string,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string,
  mt: PropTypes.number,
  mb: PropTypes.number,
  children: PropTypes.node.isRequired,
};

HBase.defaultProps = {
  component: null,
  color: undefined,
  mt: 4,
  mb: 2,
};

export default HBase;
