import { RemixBrowser } from '@remix-run/react'
import { hydrate } from 'react-dom'

console.log(process.env)

hydrate(<RemixBrowser />, document)
