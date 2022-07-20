import axios from 'axios'
import { formData2Obj, obj2SearchParam } from '~/apis'

export default {
  page(pagination) {
    return axios.get("/cetus/user/list.json" + obj2SearchParam(pagination))
  },
  update(formData) {
    return axios.put("/cetus/user/update.json", formData)
  },
  session() {
    return axios.get("/cetus/user/session.json")
  },
  login(formData) {
    return axios.get(`/cetus/user/login.json${obj2SearchParam(formData2Obj(formData))}`)
  },
  logout() {
    return axios.get("/cetus/user/logout.json")
  },
  insert(formData) {
    return axios.post("/cetus/user/insert.json", formData)
  },
  tenantList(pagination) {
    return axios.get("/cetus/tenant/list.json" + obj2SearchParam(pagination))
  }
}
