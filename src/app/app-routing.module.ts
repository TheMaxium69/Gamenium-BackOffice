import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrComponent} from "./global/err/err.component";
import {PermsComponent} from "./administration/perms/perms.component";
import {WarnComponent} from "./moderation/warn/warn.component";
import {SettingComponent} from "./setting/setting.component";
import {ProfilComponent} from "./provider/profil/profil.component";

const routes: Routes = [
  /* HOME / DASHBOARD */
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},

  /* ADMIN */
  {path: 'admin/perms', component: PermsComponent},

  /*MODO*/
  {path: 'modo/warn', component: WarnComponent},

  /*REDAC*/

  /* PROVIDER*/
  {path: 'provider/profil', component: ProfilComponent},

  /* OTHER*/
  {path: 'settings', component: SettingComponent},
  {path: 'err', component: ErrComponent},
  {path: '**', component: ErrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
