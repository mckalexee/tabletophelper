import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '../../environments/environment';

@Injectable()
export class SwUpdateService {

  constructor(private _notifySvc: NotificationService, updates: SwUpdate) {
    if (environment.production) {
      updates.available.subscribe(event => {
        const updateConfirm = this._notifySvc.add({
          message: 'New Version Available.',
          buttons: [
            { name: 'update' },
            { name: 'cancel', color: 'red' }
          ]
        });
        updateConfirm.response.subscribe(response => {
          if (response === 'update') {
            console.log('Updating Application');
            updates.activateUpdate().then(() => location.reload());
          }
        });
      });
      updates.activated.subscribe(event => {
        console.log('Update Activated', event);
      });
      updates.checkForUpdate();
    }
  }

}
