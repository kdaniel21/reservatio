import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthenticatedGuard } from './auth/guards/authenticated.guard'
import { UnauthenticatedGuard } from './auth/guards/unauthenticated.guard'
import { LayoutComponent } from './layout/layout.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [UnauthenticatedGuard],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule),
        canActivate: [AuthenticatedGuard],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create-reservation/create-reservation.module').then(m => m.CreateReservationModule),
        canActivate: [AuthenticatedGuard],
        runGuardsAndResolvers: 'always',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
