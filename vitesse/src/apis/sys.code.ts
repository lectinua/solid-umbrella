import axios from 'axios'
import { parse } from '~/apis/index'

export interface SysCode {
  code: string
  codeNm: string
}

function get(upperCode: string): Promise<any> {
  return axios.get(`/cetus/sysCode/list.json?upperCode=${upperCode}`)
}

/**
 * ex) code('MENU_TP_CD').then(list => bbsTp.value = list)
 * @param upperCode
 */
export default function code(upperCode: string) {
  return get(upperCode)
    .then(res => parse(res).data.list)
    .then((list: Array<SysCode>) => list)
}

/** upperCodes
 * SELECT *
 *   FROM cetus_sys_code
 *  WHERE CODE IN (SELECT UPPER_CODE FROM cetus_sys_code GROUP BY UPPER_CODE)
 */
