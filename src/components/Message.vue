<!-- 创建一个消息列表组件 -->
<template>
  <v-container style="height: 100%">
    <v-list
      style="
        height: calc(100vh - 100px);
        overflow-y: scroll;
        padding: 0px;
        margin: 0px;
      "
    >
      <v-list-item v-for="(item, index) in messageList" :key="index">
        <v-col
          v-if="item.role === 'system'"
          style="display: flex; justify-content: start"
        >
          {{ item.text }}</v-col
        >
        <v-col v-else style="display: flex; justify-content: end">
          {{ item.text }}</v-col
        >
      </v-list-item>
    </v-list>
    <!-- 写一个输入框，一个发送按钮，水平居中排列 -->
    <v-row style="height: 100px">
      <v-col cols="12" align-self="center">
        <v-text-field
          v-model="messageInput"
          :append-icon="messageInput ? 'mdi-send' : ''"
          variant="filled"
          clear-icon="mdi-close-circle"
          clearable
          label="Please input your prompt here"
          type="text"
          hint="You can use [ctrl/cmd]+enter send message"
          persistent-hint
          @click:append="sendMessage"
        >
          <template #details>
            See our <a href="#">Terms and Service</a> here
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessageStore } from "@/store/message";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { Message } from "@/repository/message";

interface Props {
  sessionId: string;
}
const props = withDefaults(defineProps<Props>(), { sessionId: "0" });

const messageInput = ref("");
const messageStore = useMessageStore();

const { messageList } = storeToRefs(messageStore);

const sendMessage = async () => {
  const message: Message = {
    session_id: props.sessionId,
    role: "system",
    text: messageInput.value,
    id: "",
    attachment_path: "",
  };
  await messageStore.addMessage(message);
};

watch(
  () => props.sessionId,
  async (value) => {
    console.log("watch sessionID change", value);
    await messageStore.fetchMessageList(value);
  }
);
</script>
