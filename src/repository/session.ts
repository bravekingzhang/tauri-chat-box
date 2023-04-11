import { invoke } from "@tauri-apps/api/tauri";
interface Session {
  id: string;
  name: string;
}

class SessionRepository {
  private sessions: Session[];
  static instance: SessionRepository;
  public static getInstance(): SessionRepository {
    if (!SessionRepository.instance) {
      SessionRepository.instance = new SessionRepository();
    }
    return SessionRepository.instance;
  }

  constructor() {
    this.sessions = [];
  }

  // 增加一个从数据库中加载所有会话的功能
  async loadConversations(): Promise<Session[]> {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const sessionList: [Session] = await invoke("get_all_sessions");
    // 返回获取到的会话
    this.sessions = sessionList;
    return sessionList;
  }
  // 添加一个新会话
  async createSession(name: string): Promise<Session> {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const result: Session = await invoke("create_session", {
      newSession: name,
    });
    return result;
  }

  // 删除一个会话
  // deleteConversation(id: string): void {
  //   this.conversations = this.conversations.filter(
  //     (conversation) => conversation.id !== id
  //   );
  // }

  // 更新一个会话的会话名
  // updateConversationName(id: string, name: string): void {
  //   const conversation = this.conversations.find(
  //     (conversation) => conversation.id === id
  //   );
  //   if (conversation) {
  //     conversation.name = name;
  //   }
  // }
}
export type { Session };
export { SessionRepository }; // 导出接口和类，以便在其他文件中使用
