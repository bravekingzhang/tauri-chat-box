<script setup lang="ts">
import { ref } from "vue";
import SessionView from "./components/Session.vue";
import MessageView from "./components/Message.vue";
import type { Session } from '@/repository/session';
// 模拟一些items
const user = {
  name: 'your name',
  avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
  email: 'hz@tencent.com',
}
const sessionId = ref("");
const newSession = () => {
  console.log("new conversion");
}
// 选择会话
const selectSession = (session: Session) => {
  console.log(session);
  sessionId.value = session.id as string;
}
</script>

<template>
  <v-app>
    <SessionView :user="user" @new-session="newSession" @select-session="selectSession" />
    <v-main :scrollable="true" style="height: 100%">
      <MessageView :sessionId="sessionId" />
    </v-main>
  </v-app>
</template>
