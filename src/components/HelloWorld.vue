<template>
    <div>
      <h1>APIs</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>URL</th>
            <th>User</th>
            <th>Key</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="api in apis" :key="api.id">
            <td>{{ api.id }}</td>
            <td>{{ api.apiDescription }}</td>
            <td>{{ api.apiUrl }}</td>
            <td>{{ api.appUser }}</td>
            <td>{{ api.appKey }}</td>
            <td>
              <button @click="editApi(api)">Edit</button>
              <button @click="deleteApi(api.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Add / Edit API</h2>

      <form @submit.prevent="submitForm">
        <label>
          Description:
          <input type="text" v-model="form.apiDescription" required>
        </label>
        <label>
          URL:
          <input type="text" v-model="form.apiUrl" required>
        </label>
        <label>
          User:
          <input type="text" v-model="form.appUser" required>
        </label>
        <label>
          Key:
          <input type="text" v-model="form.appKey" required>
        </label>
        <button type="submit">{{ form.id ? 'Update' : 'Add' }}</button>
      </form>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      apis: [],
      form: {
        id: null,
        apiDescription: '',
        apiUrl: '',
        appUser: '',
        appKey: ''
      }
    }
  },
  created () {
    this.fetchApiData()
  },
  methods: {
    fetchApiData () {
      axios.get('http://127.0.0.1:8081/apiAll').then((response) => {
        this.apis = response.data
      })
    },
    editApi (api) {
      this.form.id = api.id
      this.form.apiDescription = api.apiDescription
      this.form.apiUrl = api.apiUrl
      this.form.appUser = api.appUser
      this.form.appKey = api.appKey
    },
    deleteApi (id) {
      axios.delete(`http://127.0.0.1:8081/apiDelete/${id}`).then(() => {
        this.fetchApiData()
      })
    },
    submitForm () {
      if (this.form.id) {
        axios.put('http://127.0.0.1:8081/apiUpdate', this.form).then(() => {
          this.fetchApiData()
          this.resetForm()
        })
      } else {
        axios.post('http://127.0.0.1:8081/apiAdd', this.form).then(() => {
          this.fetchApiData()
          this.resetForm()
        })
      }
    },
    resetForm () {
      this.form.id = null
      this.form.apiDescription = ''
      this.form.apiUrl = ''
      this.form.appUser = ''
      this.form.appKey = ''
    }
  }
}
</script>
