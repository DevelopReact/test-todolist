// react
import { FC } from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ page, setPage }) => {
  return (
    <div className='mt-2 flex items-center justify-between'>
      <div className='text-sm text-gray-300'>Showing page {page} of todos</div>
      <div className='flex space-x-2'>
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
        >
          Previous
        </button>
        <span className='px-4 py-2 text-sm font-medium text-gray-900 bg-blue-50 border border-blue-200 rounded-md'>
          {page}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200'
        >
          Next
        </button>
      </div>
    </div>
  );
};
