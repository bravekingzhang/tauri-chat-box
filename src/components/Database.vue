<script setup lang="ts">
import { ref } from "vue";
import { SessionRepository, Session } from "../repository/session";

const greetMsg = ref("");
const name = ref("");
const sessionList = ref<Session[]>();

async function create_session() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  const session: Session = await SessionRepository.getInstance().createSession(
    name.value
  );
  greetMsg.value = session.name;
}

async function get_all_sessions() {
  sessionList.value = await SessionRepository.getInstance().loadConversations();
}
</script>

<template>
  <div class="card">
    <input
      id="greet-input"
      v-model="name"
      placeholder="Enter a session name..."
    />
    <button type="button" @click="create_session()">create_session</button>
    <button type="button" @click="get_all_sessions()">get_all_session</button>
  </div>

  <p>{{ greetMsg }}</p>
  <ul>
    <ol v-for="(item, index) in sessionList">
      {{
        item.id
      }}--{{
        item.name
      }}
    </ol>
  </ul>
</template>
