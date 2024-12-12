import { APP_URL } from './constants/constants';

// unsafe Token
export const authToken = import.meta.env.VITE_VIDEOSDK_TOKEN;
export const createMeeting = async () => {
  const res = await fetch(`${APP_URL}/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  return roomId;
};
