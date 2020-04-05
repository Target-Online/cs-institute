import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { realTimedbApi, expoApi } from '../../api';

const registerForPushNotificationsAsync = async userId => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return;

  realTimedbApi.updateData('users', userId, {
    deviceId: await Notifications.getExpoPushTokenAsync()
  });
}


const sendPushNotifications = (users, title, message) => {
  var notifications = [];
  users.map((user) => {
    user.deviceId && notifications.push({ "to": user.deviceId, "title": title, "body": message, "sound": "default" });
  });
  expoApi.sendPushNotifications(notifications);
}

export {
  registerForPushNotificationsAsync,
  sendPushNotifications
}



