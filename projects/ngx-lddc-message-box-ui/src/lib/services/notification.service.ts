import { AriaLivePoliteness } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { inject, Injectable, ViewContainerRef } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, TextOnlySnackBar } from '@angular/material/snack-bar';
import { map, Observable, of } from 'rxjs';

export type Positions = "TOPRIGHT" | "TOPCENTER" | "TOPLEFT" | "BOTTOMRIGHT" | "BOTTOMCENTER" | "BOTTOMLEFT"

type SnackBarOptions = {
  announcementMessage?: string,
  direction?: Direction,
  duration?: number,
  horizontalPosition?: MatSnackBarHorizontalPosition,
  verticalPosition?: MatSnackBarVerticalPosition,
  politeness?: AriaLivePoliteness,
  panelClass?: string[],
  viewContainerRef?: ViewContainerRef
  data?: any,
}

export type SnackOptions = {
  action?: string,
  duration?: number,
  position?: Positions,
  panelClass?: string[]
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly _snackBar = inject(MatSnackBar)

  private _baseSnackBarOption: SnackBarOptions = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 3000
  }

  /**
   * Open basic snackbar
   * @param message The message to display in the snackBar
   * @param action Text to display in action button if needed
   * @param _options All options to manage the SnackBar
   * @returns MatSnackBarRef<TextOnlySnackBar>
   */
  private openSnackBar(message: string, action?: string, _options?: SnackBarOptions): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, action, _options);
  }


  /**
   * Create Snackbar with action button
   * @param message The message to display in the snackBar
   * @param action Text to display in action button if needed
   * @param _options All options to manage the SnackBar
   * @returns A boolean Observable to indicate if the action was pressed
   */
  private snackBarAction(message: string, action: string, _options: SnackBarOptions): Observable<boolean> {
    const snackbar = this.openSnackBar(message, action, _options);
    return this.snackBarSubscription(snackbar)
  }

  private snackBarSubscription(_snackBar: MatSnackBarRef<TextOnlySnackBar>): Observable<boolean> {
    let closedByAction = false;
    _snackBar.onAction().subscribe(() => closedByAction = true);
    return _snackBar.afterDismissed().pipe(map(() => closedByAction));
  }

  /**
   * Convert the type Positions to MatSnackBarVerticalPosition
   * @param {Positions} pos The position
   * @returns Linked MatSnackBarVerticalPosition
   */
  private getVerticalPosition(pos?: Positions): MatSnackBarVerticalPosition {
    switch (pos) {
      case 'TOPRIGHT':
      case 'TOPCENTER':
      case 'TOPLEFT':
        return 'top';
      case 'BOTTOMRIGHT':
      case 'BOTTOMCENTER':
      case 'BOTTOMLEFT':
      default: return 'bottom';
    }
  }

  /**
   * Convert the type Positions to MatSnackBarHorizontalPosition
   * @param {Positions} pos The position
   * @returns Linked MatSnackBarHorizontalPosition
   */
  private getHorizontalPosition(pos?: Positions): MatSnackBarHorizontalPosition {
    switch (pos) {
      case 'TOPLEFT':
      case 'BOTTOMLEFT':
        return 'left';
      case 'BOTTOMRIGHT':
      case 'TOPRIGHT':
        return 'right';
      case 'TOPCENTER':
      case 'BOTTOMCENTER':
      default: return 'center';
    }
  }

  /**
   * Convert SnackOptions to SnackBarOptions
   * Convert Value to set necessary options for the snackbar
   * @param option Options to convert 
   * @returns Converted Option (SnackBarOptions)
   */
  private getSnackBarOptions(option?: SnackOptions): SnackBarOptions {
    return {
      panelClass: option?.panelClass,
      duration: option?.duration ? option.duration : this._baseSnackBarOption.duration,
      verticalPosition: this.getVerticalPosition(option?.position),
      horizontalPosition: this.getHorizontalPosition(option?.position)
    }
  }

  /**
   * Create a Material SnackBar 
   * @param message The message to indacate in the snackbar
   * @param _options Options not mandatory to personnalize the snackbar
   * @returns Boolean Observable to indicate if action button was pressed (Return false if no action required)
   */
  notify(message: string, _options?: SnackOptions): Observable<boolean> {
    if (_options?.action) {
      return this.snackBarAction(message, _options.action, this.getSnackBarOptions(_options));
    } else {
      this.openSnackBar(message, '', this.getSnackBarOptions(_options))
      return of(false)
    }
  }
}
