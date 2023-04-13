<script setup lang="ts">
import { ref } from "vue";
import SessionView from "./components/Session.vue";
import MessageView from "./components/Message.vue";
import SettingDialog from "./components/Settings.vue";
import type { Session } from "@/repository/session";
// 模拟一些items

const sessionId = ref("");
// 选择会话
const selectSession = (session: Session) => {
  sessionId.value = session.id;
};

const settingDialog = ref(false);
const closeSettingDialog = () => {
  settingDialog.value = false;
};
const openSetting = () => {
  console.log("open setting");
  settingDialog.value = true;
};
</script>

<template>
  <v-app>
    <SessionView @select-session="selectSession" @open-setting="openSetting" />
    <v-main :scrollable="true" style="height: 100%">
      <MessageView :sessionId="sessionId" @select-session="selectSession" />
    </v-main>
    <SettingDialog :dialog="settingDialog" @close-setting-dialog="closeSettingDialog" />
  </v-app>
</template>
