<template>
  <div class="text-center">
    <v-dialog v-model="dialogLocal" width="79%">
      <v-card title="Settings" style="padding: 24px">
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              label="Locale"
              v-model="locale"
              :items="['zhCN', 'en']"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="password"
              v-model="apiKey"
              label="ChatGpt API Key"
            />
            注册
            <a
              target="_blank"
              href="https://platform.openai.com/account/api-keys"
              >OpenAI</a
            >
            账号，获取你的
            <a
              target="_blank"
              href="https://platform.openai.com/account/api-keys"
              >ApiKey</a
            >
            。注册过程需要科学上网，可以选用这个<a
              target="_blank"
              href="https://hkscloud.men/#/register?code=qVaVCBQX"
              >梯子</a
            >。
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              label="CustomTheme"
              v-model="customTheme"
              :items="[
                'RedSandDunesLight',
                'RedSandDunesDark',
                'GreenMountainTopLight',
                'GreenMountainTopDark',
              ]"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-switch
              v-model="stream"
              :label="`Stream: ${stream.toString()}`"
              color="green"
            ></v-switch>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="proxyUrl" label="Proxy URL let you fly" />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn variant="elevated" color="primary" block @click="close"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from "@/store/setting";
import { storeToRefs } from "pinia";

import { toRef } from "vue";

const settingStore = useSettingStore();

const { locale, apiKey, customTheme, stream, proxyUrl } =
  storeToRefs(settingStore);

const localeConfig = ["en", "zh"];
interface Props {
  dialog: boolean;
}
const props = defineProps<Props>();

// 计算属性绑定 dialog

const dialogLocal = toRef(props, "dialog");

const emits = defineEmits(["close-setting-dialog"]);

function close() {
  emits("close-setting-dialog");
}
</script>
