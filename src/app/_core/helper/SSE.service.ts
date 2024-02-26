import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  private eventSource: EventSource;

  connect(): Observable<MessageEvent> {
    this.eventSource = new EventSource(`${environment.apiBaseUrl}api/quantri/SSE`);
    return new Observable(observer => {
      this.eventSource.onmessage = event => {
        console.log('SSE onmessage', event);
        observer.next(event);
      };
      this.eventSource.onerror = error => {
        console.log('SSE onerror', error);
        observer.error(error);
      };

      return () => {
        console.log('SSE disconnect');
        this.disconnect();
      };
    });
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.onerror = null;
      this.eventSource.onmessage = null;
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}