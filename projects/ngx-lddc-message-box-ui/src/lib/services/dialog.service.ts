import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogType, InputDialog, JButton } from '../models/jbutton';
import { MaterialDialogComponent } from '../features/dialogs/base-dialog.component';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly _dialog = inject(MatDialog);

  private openDialog(data: InputDialog, type: DialogType): Observable<string> {
    const dialog = this._dialog.open(MaterialDialogComponent, {
      data: {
        input: data,
        icon: type
      },
      disableClose: true
    });
    return dialog.afterClosed();
  }

  openError(input: InputDialog): Observable<string> {
    return this.openDialog(input, 'ERROR');
  }

  openWarning(input: InputDialog): Observable<string> {
    return this.openDialog(input, 'WARNING');
  }

  openQuestion(input: InputDialog): Observable<string> {
    return this.openDialog(input, 'QUESTION');
  }

  openInfo(input: InputDialog): Observable<string> {
    return this.openDialog(input, 'INFO');
  }

  confirm(input: InputDialog): Observable<string> {
    input.buttons = [JButton.Yes, JButton.No]
    return this.openDialog(input, 'QUESTION');
  }

  openComponentDialog<T>(component: ComponentType<T>, data?: any): Observable<any> {
    const dialog = this._dialog.open<T>(component, data);
    return dialog.afterClosed();
  }
}
