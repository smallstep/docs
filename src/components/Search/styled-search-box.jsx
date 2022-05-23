import styled, { css } from 'styled-components';
import SearchBox from './search-box';

const open = css`
  width: 18em;
  background: ${({ theme }) => theme.background};
  cursor: text;
  margin: 0em;
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
`;
