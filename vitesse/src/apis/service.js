import axios from 'axios'
import {obj2FormData, obj2SearchParam} from './index'

export default {
  page(pagination) {
    return axios.get("/cetus/service/list.json" + obj2SearchParam(pagination))
  },
//   update(obj) {
//     return axios.put("/cetus/tenant/update.json", obj2FormData(obj))
//   },
//   delete(uid) {
//     return axios.delete(`/cetus/tenant/delete.json` + obj2SearchParam({
//       uid: uid,
//       updtUid: uid
//     }))
//   },
  sevSave(formData) {
    return axios.post("/cetus/service/createServiceTeant.json", obj2FormData(formData))
  }
}
