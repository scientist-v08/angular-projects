import { TasksInterface } from "./model/task.model";

export const dummyTasks: TasksInterface[] = [
  {
    id: 1,
    userId: 1,
    name: 'Jasmine Washington',
    title: 'Master Angular',
    summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: '2025-12-31',
  },
  {
    id: 2,
    userId: 3,
    name: 'Marcus Johnson',
    title: 'Build first prototype',
    summary: 'Build a first prototype of the online shop website',
    dueDate: '2024-05-31',
  },
  {
    id: 3,
    userId: 3,
    name: 'Marcus Johnson',
    title: 'Prepare issue template',
    summary: 'Prepare and describe an issue template which will help with project management',
    dueDate: '2024-06-15',
  },
]
