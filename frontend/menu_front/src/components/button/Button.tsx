import React from 'react';

interface IButton {
  id?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ id, className, type, children, onClick }: IButton): JSX.Element {
  return (
    <button id={id ? id : ''} type={type ? type : 'button'} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
