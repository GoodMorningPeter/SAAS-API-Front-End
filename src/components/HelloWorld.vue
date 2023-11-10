<template>
  <div class="hello">
    <el-row>
      <el-descriptions title="天气API" class="a">
        <el-descriptions-item label="api_id" >{{ this.weatherId }}</el-descriptions-item>
        <el-descriptions-item label="api_count" >{{ this.weatherCnt }}</el-descriptions-item>
      </el-descriptions>
      <el-table :data = "weatherList" class="my-table">
        <el-table-column prop="api_id" label="api_id" width="180"></el-table-column>
        <el-table-column prop="caller" label="caller" width="180"></el-table-column>
        <el-table-column prop="call_time" label="call_time" width="180"></el-table-column>
        <el-table-column prop="duration" label="duration" width="180"></el-table-column>
        <el-table-column prop="error_message" label="error_message" width="180"></el-table-column>
      </el-table>
      <el-descriptions title="地图API" class="a">
        <el-descriptions-item label="api_id" >{{ this.mapId }}</el-descriptions-item>
        <el-descriptions-item label="api_count" >{{ this.mapCnt }}</el-descriptions-item>
      </el-descriptions>
      <el-table :data = "mapList" class="my-table">
        <el-table-column prop="api_id" label="api_id" width="180"></el-table-column>
        <el-table-column prop="caller" label="caller" width="180"></el-table-column>
        <el-table-column prop="call_time" label="call_time" width="180"></el-table-column>
        <el-table-column prop="duration" label="duration" width="180"></el-table-column>
        <el-table-column prop="error_message" label="error_message" width="180"></el-table-column>
      </el-table>


    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      weatherList: [],
      weatherId: 1,
      weatherCnt: 0,
      mapList: [],
      mapId: 2,
      mapCnt: 0

    }
  },
  methods: {
    getWeatherInfo(){
      console.log("getInfo")
      this.$http.get('http://127.0.0.1:8081/apiInfo?apiId=' + this.weatherId)
        .then(Response => {
          console.log(Response.data[0].call_count)
          this.weatherCnt = Response.data[0].call_count
          console.log(this.weatherCnt)
        })
    },
    getWeatherList() {
      console.log("getList")
      this.$http.get('http://127.0.0.1:8081/apiDetail?apiId=' + this.weatherId)
        .then(Response => {
          this.weatherList = Response.data
        })
    },
    getMapInfo(){
      console.log("getInfo")
      this.$http.get('http://127.0.0.1:8081/apiInfo?apiId=' + this.mapId)
        .then(Response => {
          console.log(Response.data[0].call_count)
          this.mapCnt = Response.data[0].call_count
          console.log(this.mapCnt)
        })
    },
    getMapList() {
      console.log("getList")
      this.$http.get('http://127.0.0.1:8081/apiDetail?apiId=' + this.mapId)
        .then(Response =>{
          this.mapList = Response.data
        })
    }
  },
  created(){
    this.getWeatherInfo(),
    this.getWeatherList(),
    this.getMapInfo(),
    this.getMapList()
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
  font-size: large
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
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
