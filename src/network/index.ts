// 使用axios封装的网络请求
import axios from "axios";

import { useSettingStore } from "@/store/setting";

import { openai } from "./types";
import console from "console";
import { useFetch } from "@vueuse/core";

export type DataCallback = (data: string) => void;
export type ErrorCallback = (error: Error) => void;
export type ResponseCallback = (response: string) => void;

class ChatGptClient {
  // 单例模式
  private static instance: ChatGptClient;
  private store = useSettingStore();
  public static getInstance(): ChatGptClient {
    if (!ChatGptClient.instance) {
      ChatGptClient.instance = new ChatGptClient();
    }
    return ChatGptClient.instance;
  }

  // 请求gpt-3.5-turbo 接口
  async post(
    data: openai.CreateChatCompletionRequest,
    onData: DataCallback,
    onResponse: ResponseCallback,
    onError: ErrorCallback
  ) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.store.apiKey,
    };
    const url = this.store.proxyUrl + "/v1/chat/completions";
    data.stream = this.store.stream; // 是否使用流式传输
    const decoder = new TextDecoder("utf-8");
    interface ReadResult {
      value: Uint8Array;
      done: boolean;
    }
    useFetch;
    if (data.stream) {
      try {
        fetch(url, {
          headers,
          method: "POST",
          body: JSON.stringify(data),
        }).then((response) => {
          if (response.ok) {
            const reader = response.body!.getReader();
            pump(reader);
          }
        });
        let finalResult = "";
        function pump(reader: any) {
          reader.read().then(({ value, done }: ReadResult) => {
            if (done) {
              return;
            }
            const text = decoder.decode(value);
            const lines = text.split("\n");
            for (const line of lines) {
              if (line.length > 0) {
                //去掉前面的 data: 和后面的换行符
                const json = line.substring(6).trim();
                if (json === "[DONE]") {
                  onResponse(finalResult);
                  break;
                }
                const result: openai.CreateChatCompletionDeltaResponse =
                  JSON.parse(json);
                finalResult += result.choices[0]?.delta.content || "";
                onData(finalResult);
              }
            }
            pump(reader);
          });
        }
      } catch (err: any) {
        onError(new Error(err));
      }
    } else {
      try {
        const response = await axios.post(url, data, {
          headers,
        });
        const result: openai.CreateChatCompletionResponse = response.data;
        onResponse(result.choices[0].message?.content!);
      } catch (err: any) {
        onError(new Error(err));
      }
    }
  }
}

export default ChatGptClient;
