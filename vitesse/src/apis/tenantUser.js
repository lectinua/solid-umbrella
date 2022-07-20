import axios from 'axios'
import { obj2SearchParam } from './index'

export default {
    page(pagination) {
        return axios.get("/cetus/tenantUser/userInfo.json" + obj2SearchParam(pagination))
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
//   save(obj) {
//     return axios.post("/cetus/tenant/insert.json", obj2FormData(obj))
//   }
}
