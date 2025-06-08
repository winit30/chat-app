export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
};
