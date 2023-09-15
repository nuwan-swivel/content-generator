export function insertPause(this: any) {
  const { index, length } = this.quill.getSelection();
  this.quill.insertText(index + length, "</s>");
  this.quill.insertText(index, `<s>`);
  this.quill.setSelection(index);
}

export function insertDelay(this: any) {
  const { index, length  } = this.quill.getSelection();
  this.quill.insertText(index + length, `<break time="3s"/>`);
  this.quill.setSelection(index);
}

export function insertProsody(this: any) {
  const { index, length } = this.quill.getSelection();
  this.quill.insertText(index + length, `</prosody>`);
  this.quill.insertText(index, `<prosody volume="loud" rate="slow">`);
  this.quill.setSelection(index);
}