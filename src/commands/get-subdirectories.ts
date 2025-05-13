import { ICommand, File } from './command';
import * as path from 'path';

export class GetSubdirectoriesCommand implements ICommand {
  constructor(private readonly targetDirectory: string) { }

  run(files: File[]): File[] {
    if (!this.targetDirectory) {
      return [];
    }
    console.log(files)
    return files
      .filter(file => file.filename.startsWith(`${this.targetDirectory}/`) || file.filename.startsWith(`${this.targetDirectory}`))
      .map(file => {
        // Remove the target directory prefix
        const relativePath = file.filename.substring(this.targetDirectory.length + 1);

        // Get the first subdirectory
        const firstSubdirIndex = relativePath.indexOf('/');
        if (firstSubdirIndex === -1) {
          return null; // File is directly in the target directory, not in a subdirectory
        }

        const subdirectory = relativePath.substring(0, firstSubdirIndex);
        return {
          ...file,
          filename: path.join(this.targetDirectory, subdirectory)
        };
      })
      .filter((file): file is File => file !== null)
      // Remove duplicates
      .filter((file, index, self) =>
        index === self.findIndex(f => f.filename === file.filename)
      );
  }
}