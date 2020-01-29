import { BrowserWindow } from 'electron'
import authService from './auth-service'
let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createAppWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })

  console.log('app-process -> authService.getProfile()', authService.getProfile())

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

export default createAppWindow
