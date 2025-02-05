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
import {WarnOneComponent} from "./other/warn-one/warn-one.component";
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
import {ActuOneComponent} from "./other/actu-one/actu-one.component";
import {GameOneComponent} from "./other/game-one/game-one.component";
import {UserProviderComponent} from "./administration/user-provider/user-provider.component";
import {ModoCommentComponent} from "./moderation/modo-comment/modo-comment.component";
import {ModoProfilComponent} from "./moderation/modo-profil/modo-profil.component";
import {ModoCopyComponent} from "./moderation/modo-copy/modo-copy.component";
import {LogActuComponent} from "./log/log-actu/log-actu.component";
import {AddBadgeComponent} from "./administration/add-badge/add-badge.component";
import { ShowArticleComponent } from './provider/show-article/show-article.component';
import { ProviderCreateArticleComponent } from './provider/provider-create-article/provider-create-article.component';
import { ProviderEditArticleComponent } from './provider/provider-edit-article/provider-edit-article.component';
import {WarnAdminComponent} from "./administration/warn-admin/warn-admin.component";
import {ModoActuComponent} from "./moderation/modo-actu/modo-actu.component";
import {CommentOneComponent} from "./other/comment-one/comment-one.component";
import {CommentReplyOneComponent} from "./other/comment-reply-one/comment-reply-one.component";
import {BadgeOneComponent} from "./other/badge-one/badge-one.component";

const routes: Routes = [
  /* HOME / DASHBOARD */
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},

  /* ADMIN */
  {path: 'admin/perms', component: PermsComponent},
  {path: 'admin/provider', component: UserProviderComponent},
  {path: 'admin/add-badge', component: AddBadgeComponent},
  {path: 'admin/warn', component: WarnAdminComponent},

  /*MODO*/
  {path: 'modo/ban', component: BanComponent},
  {path: 'modo/warn', component: WarnComponent},
  {path: 'modo/profil', component: ModoProfilComponent},
  {path: 'modo/comment', component: ModoCommentComponent},
  {path: 'modo/copy', component: ModoCopyComponent},
  {path: 'modo/actu', component: ModoActuComponent},

  /*REDAC*/
  {path: 'writter/edit-article', component: EditArticleComponent},
  {path: 'writter/create-article', component: CreateArticleComponent},
  {path: 'writter/show-articles', component: ShowArticlesComponent},

  /*TEST*/
  {path: 'test/view', component: ViewTestComponent},
  {path: 'test/create', component: CreateTestComponent},

  /*PROVIDER*/
  {path: 'provider/profil', component: ProfilComponent},
  {path: 'provider/show-articles', component: ShowArticleComponent},
  {path: 'provider/create-article', component: ProviderCreateArticleComponent},
  {path: 'provider/edit-article', component: ProviderEditArticleComponent},

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
  {path: 'log/actu', component: LogActuComponent},

  /* OTHER*/
  {path: 'user/:id', component: UserOneComponent},
  {path: 'provider/:id', component: ProviderOneComponent},
  {path: 'actu/:id', component: ActuOneComponent},
  {path: 'game/:id', component: GameOneComponent},
  {path: 'warn/:id', component: WarnOneComponent},
  {path: 'comment/:id', component: CommentOneComponent},
  {path: 'comment-reply/:id', component: CommentReplyOneComponent},
  {path: 'badge/:id', component: BadgeOneComponent},

  {path: 'settings', component: SettingComponent},
  {path: 'err', component: ErrComponent},
  {path: '**', component: ErrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
