export function insertEmphasis(this: any) {
  const { index, length } = this.quill.getSelection();
  this.quill.insertText(index + length, "</prosody>");
  this.quill.insertText(index, `<prosody volume="x-loud" rate="slow">`);
  this.quill.setSelection(index);
}
