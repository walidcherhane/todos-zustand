import create from "zustand";

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// store

type Store = {
  todos: Todo[];
  newTodo: string;
  addTodo: () => void;
  updateTodo: (id: number, text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  setNewTodo: (text: string) => void;
  loadTodos: (todos: Todo[]) => void;
};

const useStore = create<Store>((set) => ({
  todos: [] as Todo[],
  newTodo: "",
  loadTodos: (todos) => {
    set({ todos });
  },
  setNewTodo: (text: string) => {
    set({ newTodo: text });
  },
  addTodo: () =>
    set((state) => ({ todos: addTodo(state.todos, state.newTodo) })),
  updateTodo: (id: number, text: string) =>
    set((state) => ({ todos: updateTodo(state.todos, id, text) })),
  toggleTodo: (id: number) =>
    set((state) => ({ todos: toggleTodo(state.todos, id) })),
  removeTodo: (id: number) =>
    set((state) => ({ todos: removeTodo(state.todos, id) })),
}));

export default useStore;
