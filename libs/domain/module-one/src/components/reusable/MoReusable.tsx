import { FC, PropsWithChildren } from 'react';

export const MoReusable: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mo-reusable">
      <h1>MO Reusable</h1>
      <div>{children}</div>
    </div>
  );
};
