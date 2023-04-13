import { invoke } from "@tauri-apps/api/tauri";

import ChatGptClient, {
  DataCallback,
  ResponseCallback,
  ErrorCallback,
} from "@/network";
import { openai } from "@/network/types";
/**
 *
 * pub struct Message {
    pub id: i32,
    pub session_id: i32,
    pub role: String,
    pub text: Option<String>,
    pub attachment_path: Option<String>,
}
 */
interface Message {
  id?: string;
  session_id: string;
  role?: string;
  text?: string;
  attachment_path?: string;
}

class MessageRepository {
  static instance: MessageRepository;
  public static getInstance(): MessageRepository {
    if (!MessageRepository.instance) {
      MessageRepository.instance = new MessageRepository();
    }
    return MessageRepository.instance;
  }
  // 增加一个从数据库中加载所有会话的功能
  async loadMessageBySessionId(sessionId: string): Promise<Message[]> {
    const messageList: Message[] = await invoke("get_all_messages", {
      sessionId,
    });
    // 返回获取到的会话
    return messageList;
  }

  askGpt(
    query: string,
    onData: DataCallback,
    onResponse: ResponseCallback,
    error: ErrorCallback
  ) {
    const message: openai.CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    };
    ChatGptClient.getInstance().post(message, onData, onResponse, error);
  }

  async addMessage(message: Message): Promise<Message> {
    const result: Message = await invoke("add_message", {
      sessionId: message.session_id,
      role: message.role,
      text: message.text,
      attachmentPath: message.attachment_path,
    });
    return result;
  }
}
export type { Message };
export { MessageRepository }; // 导出接口和类，以便在其他文件中使用
