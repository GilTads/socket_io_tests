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
              <q-list bordered>
                <q-item clickable v-ripple>
                  <q-item-section
                    avatar
                    v-for="message in messages"
                    :key="`${message.name}${Math.random()}`"
                  >
                    <q-item-label>
                      {{ message.name }}: {{ message.message }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
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
      isConnected: false
      // socket: io('localhost:3000')
    };
  },
  watch: {
    messages: () => {}
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
      this.socketMessage = data;
    },

    previuosMessages(data) {
      this.messages = data;
      this.$socket.emit('receivedOrder', data);
    }
  },

  created() {
    // this.socket.on('previuosMessages', messages => {
    //   messages.forEach(message => {
    //     this.chat = message;
    //   });
    // });
    // this.socket.on('receivedOrder', order => {
    //   console.log(order.message);
    // });
  },
  methods: {
    send() {
      this.$socket.emit('sendOrder', {
        name: this.name,
        message: this.message
      });
    }
  }
};
</script>
