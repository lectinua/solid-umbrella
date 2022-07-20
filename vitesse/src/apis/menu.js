import axios from 'axios'
import { obj2SearchParam, postJson } from '~/apis'

export default {
  list(obj) {
    // return axios.get('http://localhost:9094/cetus/menuInfo/list.json')
    return axios.get('/cetus/menuInfo/list.json' + obj2SearchParam(obj))
  },
  menuList: function (data) {
    // TODO
    return axios.get("/cetus/menuInfo/list.json" + obj2SearchParam({ authorCd: data.authorCd, orderBy: "ASC" }))
  },
  save: function (data) {
    console.log(data)
    return postJson("/cetus/menuInfo/authSave.json", data)
  }

}
