import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import copy from 'clipboard-copy';
import { Subject, from } from 'rxjs';
import { switchMap, tap, delay } from 'rxjs/operators';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LinkIcon from '@material-ui/icons/Link';
import { Heading } from '@smallstep/step-ui';

import { makeSlug } from '../utils';

const WEBSITE_BASE_URL = 'https://smallstep.com';

const HBase = ({ component, variant, color, mt, mb, children }) => {
  const [hover, setHover] = useState(false);
  const [copyHover, setCopyHover] = useState(false);

  const copyMessage = 'Copy link to clipboard';
  const [tooltip, setTooltip] = useState(copyMessage);
  const copyClick$ = useState(new Subject())[0];

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const slug = makeSlug(children);
  // TODO does this work?
  const url = `${WEBSITE_BASE_URL}${window.pathname}#${slug}`;

  const showTooltip = mdUp && copyHover;

  // listen for copy button clicks and show "Copied!" text
  useEffect(() => {
    const sub = copyClick$
      .pipe(
        switchMap(text =>
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
      component={component}
      variant={variant}
      color={color}
      mt={mt}
      mb={mb}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      css={css`
        display: flex;
        align-items: center;
        ${theme.breakpoints.up('md')} {
          margin-left: -38px;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }
      `}
    >
      <div>{children}</div>
      <div
        css={css`
          margin-left: ${theme.spacing(1)}px;
          ${theme.breakpoints.up('md')} {
            margin-left: 0;
            margin-right: ${theme.spacing(1)}px;
          }
        `}
      >
        <Tooltip title={tooltip} placement="bottom" open={showTooltip}>
          <IconButton
            size="small"
            href={url}
            onClick={event => {
              if (!mdUp) {
                return;
              }
              event.preventDefault();
              copyClick$.next(url);
            }}
            onMouseEnter={() => setCopyHover(true)}
            onMouseLeave={() => setCopyHover(false)}
            css={css`
              color: ${theme.palette.text.grey};
              ${theme.breakpoints.up('md')} {
                color: ${theme.palette.text.primary};
                visibility: ${hover ? 'visible' : 'hidden'};
              }
            `}
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Heading>
  );
};

HBase.propTypes = {
  component: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string,
  mt: PropTypes.number,
  mb: PropTypes.number,
  children: PropTypes.node.isRequired,
};

HBase.defaultProps = {
  color: undefined,
  mt: 4,
  mb: 2,
};

export default HBase;
