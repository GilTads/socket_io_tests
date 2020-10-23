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
              <q-input
                v-model="chat"
                type="textarea"
                filled
                readonly
                label="Chat"
              />
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
import io from 'socket.io-client';

export default {
  name: 'PageIndex',
  sockets: {
    connect: () => {
      console.log('Socket.io conected');
    }
  },
  data() {
    return {
      name: '',
      message: '',
      chat: '',
      socket: io('localhost:3000')
    };
  },
  created() {
    this.socket.on('previuosMessages', messages => {
      messages.forEach(message => {
        this.chat = message;
      });
    });
    this.socket.on('receivedOrder', order => {
      console.log(order.message);
    });
  },
  methods: {
    send() {
      this.socket.emit('sendOrder', {
        name: this.name,
        message: this.message
      });
    }
  }
};
</script>
