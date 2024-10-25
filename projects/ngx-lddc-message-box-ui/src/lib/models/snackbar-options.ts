import { AriaLivePoliteness } from "@angular/cdk/a11y";
import { Direction } from "@angular/cdk/bidi";
import { ViewContainerRef } from "@angular/core";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export type Positions = "TOPRIGHT" | "TOPCENTER" | "TOPLEFT" | "BOTTOMRIGHT" | "BOTTOMCENTER" | "BOTTOMLEFT"

export type SnackBarOptions = {
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