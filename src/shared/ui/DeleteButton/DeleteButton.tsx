// react
import { FC } from 'react';

interface DeleteButtonProps {
  onDeleteTodoClick: (e: React.MouseEvent) => void;
  isLoading?: boolean;
}

export const DeleteButton: FC<DeleteButtonProps> = ({
  onDeleteTodoClick,
  isLoading = false
}) => {
  return (
    <div className='flex-shrink-0'>
      <button
        className='text-red-300 hover:text-red-600 transition-colors duration-200 p-1 disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={onDeleteTodoClick}
        disabled={isLoading}
        title={isLoading ? 'Deleting...' : 'Delete todo'}
      >
        {isLoading ? (
          <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-red-600'></div>
        ) : (
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        )}
      </button>
    </div>
  );
};
