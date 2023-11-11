<template>
    <div>
    <el-button @click="getWeatherInfo">获取天气信息</el-button>
    <el-button @click="getWeatherList">获取天气详细信息</el-button>

    <el-table :data="weatherList" style="width: 100%">
        <el-table-column prop="api_id" label="API ID" width="180"></el-table-column>
        <el-table-column prop="caller" label="Caller" width="180"></el-table-column>
        <el-table-column prop="call_time" label="Call Time" width="180"></el-table-column>
        <el-table-column prop="duration" label="Duration" width="180"></el-table-column>
        <el-table-column prop="error_message" label="Error Message"></el-table-column>
    </el-table>

    <el-button @click="getMapInfo">获取地图信息</el-button>
    <el-button @click="getMapList">获取地图详细信息</el-button>

    <el-table :data="mapList" style="width: 100%">
        <el-table-column prop="api_id" label="API ID" width="180"></el-table-column>
        <el-table-column prop="caller" label="Caller" width="180"></el-table-column>
        <el-table-column prop="call_time" label="Call Time" width="180"></el-table-column>
        <el-table-column prop="duration" label="Duration" width="180"></el-table-column>
        <el-table-column prop="error_message" label="Error Message"></el-table-column>
    </el-table>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      weatherList: [],
      mapList: []
    }
  },
  methods: {
    getWeatherInfo () {
      axios.get('http://127.0.0.1:8081/apiInfo?apiId=' + this.weatherId)
        .then((response) => {
          this.weatherCnt = response.data[0].call_count
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getWeatherList () {
      axios.get('http://127.0.0.1:8081/apiDetail?apiId=' + this.weatherId)
        .then((response) => {
          this.weatherList = response.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getMapInfo () {
      axios.get('http://127.0.0.1:8081/apiInfo?apiId=' + this.mapId)
        .then((response) => {
          this.mapCnt = response.data[0].call_count
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getMapList () {
      axios.get('http://127.0.0.1:8081/apiDetail?apiId=' + this.mapId)
        .then((response) => {
          this.mapList = response.data
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
.a {
    color: rgb(255, 157, 0);
    font-weight: bold;
    display: inline-block;
    margin: 30px 30px;
    text-align: center;
    font-size: large;
}

.my-table {
    width: 100%;
    text-align: center;
    margin: 0 0;
    border-collapse: collapse;
    padding: 10px;
    border: 1px solid #ccc;
}
</style>

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
