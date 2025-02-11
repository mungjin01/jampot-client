import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Icon } from '../Icon/Icon';

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
  const [open, setOpen] = useState<boolean>(false);
  const selectContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const oustideClickHandler = (e: MouseEvent) => {
      if (
        selectContainerRef.current &&
        !selectContainerRef.current.contains(e.target as HTMLElement)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', oustideClickHandler);

    return () => {
      document.removeEventListener('click', oustideClickHandler);
    };
  }, []);

  return (
    <Dropdowns ref={selectContainerRef} width={width}>
      <DropdownContent onClick={() => setOpen((prev) => !prev)}>
        <DropdownLabel>
          <span>{title}</span>
        </DropdownLabel>
        <DropdownSelected>
          {selectedContents.length === 0 ? (
            <span className="no-filter"> </span>
          ) : (
            <span className="selected">
              {`${selectedContents[0]}${selectedContents.length > 1 ? ` 외 ${selectedContents.length - 1}` : ''}`}
            </span>
          )}
          {open ? (
            <Icon name="arrowDown" size={20} />
          ) : (
            <Icon name="arrowUp" size={20} />
          )}
        </DropdownSelected>
      </DropdownContent>
      {open && (
        <DropdownExpandContent>
          {contents.map((content) => (
            <div
              key={content}
              className="content"
              onClick={() => {
                if (!selectedContents.includes(content))
                  setSelectedContents([...selectedContents, content]);
              }}
            >
              {content}
            </div>
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

const DropdownContent = styled.div`
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

const DropdownLabel = styled.div`
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.typo.body1m};

  .filter-title {
    color: ${({ theme }) => theme.palette.gray700};
  }
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

  overflow: hidden;
  width: 100%;
  border-radius: 8px;

  .content {
    padding: 12px 24px;
    height: 48px;
    align-items: center;
    ${({ theme }) => theme.typo.body1m};
    color: ${({ theme }) => theme.palette.gray800};
    background-color: ${({ theme }) => theme.palette.white};

    &:hover {
      background-color: ${({ theme }) => theme.palette.gray100};
    }
  }
`;
