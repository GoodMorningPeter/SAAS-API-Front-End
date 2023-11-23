<template>
  <div>
    <el-button type="primary">
      <router-link to="/">前往API操作页面</router-link>
    </el-button>
    <el-select v-model="selectedApi" placeholder="Select an API" @change="fetchApiData">
      <el-option
        v-for="item in apiDescriptions"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>

    <h2>Selected API Usage</h2>
    <el-table :data="apiStats" style="width: 100%" v-if="apiStats.length > 0">
      <el-table-column prop="description" label="API Description"></el-table-column>
      <el-table-column prop="call_count" label="Call Count"></el-table-column>
    </el-table>

    <h2>Selected API Log</h2>
    <el-table :data="apiLogs" style="width: 100%" v-if="apiLogs.length > 0">
      <el-table-column prop="description" label="API Description"></el-table-column>
      <el-table-column prop="caller" label="Caller"></el-table-column>
      <el-table-column prop="call_time" label="Call Time"></el-table-column>
      <el-table-column prop="duration" label="Duration"></el-table-column>
      <el-table-column prop="error_message" label="Error Message"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      selectedApi: '',
      apiDescriptions: [],
      apiStats: [],
      apiLogs: []
    }
  },
  async created () {
    const response = await axios.get('http://127.0.0.1:8081/apiAll')
    this.apiDescriptions = response.data.map(api => api.apiDescription)
  },
  methods: {
    async fetchApiData () {
      const statsResponse = await axios.get(`http://127.0.0.1:8081/apiStatsByDesc?description=${this.selectedApi}`)
      this.apiStats = statsResponse.data

      const logsResponse = await axios.get(`http://127.0.0.1:8081/apiLogByDesc?description=${this.selectedApi}`)
      this.apiLogs = logsResponse.data
    }
  }
}
</script>

<style scoped>
.el-button a {
  color: white !important;
}
</style>
