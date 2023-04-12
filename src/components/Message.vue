<!-- 创建一个消息列表组件 -->
<template>
    <v-container style="height: 100%">
        <v-list style="height: calc(100vh - 100px); overflow-y: scroll;padding: 0px;margin: 0px;">
            <v-list-item v-for="(item, index) in messageList" :key="index">
                <v-col v-if="item.role === 'system'" style="display: flex; justify-content:start ;"> {{ item.text }}</v-col>
                <v-col v-else style="display: flex; justify-content:end ;"> {{ item.text }}</v-col>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessageStore } from "@/store/message";
import { storeToRefs } from 'pinia';
import { onMounted } from "vue";
import { watch } from "vue";

interface Props {
    sessionId: {
        type: String;
        default: "0";
    };
}
const props = defineProps<Props>();

const message = ref("");
const messageStore = useMessageStore();

const { messageList } = storeToRefs(messageStore);

const sendMessage = () => {
    console.log(message.value);
};

watch(props.sessionId, async (newValue, _) => {
    await messageStore.fetchMessageList(newValue);
});
</script>