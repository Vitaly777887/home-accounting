import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Message} from '../models/message.model';

@Injectable()
export class ShowMessageService {
  constructor(private  snackBar: MatSnackBar) {
  }

  show(message: Message): void {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    config.panelClass = [`alert-${message.type}`, 'alert'];
    this.snackBar.open(message.text, undefined, config);
  }
}
