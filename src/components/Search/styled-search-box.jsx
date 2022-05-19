import styled, { css } from "styled-components"
import SearchBox from "./search-box"

const open = css`
  width: 18.2em;
  background: ${({ theme }) => theme.background};
  cursor: text;
  margin-left: -1.6em;
  margin-right: 0.72em;
  padding-left: 1.6em;
`

const closed = css`
  width: 0;
  background: transparent;
  cursor: pointer;
  margin-left: 24em;
  padding-left: 1em;
`

export default styled(SearchBox)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 0;

  .SearchInput {
    outline: none;
    border: ${({ hasFocus }) => (hasFocus ? "auto" : "none")};
    font-size: 1.4em;
    transition: 100ms;
    border-radius: 2px;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    ${({ hasFocus }) => (hasFocus ? open : closed)}
  }

  .SearchIcon {
    width: 1.4em;
    margin: 0.5sem;
    color: ${({ theme }) => theme.foreground};
    pointer-events: none;
  }
`