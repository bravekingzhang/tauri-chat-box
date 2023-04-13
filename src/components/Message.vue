<!-- 创建一个消息列表组件 -->
<template>
  <v-container style="height: 100%">
    <v-list
      id="myList"
      style="
        height: calc(100vh - 100px);
        overflow-y: scroll;
        padding: 0px;
        margin: 0px;
      "
    >
      <v-list-item v-for="(item, index) in messageList" :key="index">
        <v-col
          v-if="item.role !== 'user'"
          style="display: flex; justify-content: start"
        >
          <v-icon icon="mdi-robot"></v-icon>
          <v-card style="padding-left: 15px; padding-right: 10px">
            <template v-slot:text>
              <Markdown :source="item.text" :plugins="plugins"></Markdown>
            </template>
          </v-card>
        </v-col>
        <v-col v-else style="display: flex; justify-content: end">
          <v-card>
            <template v-slot:text>
              <Markdown :source="item.text" :plugins="plugins"></Markdown>
            </template>
          </v-card>
          <v-icon icon="mdi-account-star"></v-icon>
        </v-col>
      </v-list-item>

      <v-list-item v-if="messageRely">
        <v-col style="display: flex; justify-content: start">
          <v-icon icon="mdi-robot"></v-icon>
          <v-card style="padding-left: 45px; padding-right: 10px">
            <template v-slot:text>
              <Markdown
                :source="messageRely.text"
                :plugins="plugins"
              ></Markdown>
            </template>
          </v-card>
        </v-col>
      </v-list-item>

      <!-- 当messageList 是空时，显示一个指引页 -->
      <WelcomeView v-if="messageList.length === 0"></WelcomeView>
    </v-list>
    <!-- 写一个输入框，一个发送按钮，水平居中排列 -->
    <v-row style="height: 100px">
      <v-col cols="12" align-self="center">
        <v-text-field
          color="primary"
          v-model="messageInput"
          :append-icon="messageInput ? 'mdi-send' : ''"
          variant="outlined"
          clear-icon="mdi-close-circle"
          clearable
          label="Please input your prompt here"
          type="text"
          hint="Press command+enter send message"
          persistent-hint
          @keydown.meta.enter.prevent="sendMessage"
          @click:append="sendMessage"
        >
          <template #details>
            See our
            <a
              target="_blank"
              href="https://github.com/bravekingzhang/tarui-gpt-box"
              >Terms and Service</a
            >
            here
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import WelcomeView from "./Welcome.vue";
import { ref } from "vue";
import { useMessageStore } from "@/store/message";
import { useSessionStore } from "@/store/session";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { Message } from "@/repository/message";
import Markdown from "vue3-markdown-it";
import "highlight.js/styles/monokai.css";
import MarkdownHighlight from "markdown-it-highlightjs";
import { emit } from "process";
interface Props {
  sessionId: string;
}
const props = withDefaults(defineProps<Props>(), { sessionId: "0" });
const plugins = [
  {
    plugin: MarkdownHighlight,
  },
];
const emits = defineEmits(["select-session"]);
const messageInput = ref("");
const messageStore = useMessageStore();
const sessionStore = useSessionStore();

const { messageList, messageRely } = storeToRefs(messageStore);

const moveToBottom = () => {
  const list = document.getElementById("myList");
  if (list) {
    list.scrollTop = list.scrollHeight;
  }
};
const sendMessage = async () => {
  if (!messageInput.value.trim()) {
    return;
  }
  let sessionID = props.sessionId;
  //如果是一个空的sessionId，直接开始新的对话
  if (sessionID === "") {
    const session = await sessionStore.createSession(messageInput.value);
    emits("select-session", session);
    sessionID = session.id;
  }
  const message: Message = {
    session_id: sessionID,
    role: "user",
    text: messageInput.value,
    id: "",
    attachment_path: "",
  };
  messageInput.value = "";
  await messageStore.addMessage(message);
  moveToBottom();
  await messageStore.askGpt(message);
};

watch(
  () => props.sessionId,
  async (value) => {
    console.log("watch sessionID change", value);
    await messageStore.fetchMessageList(value);
    moveToBottom();
  }
);
// 每次消息列表变化，滚动到底部
watch(
  () => messageList.value,
  (_) => {
    // 滚动到底部
    setTimeout(() => {
      moveToBottom();
    }, 500);
  }
);
// 每次消息列表变化，滚动到底部
watch(
  () => messageRely.value,
  (_) => {
    // 滚动到底部
    moveToBottom();
  }
);
</script>
