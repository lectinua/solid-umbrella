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
    return postJson("/cetus/menuInfo/authSave.json", data)
  },
  insert: function (formData) {
    return axios.post("/cetus/menuInfo/insert.json", formData)
  },
  delete(data) {
    return axios.delete("/cetus/menuInfo/delete.json" + obj2SearchParam(data))
  },
  update: function (formData) {
    return axios.put("/cetus/menuInfo/update.json", formData)
  },

}
