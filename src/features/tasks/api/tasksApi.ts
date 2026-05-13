import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';
import { TaskLocal } from '../models/local/TaskLocal';
import { TaskServer } from '../models/server/TaskServer';
import { TaskstoLocal } from '../adapters/local/TaskstoLocal';
import { TaskstoServer } from '../adapters/server/TaskstoServer';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Task'],
  endpoints: builder => ({
    getTasks: builder.query<TaskLocal[], string>({
      queryFn: async userId => {
        try {
          const today = new Date().toISOString().split('T')[0];
          const snapshot = await firestore()
            .collection('Tasks')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
          const tasks = snapshot.docs
            .map(doc => TaskstoLocal(doc.id, doc.data() as TaskServer))
            .filter(task =>
              task.type === 'daily' || task.date === today,
            );
          return { data: tasks };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['Task'],
    }),

    createTask: builder.mutation<null, Omit<TaskLocal, 'id'>>({
      queryFn: async task => {
        try {
          await firestore().collection('Tasks').add(TaskstoServer(task));
          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<null, TaskLocal>({
      queryFn: async task => {
        try {
          const { id, ...data } = task;
          await firestore()
            .collection('Tasks')
            .doc(id)
            .update(TaskstoServer(data));
          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Task'],
    }),

    getAllTasks: builder.query<TaskLocal[], string>({
      queryFn: async userId => {
        try {
          const snapshot = await firestore()
            .collection('Tasks')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
          const tasks = snapshot.docs.map(doc =>
            TaskstoLocal(doc.id, doc.data() as TaskServer),
          );
          return { data: tasks };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['Task'],
    }),

    deleteTask: builder.mutation<null, string>({
      queryFn: async id => {
        try {
          await firestore().collection('Tasks').doc(id).delete();
          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
