<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import Greet from "./components/Greet.vue";
// import Database from "./components/Database.vue"

import { ref } from "vue";

const message = ref("");
// 模拟一些items
const items = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    gender: "male",
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
  {
    id: 3,
    name: "Jimmy Doe",
    age: 32,
    gender: "male",
  },
];
const sendMessage = () => {
  console.log(message.value);
};
</script>

<template>
  <v-layout>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Hz"
          subtitle="hz@tencent.com"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="My Files"
          value="myfiles"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Shared with me"
          value="shared"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-home"
          title="Starred"
          value="starred"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main :scrollable="true" style="height: 100%">
      <v-container style="height: 100%">
        <v-row
          style="height: 80%; overflow-y: scroll"
          align-content="center"
          justify="center"
        >
          <!-- 写一个聊天对话列表，左边是机器人，右边item是用户 -->
          <v-col>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :title="item.name"
              ></v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <!-- 写一个输入框，一个发送按钮，水平居中排列 -->
        <v-row align-content="center" justify="center">
          <v-col>
            <v-text-field
              v-model="message"
              label="Message"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              variant="outlined"
              @click="sendMessage"
              :disabled="message.length === 0"
            >
              发送
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
