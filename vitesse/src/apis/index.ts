import { isNull } from 'lodash-es'
import { ElMessage } from 'element-plus'
import axios from 'axios'

/**
 * 오류 메시지
 */
export function error(msg = '요청 오류') {
  ElMessage.error({
    message: msg,
    showClose: true,
    grouping: true
  })
}

interface Map {
  [index: string]: any
}
export interface Parsed {
  code: Number
  message: string
  data: any
}

/**
 * front: postJson('/cetus/test/saveList.json', [{}, {}, ...])...
 * back: @RequestBody(List<TestVO> list)...
 * @param url
 * @param data
 */
export function postJson(url: string, data: any) {
  return axios.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export function parse({ data }: { data: Parsed }): Parsed {
  return data
}

export function obj2FormData(obj: Map): FormData {
  const formData = new FormData()
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((x: any) => formData.append(key, x))
    } else {
      formData.append(key, obj[key])
    }
  }
  return formData
}

export function formData2Obj(formData: FormData): Map {
  const obj: Map = {}
  Array.from(formData.entries())
    .forEach(([key, value]) => {
      if (Object.hasOwn(obj, key)) {
        obj[key] = [...obj[key], value]
      } else {
        obj[key] = value
      }
    })
  return obj
}

export function obj2SearchParam(obj: Map): String {
  let param: String = '?'
  for (const key in obj) {
    if (!isNull(obj[key])) {
      if (param.length > 1)
        param += '&'
      param += `${key}=${obj[key]}`
    }
  }
  return param
}
