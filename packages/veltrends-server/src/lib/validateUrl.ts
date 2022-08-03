import axios from 'axios'

interface ValidateResult {
  isValid: boolean
  url: string
}

const client = axios.create({
  timeout: 8000,
})

export async function validateUrl(url: string): Promise<ValidateResult> {
  const hasProtocol = /^https?:\/\//.test(url)

  if (hasProtocol) {
    try {
      await client.get(url)
      return {
        url,
        isValid: true,
      }
    } catch (e) {
      return {
        url,
        isValid: false,
      }
    }
  }

  const withHttp = `http://${url}`
  const withHttps = `https://${url}`
  const [http, https] = await Promise.allSettled([
    client.get(withHttp),
    client.get(withHttps),
  ])

  if (https.status === 'fulfilled') {
    return {
      isValid: true,
      url: withHttps,
    }
  }

  if (http.status === 'fulfilled') {
    return {
      isValid: true,
      url: withHttp,
    }
  }

  return {
    isValid: false,
    url: withHttp,
  }
}
