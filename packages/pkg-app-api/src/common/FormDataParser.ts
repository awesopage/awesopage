import busboy from 'busboy'
import { NextApiRequest } from 'next'

export const parseFormData = async <K extends string>(req: NextApiRequest): Promise<Partial<Record<K, string>>> => {
  const formData: Partial<Record<K, string>> = {}

  await new Promise((resolve, reject) => {
    const formParser = busboy({ headers: req.headers })

    formParser
      .on('field', (key, value) => {
        formData[key as K] = value
      })
      .on('close', resolve)
      .on('error', reject)

    req.pipe(formParser)
  })

  return formData
}
