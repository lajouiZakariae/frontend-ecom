export class UploadedImage {
  constructor(private file: File) {}

  getFile() {
    return this.file
  }

  getFileSize() {
    return this.file.size
  }
}
