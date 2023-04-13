import { defineStore } from "pinia";
import { Message, MessageRepository } from "@/repository/message";

export const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    messageList: [] as Message[],
    messageRely: null as Message | null,
  }),
  actions: {
    async fetchMessageList(session_id: string) {
      const messages =
        await MessageRepository.getInstance().loadMessageBySessionId(
          session_id
        );
      console.log("messages load success", session_id, messages);
      this.messageList = messages;
    },
    askGpt(message: Message) {
      MessageRepository.getInstance().askGpt(
        message.text!,
        (data) => {
          this.messageRely = {
            session_id: message.session_id,
            role: "assistant",
            text: data,
          };
        },
        (response) => {
          this.messageRely = null;
          this.addMessage({
            session_id: message.session_id,
            role: "assistant",
            text: response,
          });
        },
        (error) => {
          this.addMessage({
            session_id: message.session_id,
            role: "assistant",
            text: error.message,
          });
        }
      );
    },
    async addMessage(message: Message) {
      await MessageRepository.getInstance().addMessage(message);
      await this.fetchMessageList(message.session_id);
    },
  },
});
