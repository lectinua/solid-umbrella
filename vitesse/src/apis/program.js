import axios from 'axios'
import { obj2SearchParam } from '~/apis'

export default {
  page: function (pagination) {
    return axios.get("/cetus/progrmInfo/list.json" + obj2SearchParam(pagination))
  },
  list() {
    return axios.get('/cetus/progrmInfo/list.json')
  }
}
