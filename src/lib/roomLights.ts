/** Shared by RoomLights (client) and GalleryRoom (server, inline script). */
export const loadLight = (root: ParentNode, mode: string) => {
  root.querySelectorAll<HTMLImageElement>(`img[data-light="${mode}"]`).forEach(img => {
    if (img.dataset.srcset && !img.srcset) { img.sizes = img.dataset.sizes || ''; img.srcset = img.dataset.srcset }
    if (img.dataset.src && !img.getAttribute('src')) img.src = img.dataset.src
  })
}

/** Inline, runs as the HTML is parsed (before hydration) so the first light is requested immediately. */
export const LOAD_ACTIVE_LIGHT = `(function(){var r=document.currentScript.parentNode,m=document.documentElement.dataset.time||'morning';r.querySelectorAll('img[data-light="'+m+'"]').forEach(function(i){if(i.dataset.srcset&&!i.srcset){i.sizes=i.dataset.sizes||'';i.srcset=i.dataset.srcset}if(i.dataset.src&&!i.getAttribute('src'))i.src=i.dataset.src})})();`
