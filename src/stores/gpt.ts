import { defineStore } from "pinia";
import { marked } from "marked";
import OpenAI from "openai";
import type {} from "openai";
import router from "@/router";
import Prism from "prismjs";
import * as vueuse from "@vueuse/core";
import type { RemovableRef } from "@vueuse/core";

export type IMessage = OpenAI.Chat.Completions.ChatCompletionMessage;

export type GptModel = "gpt-4" | (string & {}) | "gpt-4-0314" | "gpt-4-0613" | "gpt-4-32k" | "gpt-4-32k-0314" | "gpt-4-32k-0613" | "gpt-3.5-turbo" | "gpt-3.5-turbo-16k" | "gpt-3.5-turbo-0301" | "gpt-3.5-turbo-0613" | "gpt-3.5-turbo-16k-0613"

interface IState {
  userInput: string;
  systemMessage: IMessage;
  settings: {
    apiKey: RemovableRef<string>;
    model: GptModel;
    temperature: number;
  };
  messages: IMessage[];
  messageAssistant: IMessage;
  openAi: OpenAI | null;
  status: number;
  error: string;
  loading: {
    initializeGpt: boolean;
  };
}

export const useGptStore = defineStore("gptStore", {
  state: (): IState => ({
    userInput: "",
    systemMessage: {
      role: "assistant",
      content: "",
    },
    settings: {
      apiKey: vueuse.useLocalStorage("apiKey", ""),
      model: 'gpt-3.5-turbo',
      temperature: 1
    },
    messages:[],
    messageAssistant: {
      role: "assistant",
      content: "",
    },
    openAi: null,
    status: 0,
    error: "",
    loading: {
      initializeGpt: false,
    },
  }),
  getters: {
    getMessageExtended(state) {
      const messageAssistant = state.messageAssistant;
      const renderer = new marked.Renderer();
      renderer.code = (code, language: any) => {

        if (Prism.languages[language]) {
          const highlightedCode = Prism.highlight(code, Prism.languages[language], language)
          return `<pre class="line-numbers language-${language}"><code>${highlightedCode}</code></pre>`;
        } else {
          return `<pre class="line-numbers language-${language}"><code>${code}</code></pre>`;
        }
      };

      const contentHtmlWithHighlight = marked(messageAssistant.content || "", { renderer });
      return {
        ...messageAssistant,
        ...{ contentHtml: contentHtmlWithHighlight },
      };
    },
    getMessagesExtended(state) {
      return state.messages.map((messageObj: any) => {
        const renderer = new marked.Renderer();
        renderer.code = (code, language: any) => {
          if (Prism.languages[language]) {
            const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
            return `<pre class="line-numbers language-${language}"><code>${highlightedCode}</code></pre>`;
          } else {
            return `<pre class="line-numbers language-${language}"><code>${code}</code></pre>`;
          }
        };
        const contentHtmlWithHighlight = marked(messageObj.content || "", { renderer });
        return {
          ...messageObj,
          ...{ contentHtml: contentHtmlWithHighlight },
        };
      });
    },
  },
  actions: {
    sendMessage() {
      this.execGpt();
      this.userInput = "";
    },

    logOut() {
      localStorage.clear();
      this.$reset();
      router.push("/auth");
    },

    async initializeGpt(apiKey: string) {
      this.loading.initializeGpt = true;
      const openAi = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });
      try {
        const result = await openAi.chat.completions.create({
          messages: [
            {
              role: "user",
              content: "This is a test. Do not respond!",
            },
          ],
          model: 'gpt-3.5-turbo',
        });
        console.log(result.choices[0].message.content);
        this.settings.apiKey = apiKey;
        this.openAi = openAi;
        this.loading.initializeGpt = false;
        router.push("/home");
      } catch (error: any) {
        this.error = error.message;
        this.loading.initializeGpt = false;
      }
    },

    async execGpt() {
      if (!this.settings.apiKey) {
        throw "Api key is not available";
      }
      if (!this.openAi) {
        this.openAi = new OpenAI({
          apiKey: this.settings.apiKey,
          dangerouslyAllowBrowser: true,
        });
      }
      this.status = 1;
      this.messageAssistant.content = "";

      this.messages.push({
        role: "user",
        content: this.userInput,
      });

      const messages: OpenAI.Chat.Completions.ChatCompletionMessage[] = [];
      messages.push(this.systemMessage, ...this.messages);

      const stream = await this.openAi.chat.completions.create({
        messages: messages,
        model: this.settings.model,
        stream: true,
        temperature: this.settings.temperature
      });
      for await (const part of stream) {
        const partResult = part.choices[0]?.delta?.content?.toString();
        if (partResult) {
          this.messageAssistant.content += partResult;
        }
      }
      const messageAssistant = JSON.parse(JSON.stringify(this.messageAssistant));
      this.messages.push(messageAssistant);
      this.status = 0;
    },
  },
});
