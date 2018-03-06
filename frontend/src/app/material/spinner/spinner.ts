import {AppDialogService} from '../../core/app-dialogService';

export class Spinner {

  private _dialogRef;
  private _timerRef;

  constructor(private appDialogService: AppDialogService) {
    /* wird der Dialog aus einem onInit einer Componente aufgerufen zickt Angular, daher der setTimeout()*/
    this.timerRef = setTimeout(() => this.dialogRef = appDialogService.showSpinner());
  }

  get dialogRef() {
    return this._dialogRef;
  }

  set dialogRef(value) {
    this._dialogRef = value;
  }

  get timerRef() {
    return this._timerRef;
  }

  set timerRef(value) {
    this._timerRef = value;
  }

  stop() {
    clearTimeout(this._timerRef);
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
