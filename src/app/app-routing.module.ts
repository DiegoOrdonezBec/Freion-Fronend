import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessComponent } from './components/access/access.component';
import { MainComponent } from './components/main/main.component';
import { PostboardComponent } from './components/postboard/postboard.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: '', component: AccessComponent },
  { path: 'login', component: AccessComponent },
  { path: 'signup', component: AccessComponent },
  { path: 'home', component: MainComponent, children: [
        {path: 'board', component: PostboardComponent},
        {path: 'profile/:username', component: ProfileComponent}
      ] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
