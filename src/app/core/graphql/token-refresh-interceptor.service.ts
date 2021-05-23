import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { AuthStateService } from 'src/app/auth/auth-state.service'

@Injectable({ providedIn: 'root' })
export class TokenRefreshInterceptorService implements HttpInterceptor {
  constructor(private readonly authStateService: AuthStateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { accessToken } = this.authStateService
    if (!accessToken) return next.handle(request)

    return next
      .handle(request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` }, withCredentials: true }))
      .pipe(
        concatMap(event => {
          if (
            event.type !== HttpEventType.Response ||
            event.status !== 200 ||
            !event.body ||
            !Array.isArray(event.body.errors) ||
            !event.body.errors.length
          )
            return of(event)

          const errors = event.body.errors as any[]
          const shouldAuthenticate = errors.some(e => e.extensions?.code === 'INVALID_ACCESS_TOKEN')
          if (!shouldAuthenticate) return of(event)

          return this.authStateService
            .refreshAccessToken()
            .pipe(
              concatMap(newAccessToken =>
                next.handle(
                  request.clone({ setHeaders: { Authorization: `Bearer ${newAccessToken}` }, withCredentials: true })
                )
              )
            )
        })
      )
  }
}
