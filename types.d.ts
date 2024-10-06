import { Command } from 'commander';

declare module 'commander' {
  interface Command {
    dryRun?: boolean; // 添加 dryRun 属性
  }
}
