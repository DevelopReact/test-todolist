// react
import { FC, useState } from 'react';
import { ITodo } from '../../model/types/todosType';
import { DeleteButton } from '@/shared/ui';
import { useDeleteTodoMutation } from '../../api/todosApi';
import { EditTodoForm } from '../EditTodoForm/EditTodoForm';

interface TodoProps extends ITodo {}

export const Todo: FC<TodoProps> = ({ id, title, userId, completed }) => {
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [showEditForm, setShowEditForm] = useState(false);

  const onDeleteTodoClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the todo click
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(id).unwrap();
        console.log('Todo deleted successfully');
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  const onTodoClick = () => {
    setShowEditForm(true);
  };
  return (
    <>
      <div
        key={id}
        className='p-2 hover:bg-gray-100 transition-colors duration-200 min-w-3xl cursor-pointer'
        onClick={onTodoClick}
      >
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0'>
          <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
            <span className='text-xs font-semibold text-blue-600'>#{id}</span>
          </div>
        </div>
        <div className='flex-1 min-w-0'>
          <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
            {title}
          </h3>
          <div className='mt-2 flex items-center text-xs text-gray-500 gap-2'>
            <span
              className={`px-2 py-1 rounded-full ${
                completed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {completed ? 'Completed' : 'Not Completed'}
            </span>
            <span className={`bg-gray-100 px-2 py-1 rounded-full`}>
              UserId: {userId}
            </span>
          </div>
        </div>
        <DeleteButton
          onDeleteTodoClick={onDeleteTodoClick}
          isLoading={isDeleting}
        />
      </div>
      </div>
      
      {/* Edit Todo Form Modal */}
      {showEditForm && (
        <EditTodoForm
          todo={{ id, title, userId, completed, body: '' }}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
};
