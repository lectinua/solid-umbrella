import axios from 'axios'
import { obj2SearchParam } from './index'

export default {
  page() {
    return axios.get("/cetus/sysCode/list.json")
  },
  update(formData) {
    return axios.put("/cetus/sysCode/update.json", formData)
  },
  view(obj) {
    return axios.get("/cetus/sysCode/view.json" + obj2SearchParam(obj))
  },
  save(formData) {
    return axios.post("/cetus/sysCode/insert.json", formData)
  },
  delete(obj) {
    return axios.delete("/cetus/sysCode/delete.json" + obj2SearchParam(obj))
  },
  childrenlist(obj) {
    return axios.get("/cetus/sysCode/childrenlist.json" + obj2SearchParam(obj))
  },
  codelist(obj) {
    return axios.get("/cetus/sysCode/listCode.json" + obj2SearchParam(obj))
  },
  checkChild(obj) {
    return axios.get("/cetus/sysCode/checkChild.json" + obj2SearchParam(obj))
  }
}
