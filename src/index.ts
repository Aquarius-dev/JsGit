#!/usr/bin/env node

import { Command } from 'commander'
import { commandCollections } from './commandHandlers'
import { getVersionInfo } from './version'

(async () => {
  const program = new Command()
  const versionInfo = getVersionInfo()

  program
    .version(versionInfo, '-v, --version', 'Output the current version with platform info')
    .description('🛠️ jsgit: A simple command-line tool for simulating basic Git functionalities.')
    .option('-n, --dry-run', 'Show what would be done without making any changes')

  // 使用异步命令进行注册
  commandCollections.forEach(({ name, action }) => {
    program.command(name).action(async () => {
      try {
        await action(program)
      } catch (error) {
        console.error(`Error executing command "${name}":`, error)
      }
    })
  })

  if (process.argv.length <= 2) {
    program.outputHelp()
    process.exit(0)
  }

  program.parse(process.argv)
  program.dryRun = program.opts().dryRun ?? false
})()
