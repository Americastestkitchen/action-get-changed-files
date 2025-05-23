import { ICommand } from './command';
import { Format, Options } from '../options';
import { GetFoldersCommand, GetFilesCommand, IgnoreCommand, CsvFormatCommand, NewlineFormatCommand, JsonFormatCommand } from '.';
import { DeduplicateCommand } from './deduplicate';
import { GetSubdirectoriesCommand } from './get-subdirectories';

class CommandFactory {
  constructor() {

  }

  make(options: Options): ICommand[] {
    const commands: ICommand[] = []

    if(options.targetDirectory) {
      commands.push(new GetSubdirectoriesCommand(options.targetDirectory))
    }
    else if(options.foldersOnly) {
      commands.push(new GetFoldersCommand())
    }
    else {
      commands.push(new GetFilesCommand())
    }

    if(options.ignore) {
      commands.push(new IgnoreCommand(options.ignore))
    }

    commands.push(new DeduplicateCommand())

    return commands
  }
}

class FormatFactory {
  make(format: Format) {
    switch(format) {
      case 'csv':
        return new CsvFormatCommand()
      case 'newline':
        return new NewlineFormatCommand()
      default:
        return new JsonFormatCommand()
    }
  }
}

export const formatFactory = new FormatFactory()

export const commandFactory = new CommandFactory()