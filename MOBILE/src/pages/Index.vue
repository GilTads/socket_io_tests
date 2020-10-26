<template>
  <div class="row">
    <div class="q-pa-lg col-12">
      <h2>Socket.io chat</h2>
      <div class="q-ma-md">
        <q-scroll-area
          ref="scrollArea"
          :visible="false"
          style="height: 200px; max-width: 500px;"
        >
          <div class="q-pa-lg" ref="chatArea">
            <q-chat-message
              v-for="c of chat"
              :key="`${c.name}${Math.random()}`"
              :name="c.name"
              :text="[c.message]"
              :sent="c.sent"
            />
          </div>
        </q-scroll-area>
      </div>
      <!-- <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <q-chat-message
            v-for="c of chat"
            :key="`${c.name}${Math.random()}`"
            :name="c.name"
            :text="[c.message]"
            :sent="c.sent"
          />
        </div>
      </div> -->
      <q-form class="q-gutter-md">
        <q-input v-model="name" type="text" filled label="Digite seu nome" />
        <q-input v-model="message" type="text" filled label="Digite o texto" />
        <div>
          <q-btn label="Submit" type="button" @click="send" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
// import io from 'socket.io-client';
import { scroll } from 'quasar';

const { getScrollTarget } = scroll;

export default {
  name: 'PageIndex',
  data() {
    return {
      name: '',
      message: '',
      messages: [],
      chat: [],
      receivedChat: [],
      isConnected: false,
      sent: true,
      scroll: 0
      // socket: io('localhost:3000')
    };
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log(`Conected?: ${this.isConnected}`);
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    receivedOrder(data) {
      const messageObject = {
        name: data.name,
        message: data.message,
        sent: !data.sent
      };
      this.chat.push(messageObject);

      this.$refs.scrollArea.setScrollPosition(this.scroll, 300);
    }

    // previuosMessages(data) {
    //   this.messages = data;
    //   this.$socket.emit('receivedOrder', data);
    // }
  },
  methods: {
    send() {
      const messageObject = {
        name: this.name,
        message: this.message,
        sent: this.sent
      };

      if (this.name.length && this.message) {
        this.chat.push(messageObject);
      }

      this.$socket.emit('sendOrder', messageObject);

      const target = getScrollTarget(this.$refs.chatArea);
      this.scroll = target.scrollHeight;

      this.$refs.scrollArea.setScrollPosition(this.scroll, 300);
    }
  }
};
</script>
