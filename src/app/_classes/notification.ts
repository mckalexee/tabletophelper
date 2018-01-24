import { Subject } from 'rxjs/Subject';

export class Button {
  name: string;
  color?: string;
}

export class Notification {
  message: string;
  response?: Subject<string>;
  buttons?: Button[];
}
