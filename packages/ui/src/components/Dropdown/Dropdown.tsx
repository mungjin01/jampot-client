import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Icon } from '../Icon/Icon';
import { useTheme } from '@emotion/react';

interface DropdownProps {
  title: string;
  contents: string[];
  selectedContents: string[];
  setSelectedContents: (selected: string[]) => void;
  width?: string;
}

export const Dropdown = ({
  title,
  contents,
  selectedContents,
  setSelectedContents,
  width = '312px',
}: DropdownProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const selectContainerRef = useRef<HTMLDivElement>(null);

  const oustideClickHandler = (e: MouseEvent) => {
    if (
      selectContainerRef.current &&
      !selectContainerRef.current.contains(e.target as HTMLElement)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', oustideClickHandler);
    return () => document.removeEventListener('click', oustideClickHandler);
  }, []);

  const handleToggleDropdown = () => setOpen((prev) => !prev);

  const handleSelectContent = (content: string) => {
    setSelectedContents([
      ...(selectedContents.includes(content)
        ? selectedContents.filter((item) => item !== content)
        : [...selectedContents, content]),
    ]);
  };

  return (
    <Dropdowns ref={selectContainerRef} width={width}>
      <DropdownHeader onClick={handleToggleDropdown}>
        <DropdownLabel>{title}</DropdownLabel>
        <DropdownSelected>
          {selectedContents.length === 0 ? (
            <span className="no-filter"> </span>
          ) : (
            <span className="selected">
              {`${selectedContents[0]}${
                selectedContents.length > 1
                  ? ` 외 ${selectedContents.length - 1}`
                  : ''
              }`}
            </span>
          )}
          <Icon
            name={open ? 'arrowDown' : 'arrowUp'}
            fill={theme.palette.yellow500}
            size={24}
          />
        </DropdownSelected>
      </DropdownHeader>
      {open && (
        <DropdownExpandContent>
          {contents.map((content) => (
            <DropdownItem
              key={content}
              onClick={() => handleSelectContent(content)}
              selected={selectedContents.includes(content)}
            >
              {content}
            </DropdownItem>
          ))}
        </DropdownExpandContent>
      )}
    </Dropdowns>
  );
};

const Dropdowns = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 12px;
  width: ${({ width }) => width};
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 16px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray200};
  background: ${({ theme }) => theme.palette.white};
  cursor: pointer;
`;

const DropdownLabel = styled.span`
  ${({ theme }) => theme.typo.body1m};
  color: ${({ theme }) => theme.palette.gray700};
`;

const DropdownSelected = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${({ theme }) => theme.typo.body1m};

  .no-filter {
    color: ${({ theme }) => theme.palette.gray300};
  }
  .selected {
    color: ${({ theme }) => theme.palette.yellow500};
  }
`;

const DropdownExpandContent = styled.div`
  position: absolute;
  top: 62px;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.gray200};
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const DropdownItem = styled.button<{ selected: boolean }>`
  padding: 12px 24px;
  height: 48px;
  text-align: left;
  ${({ theme }) => theme.typo.body1m};
  color: ${({ selected, theme }) =>
    selected ? theme.palette.yellow500 : theme.palette.gray800};
  background-color: ${({ theme }) => theme.palette.white};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.gray100};
  }
`;
