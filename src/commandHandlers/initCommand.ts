import { Command } from 'commander'
import fs from 'fs/promises'
import path from 'path'

const DIRECTORIES = ['branches', 'hooks', 'info', 'objects', 'refs', 'refs/heads', 'refs/tags']

const HEAD_CONTENT = 'ref: refs/heads/master\n'

export function initCommand() {
  return {
    name: 'init',
    action: async (program: Command) => {
      const { dryRun, directory } = program.opts() // 获取选项
      const repoDir = process.cwd()
      const jsgitDir = path.resolve(repoDir, directory || '.jsgit') // 使用自定义目录

      await (dryRun ? dryRunInitialization(repoDir, jsgitDir) : initializeRepository(repoDir, jsgitDir))
    },
  }
}

async function dryRunInitialization(repoDir: string, jsgitDir: string) {
  console.log(`🗄️ (Dry Run) This would initialize a new repository in: ${repoDir}`)
  console.log(`🔧 (Dry Run) Create directory: ${jsgitDir}`)

  DIRECTORIES.forEach(dir => {
    console.log(`🔧 (Dry Run) Create directory: ${path.join(jsgitDir, dir)}`)
  })

  console.log(`🔧 (Dry Run) Create file: ${path.join(jsgitDir, 'HEAD')}`)
  console.log('✅ (Dry Run) A new Git repository would be initialized.')
}

async function initializeRepository(repoDir: string, jsgitDir: string) {
  console.log('🗄️ Initializing a new repository...')

  try {
    await fs.access(jsgitDir)
    console.error('❌ A Git repository already exists in this directory.')
    process.exit(1)
  } catch (error) {
    await createDirectory(jsgitDir)
    console.log(`🗄️ Initializing a new repository in: ${repoDir}`)

    await Promise.all(DIRECTORIES.map(dir => createDirectory(path.join(jsgitDir, dir))))

    await fs.writeFile(path.join(jsgitDir, 'HEAD'), HEAD_CONTENT)
    console.log('✅ A new Git repository has been initialized at:', jsgitDir)
  }
}

async function createDirectory(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true })
    console.log(`🔧 Created directory: ${dir}`)
  } catch (err) {
    console.error(`❌ Failed to create directory: ${dir}`, err)
    process.exit(1)
  }
}
