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
import {LogRoleComponent} from "./administration/log-role/log-role.component";
import {LogComponent} from "./administration/log/log.component";
import {UserOneComponent} from "./other/user-one/user-one.component";
import {CreateTestComponent} from "./test/create-test/create-test.component";
import {ViewTestComponent} from "./test/view-test/view-test.component";

const routes: Routes = [
  /* HOME / DASHBOARD */
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},

  /* ADMIN */
  {path: 'admin/perms', component: PermsComponent},
  {path: 'admin/logrole', component: LogRoleComponent},
  {path: 'admin/log', component: LogComponent},

  /*MODO*/
  {path: 'modo/warn', component: WarnComponent},
  {path: 'modo/warn/:id', component: WarnOneComponent},

  /*REDAC*/
  {path: 'writter/edit-article', component: EditArticleComponent},
  {path: 'writter/create-article', component: CreateArticleComponent},
  {path: 'writter/show-articles', component: ShowArticlesComponent},

  /*TEST*/
  {path: 'test/view', component: ViewTestComponent},
  {path: 'test/create', component: CreateTestComponent},

  /* PROVIDER*/
  {path: 'provider/profil', component: ProfilComponent},

  /* OTHER*/
  {path: 'user/:id', component: UserOneComponent},
  {path: 'settings', component: SettingComponent},
  {path: 'err', component: ErrComponent},
  {path: '**', component: ErrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
