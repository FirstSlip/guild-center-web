export type Message = {
  sender: {
    tag: string;
  };
  data: string;
  time: string;
  status: boolean;
  messageId: string;
};
