<script setup lang="ts">
import { ref } from "vue";
import SessionView from "./components/Session.vue";
import type { Session } from '@/repository/session';
const message = ref("");
// 模拟一些items
const items = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    gender: "male",
    system: true,
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 31,
    gender: "female",
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
    system: true,
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
    system: true,
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
    system: true,
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
    system: true,
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
    system: true,
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
    system: true,
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
  },

  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
  },
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
  },
];
const user = {
  name: 'your name',
  avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
  email: 'hz@tencent.com',
}
const sendMessage = () => {
  console.log(message.value);
};

const newSession = () => {
  console.log("new conversion");
}
const selectSession = (session: Session) => {
  console.log(session);
}
</script>

<template>
  <v-app>
    <SessionView :user="user" @new-session="newSession" @select-session="selectSession" />
    <v-main :scrollable="true" style="height: 100%">
      <v-container style="height: 100%">
        <v-list style="height: calc(100vh - 100px); overflow-y: scroll;padding: 0px;margin: 0px;">
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-col v-if="item.system" style="display: flex; justify-content:start ;"> {{ item.name }}</v-col>
            <v-col v-else style="display: flex; justify-content:end ;"> {{ item.name }}</v-col>
          </v-list-item>
        </v-list>
        <!-- 写一个输入框，一个发送按钮，水平居中排列 -->
        <v-row style="height: 100px;">
          <v-col cols="12" align-self="center">
            <v-text-field v-model="message" :append-icon="message ? 'mdi-send' : ''" variant="filled"
              clear-icon="mdi-close-circle" clearable label="Please input your prompt here" type="text"
              hint="You can use [ctrl/cmd]+enter send message" persistent-hint @click:append="sendMessage">
              <template #details>

                See our <a href="#">Terms and Service</a> here
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
