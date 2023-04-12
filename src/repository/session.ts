import { invoke } from "@tauri-apps/api/tauri";
interface Session {
  id: string;
  name: string;
}

class SessionRepository {
  static instance: SessionRepository;
  public static getInstance(): SessionRepository {
    if (!SessionRepository.instance) {
      SessionRepository.instance = new SessionRepository();
    }
    return SessionRepository.instance;
  }
  // 增加一个从数据库中加载所有会话的功能
  async loadConversations(): Promise<Session[]> {
    const sessionList: Session[] = await invoke("get_all_sessions");
    // 返回获取到的会话
    return sessionList;
  }
  // 添加一个新会话
  async createSession(name: string): Promise<Session> {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const result: Session = await invoke("create_session", {
      name,
    });
    return result;
  }

  // 删除一个会话
  async deleteConversation(id: string): Promise<void> {
    await invoke("delete_session", {
      id,
    });
  }

  // 更新一个会话的会话名
  async updateSessionName(id: string, name: string): Promise<void> {
    await invoke("update_session", {
      id, //会自动转换为整形
      name,
    });
  }
}
export type { Session };
export { SessionRepository }; // 导出接口和类，以便在其他文件中使用
