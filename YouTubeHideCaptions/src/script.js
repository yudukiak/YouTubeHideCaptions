const SWITCH_ID = 'ydk-caption-switch'
const STORAGE_KEY = 'youtube-caption-visible'

/**
 * 保存済みの設定を字幕とチェックボックスへ反映する。
 * 未保存の場合は字幕を表示する。
 */
const applyCaptionState = () => {
  const visible = localStorage.getItem(STORAGE_KEY) !== 'false'

  const checkboxElm = document.querySelector(`#${SWITCH_ID} input`)
  if (checkboxElm) {
    checkboxElm.checked = visible
  }

  document.documentElement.classList.toggle(
    'youtube-caption-hidden',
    !visible
  )
}

/**
 * /watch・/live で既存の #ydk-title-slot 内に字幕表示切替を追加する。
 * slot 未作成・追加済み・対象外ページの場合は何もしない。
 */
const setupSwitch = () => {
  if (!/^\/(live|watch)/.test(location.pathname)) return

  // 追加済みなら何もしない
  if (document.getElementById(SWITCH_ID)) return

  // title-slot.js が用意する共有ラッパー。無ければ待つ
  const slotElm = document.getElementById('ydk-title-slot')
  if (!slotElm) return

  const wrapperElm = document.createElement('div')
  wrapperElm.id = SWITCH_ID

  const labelElm = document.createElement('label')

  const checkboxElm = document.createElement('input')
  checkboxElm.type = 'checkbox'

  const textElm = document.createElement('span')
  textElm.textContent = '字幕'

  // 切り替えた状態を保存して字幕へ反映
  checkboxElm.addEventListener('change', () => {
    localStorage.setItem(
      STORAGE_KEY,
      String(checkboxElm.checked)
    )

    applyCaptionState()
  })

  labelElm.append(checkboxElm, textElm)
  wrapperElm.append(labelElm)
  slotElm.append(wrapperElm)

  applyCaptionState()
}

// YouTube は SPA のため、slot 出現後にバーを付け直す
let updateScheduled = false

const observer = new MutationObserver(() => {
  if (updateScheduled) return

  updateScheduled = true

  requestAnimationFrame(() => {
    updateScheduled = false
    setupSwitch()
  })
})

setupSwitch()
applyCaptionState()

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
})
