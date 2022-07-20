import axios from 'axios'
import { obj2SearchParam } from './index'

export default {
  list: function () {
    return axios.get("/cetus/authorInfo/list.json")
  },
  update: function (formData) {
    console.log(formData)
    return axios.put("/cetus/authorInfo/update.json", formData)
  },
  save: function (formData) {
    return axios.post("/cetus/authorInfo/insert.json", formData)
  },
  delete: function (obj) {
    console.log(obj)
    return axios.delete("/cetus/authorInfo/delete.json" + obj2SearchParam(obj))
  },

}
