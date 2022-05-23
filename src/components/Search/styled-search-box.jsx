import styled, { css } from 'styled-components';
import SearchBox from './search-box';

const open = css`
  width: 15em;
  background: ${({ theme }) => theme.background};
  cursor: text;
  margin: 0em;
`;

const closed = css`
  width: 0;
  background: transparent;
  cursor: pointer;
  margin-left: 16.8em;
  padding-left: 1em;
`;

export default styled(SearchBox)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3em;

  .SearchInput {
    outline: none;
    border: ${({ hasFocus }) => (hasFocus ? 'auto' : 'none')};
    font-size: 1.4em;
    transition: 100ms;
    border-radius: 2px;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    ${({ hasFocus }) => open}
  }

  .SearchIcon {
    width: 1.4em;
    margin-right: 2em;
    margin-left: 0.8em;
    color: ${({ theme }) => theme.foreground};
    pointer-events: none;
  }
`;
