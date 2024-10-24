import { InjectionToken } from '@angular/core';

export interface DialogConfig {
    materialButton: 'basic' | 'raised' | 'stroked' | 'flat'
    useMaterialButtons: boolean;
    customButtonClass?: string;
}

export const DIALOG_CONFIG_TOKEN = new InjectionToken<DialogConfig>('DIALOG_CONFIG_TOKEN');
