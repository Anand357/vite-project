// src/utils/dragDrop.js  — Reusable drag-and-drop for lists

/**
 * Attach drag-and-drop reordering to a list container.
 * @param {string} listId   - DOM id of the list container
 * @param {string} itemSel  - CSS selector for draggable items
 * @param {Array}  arr      - The array to reorder (mutated in place)
 * @param {Function} onDone - Called after a successful drop with the new array
 * @param {string} [idAttr='data-id'] - Attribute used to identify items
 * @param {string} [idxAttr='data-i'] - Attribute used for index
 */
export function attachDragDrop(listId, itemSel, arr, onDone, { idAttr = 'data-id', idxAttr = 'data-i' } = {}) {
  const list = document.getElementById(listId)
  if (!list) return

  let dragSrc = null

  list.querySelectorAll(itemSel).forEach(item => {
    item.addEventListener('dragstart', e => {
      dragSrc = item
      item.classList.add('dragging')
      e.dataTransfer.effectAllowed = 'move'
    })
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging')
      list.querySelectorAll(itemSel).forEach(i => i.classList.remove('drag-over'))
    })
    item.addEventListener('dragover', e => {
      e.preventDefault()
      if (item !== dragSrc) item.classList.add('drag-over')
    })
    item.addEventListener('dragleave', () => item.classList.remove('drag-over'))
    item.addEventListener('drop', e => {
      e.preventDefault()
      item.classList.remove('drag-over')
      if (!dragSrc || dragSrc === item) return

      const srcKey = dragSrc.getAttribute(idAttr) || dragSrc.getAttribute(idxAttr)
      const dstKey = item.getAttribute(idAttr) || item.getAttribute(idxAttr)

      // Try index-based first, then value-based
      const si = parseInt(dragSrc.getAttribute(idxAttr))
      const di = parseInt(item.getAttribute(idxAttr))
      if (!isNaN(si) && !isNaN(di) && si !== di) {
        const [moved] = arr.splice(si, 1)
        arr.splice(di, 0, moved)
        onDone([...arr])
        return
      }
      // id-based
      const sIdx = arr.indexOf(srcKey)
      const dIdx = arr.indexOf(dstKey)
      if (sIdx >= 0 && dIdx >= 0) {
        arr.splice(sIdx, 1)
        arr.splice(dIdx, 0, srcKey)
        onDone([...arr])
      }
    })
  })

  // Touch support
  attachTouchDrag(list, itemSel, arr, onDone, idxAttr)
}

function attachTouchDrag(list, sel, arr, onDone, idxAttr) {
  let startY, startI, clone
  list.querySelectorAll(sel).forEach((el, i) => {
    el.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY
      startI = i
      const rect = el.getBoundingClientRect()
      clone = el.cloneNode(true)
      clone.style.cssText = `position:fixed;z-index:9999;opacity:.85;pointer-events:none;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;`
      document.body.appendChild(clone)
      el.style.opacity = '.3'
    }, { passive: true })
    el.addEventListener('touchmove', e => {
      if (!clone) return
      clone.style.transform = `translateY(${e.touches[0].clientY - startY}px)`
    }, { passive: true })
    el.addEventListener('touchend', e => {
      if (!clone) return
      clone.remove(); clone = null
      list.querySelectorAll(sel).forEach(x => x.style.opacity = '')
      const endY = e.changedTouches[0].clientY
      const items = [...list.querySelectorAll(sel)]
      let destI = startI
      items.forEach((item, j) => {
        const r = item.getBoundingClientRect()
        if (endY >= r.top && endY <= r.bottom) destI = j
      })
      if (destI !== startI) {
        const [moved] = arr.splice(startI, 1)
        arr.splice(destI, 0, moved)
        onDone([...arr])
      }
    })
  })
}
