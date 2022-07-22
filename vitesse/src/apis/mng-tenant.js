import axios from 'axios'
import { obj2SearchParam, obj2FormData } from './index'

export default {
  page(pagination) {
    return axios.get("/cetus/tenant/list.json" + obj2SearchParam(pagination))
  },
  update(obj) {
    return axios.put("/cetus/tenant/update.json", obj2FormData(obj))
  },
  delete(uid) {
    return axios.delete(`/cetus/tenant/delete.json` + obj2SearchParam({
      uid: uid,
      updtUid: uid
    }))
  },
  save(obj) {
    return axios.post("/cetus/tenant/insert.json", obj2FormData(obj))
  },
  joinList(pagination) {
    return axios.get("/cetus/tenant/joinServicelist.json" + obj2SearchParam(pagination))
  },
  joinServiceSelectBoxlist(pagination) {
    return axios.get("/cetus/tenant/joinServiceSelectBoxlist.json" + obj2SearchParam(pagination))
  },
  view(obj) {
    return axios.get("/cetus/tenant/view.json" + obj2SearchParam(obj))
  },
  checkKey(obj) {
    return axios.get("/cetus/tenant/checkKey.json" + obj2SearchParam(obj))
  }
}