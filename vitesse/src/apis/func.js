import axios from 'axios'
import { obj2SearchParam } from '~/apis'

export default {
  page: function (pagination) {
    return axios.get("/cetus/function/list.json" + obj2SearchParam(pagination))
  },
  view(obj) {
    return axios.get("/cetus/function/view.json" + obj2SearchParam(obj))
  },
  insert(formData) {
    return axios.post("/cetus/function/insert.json", formData)
  },
  update(formData) {
    return axios.put("/cetus/function/update.json", formData)
  },
  tenantList(obj) {
    return axios.get(`/cetus/function/${obj.uid}/tenantList.json` + obj2SearchParam(obj))
  },
}
