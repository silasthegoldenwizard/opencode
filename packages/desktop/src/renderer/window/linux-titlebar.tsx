import { createSignal, onCleanup, onMount } from "solid-js"
import "./linux-titlebar.css"

export function LinuxTitlebar(props: { zoom: number }) {
  const [title, setTitle] = createSignal(document.title)

  onMount(() => {
    const sync = () => setTitle(document.title)
    const observer = new MutationObserver(sync)

    // Route metadata replaces the <title> element when switching between Home and a session.
    observer.observe(document.head, { childList: true, subtree: true, characterData: true })
    sync()
    onCleanup(() => observer.disconnect())
  })

  return (
    <div class="linux-window-titlebar" aria-hidden="true" style={{ "--linux-window-titlebar-zoom": props.zoom }}>
      <bdi dir="auto">{title()}</bdi>
    </div>
  )
}
