// react
import { FC } from 'react';

interface LoaderProps {}

export const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className='flex items-center justify-center min-h-[400px]'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
    </div>
  );
};
