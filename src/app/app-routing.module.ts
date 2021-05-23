import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout/layout.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
