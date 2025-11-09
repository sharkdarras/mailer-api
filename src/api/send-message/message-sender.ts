export interface MessageSender {
  send(message: Message): Promise<void>;
}

export interface Message {
  sender: {
    email: string;
    fullName?: string;
  };
  recipientEmail: string;
  subject: string;
  body: string;
}
