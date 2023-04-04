<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";

const greetMsg = ref("");
const name = ref("");
const sessionList = ref<[{ id, name }]>();

async function create_session() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg.value = await invoke("create_session", { newSession: name.value });
}

async function get_all_sessions() {
    sessionList.value = await invoke("get_all_sessions");
    console.log(sessionList.value);
}
</script>

<template>
    <div class="card">
        <input id="greet-input" v-model="name" placeholder="Enter a session name..." />
        <button type="button" @click="create_session()">create_session</button>
        <button type="button" @click="get_all_sessions()">get_all_session</button>
    </div>

    <p>{{ greetMsg }}</p>
    <ul>
        <ol v-for="(item, index) in sessionList">
            {{ item.id }}--{{ item.name }}
        </ol>
    </ul>
</template>
