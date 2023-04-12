import { defineStore } from "pinia";
import { Session } from "@/repository/session";
import { SessionRepository } from "@/repository/session";

export const useSessionStore = defineStore({
  id: "session",
  state: () => ({
    sessionList: [] as Session[],
  }),
  getters: {
    getSessionList(state) {
      return state.sessionList as Session[];
    },
  },
  actions: {
    async fetchSessionList() {
      const sessions =
        await SessionRepository.getInstance().loadConversations();
      this.sessionList = sessions;
    },
    async createSession(name: string) {
      await SessionRepository.getInstance().createSession("我是测试session");
      await this.fetchSessionList();
    },
    async editSession(session: Session) {
      await SessionRepository.getInstance().updateSessionName(
        session.id,
        session.name
      );
      await this.fetchSessionList();
    },
    async deleteSession(id: string) {
      await SessionRepository.getInstance().deleteConversation(id);
      await this.fetchSessionList();
    },
  },
});
