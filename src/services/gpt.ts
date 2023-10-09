import OpenAI from "openai";
import { ref } from "vue";
import type {Ref} from "vue"

export interface IMessage{
  role: string;
  content: string
}

const JSONClone = (obj:any) => JSON.parse(JSON.stringify(obj)); 

let openAi: OpenAI | null = null;


const status = ref(0);

const systemMessage = ref<IMessage>({
  role: "system",
  content: ''
})

const messages = ref<IMessage[]>([]);

const messageAssistant = ref({
  role: "assistant",
  content: ''
});



export function useGpt(apiKey: string): {messageAssistant:Ref<IMessage>, messages: Ref<IMessage[]>, status: Ref<number>, systemMessage?: Ref<IMessage>} {
  openAi = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
  return {
    messageAssistant,
    messages,
    status,
    systemMessage
  };
}

export async function setApiKey(apiKey: string){
    openAi = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

export async function execGpt(input: string){
  if (!openAi) {
    throw('Open AI is not available')
  }
  status.value = 1;
  messageAssistant.value.content = "";
  messages.value.push({
    role: "user",
    content: input,
  });
  const messagesClone = JSONClone(messages.value)
  messagesClone.unshift(systemMessage.value)
  const stream = await openAi.chat.completions.create({
    messages: messagesClone,
    model: "gpt-3.5-turbo",
    stream: true,
  });
  let output = '';
  for await (const part of stream) {
    const content = part.choices[0]?.delta?.content?.toString();
    if (content) {
      output += content;
      messageAssistant.value.content = output;
    }
  }
  messages.value.push({
    role: "assistant",
    content: output,
  });
  status.value = 0;

}
