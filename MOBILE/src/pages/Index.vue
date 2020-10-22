<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="message" type="textarea" filled label="Message" />
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'PageIndex',
  data() {
    return {
      message: '',
      socket: {}
    };
  },
  created() {
    this.socket = io('http://localhost:3000');
    console.log(this.socket);
  },
  methods: {
    onSubmit() {
      this.socket.emit('sendOrder', {
        autor: 'App do Gil',
        message: this.message
      });
    }
  }
};
</script>
