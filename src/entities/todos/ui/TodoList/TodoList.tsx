// react
import { FC, useState } from 'react';
import { useGetTodosQuery } from '@/entities/todos/api/todosApi';

import { Todo } from '../Todo.tsx/Todo';
import { AddTodoForm } from '../AddTodoForm/AddTodoForm';
import { Error, Loader, Pagination } from '@/shared/ui';

export const TodoList: FC = ({}) => {
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);

  const { data, error, isLoading } = useGetTodosQuery(page);
  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      {/* Header */}
      <div className='mb-2'>
        <div className='flex justify-between items-center mb-2'>
          <h1 className='text-3xl font-bold text-gray-300'>Todo List</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2'
          >
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
                d='M12 4v16m8-8H4'
              />
            </svg>
            Add Todo
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        {data && data.items.length > 0 ? (
          <div className='divide-y divide-gray-200'>
            {data.items.map(({ id, title, body, userId, completed }) => (
              <Todo
                key={id}
                id={id}
                title={title}
                body={body}
                completed={completed}
                userId={userId}
              />
            ))}
          </div>
        ) : (
          <div className='p-12 text-center min-w-3xl'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              No todos found
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Get started by creating a new todo.
            </p>
          </div>
        )}
      </div>

      <Pagination page={page} setPage={setPage} />

      {/* Add Todo Form Modal */}
      {showAddForm && <AddTodoForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};
