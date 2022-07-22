import { acceptHMRUpdate, defineStore } from 'pinia'
import { parse } from '~/apis'
import apiMenu from '~/apis/menu'
// import apiProg from '~/apis/program'

interface Menu {
  sortNo: number
  menuNo: number
  upperMenuNo: number
  programUid: number
  menuNm: string
  url?: string
}

// interface Program {
//   uid: number
//   url: string
// }

export class MenuTree {
  label: string
  parent?: number
  url?: string
  data: Object
  children?: Array<MenuTree>

  constructor(menu: Partial<Menu>, parent: number, children: Array<MenuTree> = [], data: Object = {}) {
    this.label = menu.menuNm || ''
    this.parent = parent
    this.url = menu.url
    this.children = children
    this.data = data
  }
}

export const useMenuStore = defineStore('menu', () => {
  let origin_menus: Array<Menu>
  let rootMenuNo: number

  const userStore = useUserStore()

  /**
     * ### ex)
     * import type { MenuTree } from '~/store/menu'
     * useMenuStore().load().then((menus: Array<MenuTree>) => doSomething(menus))
     * @param withMenuData true일 때 CETUS_MENU_INFO 데이터를 data 변수에 담음
     */
  async function load(withMenuData = false, authorCd: String): Promise<Array<MenuTree>> {
    function sortMenu(a: Menu, b: Menu) {
      return a.sortNo - b.sortNo
    }

    // TODO 임시: 세션 처리 대체
    await apiMenu.list({ authorCd: authorCd == null ? userStore.user?.authorCd : authorCd })
      .then(res =>
        origin_menus = parse(res).data.list
          .sort(sortMenu)
      )

    // await apiProg.list()
    //   .then(res => {
    //     const programs = parse(res).data.list
    //     origin_menus.forEach(menu => {
    //       const program = programs.find((p: Program) => p.uid === menu.programUid)
    //       if (program !== undefined) {
    //         menu.url = program.url
    //       }
    //     })
    //   })

    rootMenuNo = origin_menus.filter(menu => menu.upperMenuNo === undefined)[0].menuNo

    function findChildren(menuNo: number): Array<MenuTree> {
      return origin_menus
        .filter(menu => menu.upperMenuNo === menuNo)
        .sort(sortMenu)
        .map(menu => new MenuTree(menu, menuNo, findChildren(menu.menuNo), withMenuData ? menu : {}))
    }

    return findChildren(rootMenuNo)
  }

  return { load }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
