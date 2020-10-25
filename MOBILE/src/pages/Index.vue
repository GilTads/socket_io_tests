<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col-6 fixed-center">
            <h2>Socket.io chat</h2>
            <q-form class="q-gutter-md">
              <q-input
                v-model="name"
                type="text"
                filled
                label="Digite seu nome"
              />
              <q-input
                v-model="message"
                type="text"
                filled
                label="Digite o texto"
              />
              <div class="q-pa-md row justify-center">
                <div style="width: 100%; max-width: 400px">
                  <q-chat-message
                    v-for="c of chat"
                    :key="`${c.name}${Math.random()}`"
                    :name="c.name"
                    :text="[c.message]"
                    sent
                  />
                  <q-chat-message
                    v-for="c of receivedChat"
                    :key="`${c.name}${Math.random()}`"
                    :name="c.name"
                    :text="[c.message]"
                  />
                </div>
              </div>
              <div>
                <q-btn
                  label="Submit"
                  type="button"
                  @click="send"
                  color="primary"
                />
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// import io from 'socket.io-client';

export default {
  name: 'PageIndex',
  data() {
    return {
      name: '',
      message: '',
      messages: [],
      chat: [],
      receivedChat: [],
      isConnected: false
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
      this.receivedChat.push(data);
    }

    // previuosMessages(data) {
    //   this.messages = data;
    //   this.$socket.emit('receivedOrder', data);
    // }
  },

  created() {},
  methods: {
    send() {
      const messageObject = {
        name: this.name,
        message: this.message
      };

      if (this.name.length && this.message) {
        this.chat.push(messageObject);
      }

      this.$socket.emit('sendOrder', messageObject);
    }
  }
};
</script>
