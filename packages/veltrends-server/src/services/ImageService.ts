import pkg from 'aws-sdk'

import axios from 'axios'
import { nanoid } from 'nanoid'
const { CF_ACCOUNT_ID, CF_KEY_ID, CF_KEY_SECRET } = process.env

const { S3 } = pkg

const r2 = new S3({
  endpoint: `https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: CF_KEY_ID,
  secretAccessKey: CF_KEY_SECRET,
  signatureVersion: 'v4',
  region: 'auto',
})

import mimeTypes from 'mime-types'

export class ImageService {
  private static instance: ImageService
  public static getInstance() {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService()
    }
    return ImageService.instance
  }

  public async listBuckets() {
    return r2.listBuckets().promise()
  }

  async generateSignedUrl(path: string, fileName: string) {
    const contentType = mimeTypes.lookup(fileName)

    const params = {
      Bucket: 'assets',
      Key: `${path}/${fileName}`,
      Expires: 60,
      ContentType: contentType,
    }

    return r2.getSignedUrlPromise('putObject', params)
  }

  async downloadFile(url: string) {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, 'binary')
    const extension = mimeTypes.extension(response.headers['content-type'])
    return { buffer, extension }
  }

  async uploadFile(key: string, file: Buffer) {
    const mimeType = mimeTypes.lookup(key) || 'image/png'

    const params = {
      Bucket: 'images',
      Key: key,
      ContentType: mimeType,
      Body: file,
    }

    return r2.upload(params).promise()
  }

  createFileKey({ type, id, extension }: CreateFileKeyParams) {
    return `${type}/${id}/${nanoid()}.${extension}`
  }
}

interface CreateFileKeyParams {
  type: 'item' | 'publisher'
  id: number
  extension: string
}
