import { ReactNode, useEffect, useRef } from 'react';

interface IClickOutsideProps {
    handleClickOutside: () => void;
    children: ReactNode
}
export const ClickOutsideDiv = ({ children, handleClickOutside }: IClickOutsideProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
        if (divRef.current && !divRef.current.contains(e.target)) {
          handleClickOutside();
        }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={divRef}>{children}</div>;
};

export default ClickOutsideDiv;
