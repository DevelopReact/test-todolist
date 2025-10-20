import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAddTodoMutation } from '../../api/todosApi';

interface AddTodoFormProps {
  onClose: () => void;
}

export const AddTodoForm: FC<AddTodoFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    completed: false,
    userId: null
  });

  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    try {
      await addTodo({
        title: formData.title,
        userId: formData.userId,
        completed: formData.completed
      }).unwrap();

      // Reset form and close modal
      setFormData({ title: '', completed: false, userId: null });
      onClose();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'userId'
          ? parseInt(value) || 1
          : name === 'completed'
          ? value === 'true'
          : value
    }));
  };

  return createPortal(
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Add New Todo</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-2xl'
            type='button'
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800'
              placeholder='Enter todo title'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Status
            </label>
            <div className='flex space-x-4'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='completed'
                  value='false'
                  checked={!formData.completed}
                  onChange={handleChange}
                  className='mr-2 text-blue-600 focus:ring-blue-500'
                />
                <span className='text-sm text-gray-700'>Not Completed</span>
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='completed'
                  value='true'
                  checked={formData.completed}
                  onChange={handleChange}
                  className='mr-2 text-blue-600 focus:ring-blue-500'
                />
                <span className='text-sm text-gray-700'>Completed</span>
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor='userId'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              User ID
            </label>
            <input
              type='number'
              id='userId'
              name='userId'
              value={formData.userId || ''}
              onChange={handleChange}
              min='1'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800'
            />
          </div>

          <div className='flex justify-end space-x-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isLoading || !formData.title.trim()}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              {isLoading ? 'Adding...' : 'Add Todo'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
