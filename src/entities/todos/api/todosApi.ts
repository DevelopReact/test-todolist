import { jsonInstanceApi } from '@/shared/api/jsonInstanceApi';
import { ITodo, ITodoState } from '../model/types/todosType';

const todosApi = jsonInstanceApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<ITodoState, number>({
      query: (page) => ({
        url: `/tasks?page=${page}&limit=10`,
        method: 'GET'
      }),
      providesTags: ['Todos']
    }),

    getTodoById: build.query<ITodoState, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'GET'
      }),
      providesTags: ['Todos']
    }),

    addTodo: build.mutation<ITodo, Partial<ITodo>>({
      query: (todo) => ({
        url: '/tasks',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),

    updateTodo: build.mutation<ITodoState, Partial<ITodo>>({
      query: (todo) => ({
        url: `/tasks/${todo.id}`,
        method: 'PATCH',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),

    deleteTodo: build.mutation<ITodoState, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todos']
    })
  })
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
  useUpdateTodoMutation
} = todosApi;
