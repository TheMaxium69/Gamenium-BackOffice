import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrComponent} from "./global/err/err.component";
import {PermsComponent} from "./administration/perms/perms.component";
import {WarnComponent} from "./moderation/warn/warn.component";
import {SettingComponent} from "./setting/setting.component";
import {ProfilComponent} from "./provider/profil/profil.component";
import { EditArticleComponent } from './writter/edit-article/edit-article.component';
import { CreateArticleComponent } from './writter/create-article/create-article.component';
import { ShowArticlesComponent } from './writter/show-articles/show-articles.component';
import {WarnOneComponent} from "./moderation/warn-one/warn-one.component";
import {LogRoleComponent} from "./log/log-role/log-role.component";
import {LogComponent} from "./log/log/log.component";
import {UserOneComponent} from "./other/user-one/user-one.component";
import {CreateTestComponent} from "./test/create-test/create-test.component";
import {ViewTestComponent} from "./test/view-test/view-test.component";
import {LeaderGameComponent} from "./stat/leader-game/leader-game.component";
import {LeaderProviderComponent} from "./stat/leader-provider/leader-provider.component";
import {LeaderActuComponent} from "./stat/leader-actu/leader-actu.component";
import {LeaderUserComponent} from "./stat/leader-user/leader-user.component";
import {SanctionStatComponent} from "./stat/sanction-stat/sanction-stat.component";
import {GlobalStatComponent} from "./stat/global-stat/global-stat.component";
import {ProviderOneComponent} from "./other/provider-one/provider-one.component";
import {BanComponent} from "./moderation/ban/ban.component";
import {CopyComponent} from "./stat/copy/copy.component";

const routes: Routes = [
  /* HOME / DASHBOARD */
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},

  /* ADMIN */
  {path: 'admin/perms', component: PermsComponent},

  /*MODO*/
  {path: 'modo/ban', component: BanComponent},
  {path: 'modo/warn', component: WarnComponent},
  {path: 'modo/warn/:id', component: WarnOneComponent},

  /*REDAC*/
  {path: 'writter/edit-article', component: EditArticleComponent},
  {path: 'writter/create-article', component: CreateArticleComponent},
  {path: 'writter/show-articles', component: ShowArticlesComponent},

  /*TEST*/
  {path: 'test/view', component: ViewTestComponent},
  {path: 'test/create', component: CreateTestComponent},

  /*PROVIDER*/
  {path: 'provider/profil', component: ProfilComponent},

  /*STAT*/
  {path: 'stat/global', component: GlobalStatComponent},
  {path: 'stat/sanction', component: SanctionStatComponent},
  {path: 'stat/copy', component: CopyComponent},
  {path: 'stat/leader-game', component: LeaderGameComponent},
  {path: 'stat/leader-actu', component: LeaderActuComponent},
  {path: 'stat/leader-provider', component: LeaderProviderComponent},
  {path: 'stat/leader-user', component: LeaderUserComponent},

  /*LOG*/
  {path: 'log/role', component: LogRoleComponent},
  {path: 'log/sanction', component: LogComponent},

  /* OTHER*/
  {path: 'user/:id', component: UserOneComponent},
  {path: 'provider/:id', component: ProviderOneComponent},

  {path: 'settings', component: SettingComponent},
  {path: 'err', component: ErrComponent},
  {path: '**', component: ErrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
