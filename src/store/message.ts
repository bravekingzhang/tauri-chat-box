import { defineStore } from "pinia";
import { Message, MessageRepository } from "@/repository/message";

// import { useSessionStore } from "./session";

export const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    messageList: [] as Message[],
  }),
  actions: {
    async fetchMessageList(session_id: string) {
      const messages =
        await MessageRepository.getInstance().loadMessageBySessionId(
          session_id
        );
      console.log('messages load success',session_id,messages);
      this.messageList = messages;
    },
    async addMessage(message: Message) {
      await MessageRepository.getInstance().addMessage(message);
      await this.fetchMessageList(message.session_id);
    },
  },
});
