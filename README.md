# lddc-angular-message-box

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm i lddc-message-box-ui2
```

## Setup

### Dont forget to add the Provider in your app.module.ts or in your app.config.ts

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { NOTIFICATION_CONFIG_TOKEN, NotificationConfig } from "lddc-message-box-ui";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: NOTIFICATION_CONFIG_TOKEN,
      useValue: {
        duration: 1000,
        position: "BOTTOMRIGHT",
      } as NotificationConfig,
    },
  ],
};
```

## Usage

2 services are provided to create messages

### Snackbar

#### import Notification service

```typescript
import { NotificationService } from "lddc-message-box-ui2";
```

#### Simple Snackbar

```typescript
this._notification.notify("My message");
```

#### Action Snackbar

You can also add a button in you snackbar to add an action in it.
Action Snackbar returned an Observable<boolean>, true indicate that the button was pressed

```typescript
this._notification
  .notify("My message", {
    action: "My button",
  })
  .subscribe((resp) => {
    if (resp) {
      // Your code
    }
  });
```

#### Snackbar options

The base position and duration are setup in the provider in app.module.ts or in app.config.ts
You can set specific paramter for each snackbar, you can change the duration and the position, this parameter will override parameters set in provider.

```typescript
this._notification.notify("My message", {
  position: "BOTTOMCENTER",
  duration: 3000,
});
```

#### Positions

Positions is a type

```typescript
export type Positions = "TOPRIGHT" | "TOPCENTER" | "TOPLEFT" | "BOTTOMRIGHT" | "BOTTOMCENTER" | "BOTTOMLEFT";
```

### Dialog

#### import Dialog service

```typescript
import { DialogService } from "lddc-message-box-ui2";

private _dialog = inject(DialogService);
```

#### import Dialog service

The are 5 differents dialogs

##### Information Dialog

```typescript
this._dialog.openInfo({ message: "Your Message !", title: "INFO" });
```

##### Question Dialog

```typescript
this._dialog.openQuestion({ message: "Your Message !", title: "QUESTION" });
```

##### Warning Dialog

```typescript
this._dialog.openWarning({ message: "Your Message !", title: "Warning" });
```

##### Confirm Dialog

```typescript
this._dialog.confirm({ message: "Your Message !", title: "CONFIRM" });
```

##### Error Dialog

```typescript
this._dialog.openError({ message: "Your Message !", title: "Error" });
```

##### Buttons

If you do not precise button in you dialog, a basic button Ok will be create for you.
Except for Confirm Dialog, 2 buttons will be create (Yes/No)

If you want to add somes buttons you need to use the class JButton and add in your method the parameters button of type JButton[]

```typescript
import { JButton } from "lddc-message-box-ui2";

this._dialog.openInfo({ message: "Your Message !", title: "INFO", buttons: [JButton.Yes, JButton.No] });
```

If you want to add a button with a personalized text inside, you can create your button to add it

```typescript
this._dialog.openInfo({ message: "Your Message !", title: "INFO", buttons: [JButton.create("My Button")] });
```

You can combine both

```typescript
this._dialog.openInfo({ message: "Your Message !", title: "INFO", buttons: [JButton.Yes, JButton.create("My Button")] });
```

###### included Buttons

```typescript
JButton.Ok, JButton.Cancel, JButton.Yes, JButton.No, JButton.Retry;
```

##### Returns

When you clicked on a button, if you want to know wich button was clicked, you nees to subscribe to your method, methods, will return a string that contain the text of your button

```typescript
this._dialog
  .openInfo({
    message: "Your Message !",
    title: "INFO",
    buttons: [JButton.Ok, JButton.Cancel],
  })
  .subscribe((resp) => {
    if (resp === JButton.Ok.label) {
      // ...
    }
  });
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
