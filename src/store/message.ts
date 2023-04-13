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
      this.messageList = messages;
      this.messageRely = null;
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
          this.addMessage({
            session_id: message.session_id,
            role: "assistant",
            text: response,
          },false);
        },
        (error) => {
          this.addMessage({
            session_id: message.session_id,
            role: "assistant",
            text: error.message,
          });
        },
        message.session_id,
        true
      );

    },
    async addMessage(message: Message,needRefresh = true) {
      await MessageRepository.getInstance().addMessage(message);
      if(needRefresh){
        await this.fetchMessageList(message.session_id);
      }
    },
  },
});
