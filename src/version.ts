import { version } from '../package.json'

export function getVersionInfo() {
  const platform = process.platform
  const nodeVersion = process.version
  const buildDate = new Date().toLocaleString()

  // 使用固定宽度进行对齐
  const output = `
🚀 Version:         ${version.padEnd(20)}
💻 Platform:        ${platform.padEnd(20)}
🟢 Node.js Version: ${nodeVersion.padEnd(20)}
📅 Build Date:      ${buildDate.padEnd(30)}
  `.trim()

  return output
}
