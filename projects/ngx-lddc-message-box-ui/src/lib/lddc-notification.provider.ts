import { InjectionToken } from '@angular/core';
import { Positions } from './models/snackbar-options';

export interface NotificationConfig {
    duration: number
    position: Positions;
}

export const NOTIFICATION_CONFIG_TOKEN = new InjectionToken<NotificationConfig | undefined>('NOTIFICATION_CONFIG_TOKEN');
