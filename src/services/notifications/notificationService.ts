import notifee, {
  AndroidImportance,
  TriggerType,
  type TimestampTrigger,
} from '@notifee/react-native';

const CHANNEL_ID = 'orbit-tasks';

async function createChannel(): Promise<void> {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Orbit Tasks',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
}

async function requestPermission(): Promise<boolean> {
  const settings = await notifee.requestPermission();
  return settings.authorizationStatus >= 1;
}

async function scheduleTaskNotification(
  taskId: string,
  title: string,
  scheduledTime: Date,
): Promise<void> {
  await createChannel();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: scheduledTime.getTime(),
  };

  await notifee.createTriggerNotification(
    {
      id: taskId,
      title: 'Orbit - Recordatorio',
      body: title,
      android: {
        channelId: CHANNEL_ID,
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
}

async function cancelTaskNotification(taskId: string): Promise<void> {
  await notifee.cancelNotification(taskId);
}

export const notificationService = {
  requestPermission,
  scheduleTaskNotification,
  cancelTaskNotification,
};
