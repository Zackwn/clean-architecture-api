import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = (app: Express) => {
  const router = Router()
  app.use('/api', router)
  readdirSync(join(__dirname, '..', 'routes')).map(async filename => {
    if (!filename.includes('.spec.')) {
      (await import(`../routes/${filename}`)).default(router)
    }
  })
}