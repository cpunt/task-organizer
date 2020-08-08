function cancelByEsc (e) {
  if (e.keyCode == '27') {
    document.removeEventListener('keyup', this.cancelByEsc);
    this.cancel()
  }
}

export { cancelByEsc };
