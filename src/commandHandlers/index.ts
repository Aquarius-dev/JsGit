import { initCommand } from './initCommand'

const commandFactories = [initCommand]

export const commandCollections = Object.values(commandFactories).map(factory => factory())
