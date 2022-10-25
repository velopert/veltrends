import { RemixBrowser } from '@remix-run/react'
// import { startTransition, StrictMode } from 'react'
import { hydrate } from 'react-dom'
// import { hydrateRoot } from 'react-dom/client'
import { initializeAnalytics } from './lib/analytics'

hydrate(<RemixBrowser />, document)

// function hydrate() {
//   startTransition(() => {
//     hydrateRoot(
//       document,
//       <StrictMode>
//         <RemixBrowser />
//       </StrictMode>,
//     )
//   })
// }

// if (window.requestIdleCallback) {
//   window.requestIdleCallback(hydrate)
// } else {
//   // Safari doesn't support requestIdleCallback
//   // https://caniuse.com/requestidlecallback
//   window.setTimeout(hydrate, 1)
// }

initializeAnalytics()
