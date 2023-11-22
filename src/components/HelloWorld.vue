<template>
  <div>
    <el-button type="primary">
      <router-link to="/hello-world-wxy">前往API日志页面</router-link>
    </el-button>
    <h1>APIs</h1>

    <el-table :data="apis">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="apiDescription" label="Description"></el-table-column>
      <el-table-column prop="apiUrl" label="URL"></el-table-column>
      <el-table-column prop="appUser" label="User"></el-table-column>
      <el-table-column prop="appKey" label="Key"></el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="{ row }">
          <el-button @click="editApi(row)">Edit</el-button>
          <el-button @click="deleteApi(row.id)">Delete</el-button>
          <el-button @click="callApi(row.apiDescription)">Call</el-button>
        </template>
      </el-table-column>
    </el-table>

    <h2>API Response</h2>

<el-input
  type="textarea"
  :rows="5"
  placeholder="API response will be displayed here"
  v-model="apiResponse"
  readonly
></el-input>

    <h2>Add / Edit API</h2>

    <el-form @submit.native.prevent="submitForm">
      <el-form-item label="Description">
        <el-input v-model="form.apiDescription" required></el-input>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.apiUrl" required></el-input>
      </el-form-item>
      <el-form-item label="User">
        <el-input v-model="form.appUser"></el-input>
      </el-form-item>
      <el-form-item label="Key">
        <el-input v-model="form.appKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ form.id ? 'Update' : 'Add' }}</el-button>
      </el-form-item>
    </el-form>

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
      },
      apiResponse: ''
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
    },
    callApi (description) {
      axios.post(`http://localhost:8081/apiCall`, { description: description })
        .then(response => {
          if (response.data.responseBody === '403') {
            this.$message.error('Insufficient permissions to call this API')
          } else {
            this.apiResponse = response.data.responseBody
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.el-button a {
  color: white !important;
}
</style>
