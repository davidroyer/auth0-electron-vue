<template>
  <div>
    <div class="row">
      <header class="col-md-12">
        <img class="avatar" :src="profile.picture" alt="Headshot" />
        <strong v-text="profile.name" />
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand">Vue TODO List</a>
          <button class="btn btn-danger my-2 my-sm-0" @click="logout()" type="button">Logout</button>
        </nav>
      </header>
    </div>

    <div class="row" id="fetch-button-row">
      <div class="col-md-12">
        <button @click="fetchTodos()" class="btn btn-primary">Fetch Todos</button>
      </div>
    </div>

    <div class="row" id="todos-row">
      <div class="col-md-12">
        <ul class="list-group">
          <li class="list-group-item" v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../../services/auth-service'

const { remote } = window.require('electron')
// const authServiceRemote = remote.require('services/auth-service')
// console.log('TCL: authServiceRemote', authServiceRemote)
// const authService = remote.require('./')
// // console.log("TCL: authService", authService)
const axios = require('axios')
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      profile: {},
      todos: []
    }
  },
  created () {
    this.profile = remote.getGlobal('profile')
  },
  methods: {
    async logout () {
      await authService.logout()
      remote.getCurrentWindow().close()
    },
    fetchTodos () {
      let accessToken = remote.getGlobal('accessToken')

      axios
        .get('http://localhost:3001/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          this.todos = response.data
        })
        .catch(error => {
          if (error) throw new Error(error)
        })
    }
  }
}
</script>


<style scoped>
  @import "~bootstrap/dist/css/bootstrap.min.css";

  #fetch-button-row,
  #todos-row {
    margin: 10px;
  }

  .avatar {
    width: 84px;
    border-radius: 50%;
    box-shadow: 0px 1px 2px 2px #2d2c2c9e;
    height: 84px;
    padding: 2px;
    box-sizing: border-box;
    z-index: 999;
    position: relative;
  }
</style>
