interface Conversation {
  id: string;
  name: string;
  createdAt: Date; //增加一个创建日期，类型时间戳
}

class ConversationRepository {
  private conversations: Conversation[];

  constructor() {
    this.conversations = [];
  }

  // 增加一个从数据库中加载所有会话的功能
  loadConversations(): Conversation[] {
    // 从数据库中获取所有会话
    // 假设这里使用了一个名为"db"的数据库对象
    const conversationsFromDB = db.getAllConversations();
    // 将获取到的会话存储到本地变量中
    this.conversations = conversationsFromDB;
    // 返回获取到的会话
    return conversationsFromDB;
  }
  // 添加一个新会话
  addConversation(conversation: Conversation): void {
    this.conversations.push(conversation);
  }

  // 删除一个会话
  deleteConversation(id: string): void {
    this.conversations = this.conversations.filter(
      (conversation) => conversation.id !== id
    );
  }

  // 更新一个会话的会话名
  updateConversationName(id: string, name: string): void {
    const conversation = this.conversations.find(
      (conversation) => conversation.id === id
    );
    if (conversation) {
      conversation.name = name;
    }
  }
}
export { type Conversation, ConversationRepository }; // 导出接口和类，以便在其他文件中使用
