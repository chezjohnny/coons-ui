export class FileWithMetadata extends File {
  metadata: any;
  constructor(fileBits: BlobPart[], fileName: string, options?) {
    super(fileBits, fileName, options);
  }
}
