interface IDir {
  name: string;
  type: 'directory' | 'file';
  mtime: Date;
}
