import axios from 'axios'
import { formData2Obj, obj2FormData, obj2SearchParam } from '~/apis'

export default {
  page(pagination) {
    return axios.get("/cetus/user/list.json" + obj2SearchParam(pagination))
  },
  view(obj) {
    return axios.get("/cetus/user/view.json" + obj2SearchParam(obj))
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
  insert(data) {
    return axios.post("/cetus/user/insert.json", obj2FormData(data))
  },
  tenantList(pagination) {
    return axios.get("/cetus/tenantUser/userInTenantList.json" + obj2SearchParam(pagination))
  },
  mnglist(pagination) {
    return axios.get("/cetus/user/userMnglist.json" + obj2SearchParam(pagination))
  },
  userMnglist(pagination) {
    return axios.get("/cetus/tenantAuthorInfo/userAuthMnglist.json" + obj2SearchParam(pagination))
  },
  tenantAuthInfo(pagination) {
    return axios.get("/cetus/tenantAuthorInfo/list.json" + obj2SearchParam(pagination))
  },
  checkUserId(obj) {
    return axios.get("/cetus/user/checkId.json" + obj2SearchParam(obj))
  },
}
