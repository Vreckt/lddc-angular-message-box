# lddc-angular-message-box

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install foobar.

```bash
npm install lddc-message-box-ui-1.18.0.tgz
```

## Usage
### Dont forget to add the Provider in your app.module.ts or in your app.config.ts
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NOTIFICATION_CONFIG_TOKEN, NotificationConfig } from 'lddc-message-box-ui';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    {
      provide: NOTIFICATION_CONFIG_TOKEN,
      useValue: {
        duration: 1000,
        position: 'BOTTOMRIGHT'  
      } as NotificationConfig
    }
  ]
};
```
