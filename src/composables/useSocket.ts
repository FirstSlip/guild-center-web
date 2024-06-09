import { io } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import type { Socket } from 'socket.io-client';

export const useSocket = () => {
  const token = useCookie('token');
  const runtimeConfig = useRuntimeConfig();

  const socket = useState<
    Socket<DefaultEventsMap, DefaultEventsMap>
  >('socket', () =>
    io(runtimeConfig.public.apiUrl, {
      extraHeaders: {
        Authorization: `Bearer ${token.value}`
      }
    })
  );

  const socketReset = () => {
    socket.value.disconnect();
    socket.value = io(runtimeConfig.public.apiUrl, {
      extraHeaders: {
        Authorization: `Bearer ${token.value}`
      }
    });
  };

  return {
    socket,
    socketReset
  };
};
