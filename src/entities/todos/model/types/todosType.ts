export interface ITodo {
  userId: number | null;
  id: number;
  title: string;
  body: string;
  completed: boolean;
}

export interface ITodoState {
  meta: {
    total_items: 5;
    total_pages: 3;
    current_page: 1;
    per_page: 2;
    remaining_count: 3;
  };
  items: ITodo[];
}
