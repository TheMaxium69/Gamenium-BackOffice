import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './global/login/login.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { SidebarComponent } from './global/sidebar/sidebar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from "@angular/material/tabs";
import { PermsComponent } from './administration/perms/perms.component';
import { ErrComponent } from './global/err/err.component';
import { WarnComponent } from './moderation/warn/warn.component';
import { SettingComponent } from './setting/setting.component';
import { ProfilComponent } from './provider/profil/profil.component';
import { EditArticleComponent } from './writter/edit-article/edit-article.component';
import { CreateArticleComponent } from './writter/create-article/create-article.component';
import { ShowArticlesComponent } from './writter/show-articles/show-articles.component';
import {UserSearchComponent} from "./global/user-search/user-search.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {MatMenuModule} from "@angular/material/menu";
import { WarnOneComponent } from './other/warn-one/warn-one.component';
import { ActuPreviewComponent } from './global/actu-preview/actu-preview.component';
import { CommentPreviewComponent } from './global/comment-preview/comment-preview.component';
import { CommentReplyPreviewComponent } from './global/comment-reply-preview/comment-reply-preview.component';
import { ProfilPreviewComponent } from './global/profil-preview/profil-preview.component';
import { HmgPreviewComponent } from './global/hmg-preview/hmg-preview.component';
import { HmpPreviewComponent } from './global/hmp-preview/hmp-preview.component';
import { LogRoleComponent } from './log/log-role/log-role.component';
import { PostSearchComponent } from './global/post-search/post-search.component';
import { LogComponent } from './log/log/log.component';
import { UserOneComponent } from './other/user-one/user-one.component';
import { CreateTestComponent } from './test/create-test/create-test.component';
import { ViewTestComponent } from './test/view-test/view-test.component';
import { LeaderGameComponent } from './stat/leader-game/leader-game.component';
import { LeaderActuComponent } from './stat/leader-actu/leader-actu.component';
import { LeaderProviderComponent } from './stat/leader-provider/leader-provider.component';
import { LeaderUserComponent } from './stat/leader-user/leader-user.component';
import { GlobalStatComponent } from './stat/global-stat/global-stat.component';
import { SanctionStatComponent } from './stat/sanction-stat/sanction-stat.component';
import { ProviderOneComponent } from './other/provider-one/provider-one.component';
import { BanComponent } from './moderation/ban/ban.component';
import { CopyComponent } from './stat/copy/copy.component';
import {ProviderPreviewComponent} from "./global/provider-preview/provider-preview.component";
import { GamePreviewComponent } from './global/game-preview/game-preview.component';
import { GameOneComponent } from './other/game-one/game-one.component';
import { ActuOneComponent } from './other/actu-one/actu-one.component';
import { UserProviderComponent } from './administration/user-provider/user-provider.component';
import { ModoProfilComponent } from './moderation/modo-profil/modo-profil.component';
import { ModoCommentComponent } from './moderation/modo-comment/modo-comment.component';
import { ModoCopyComponent } from './moderation/modo-copy/modo-copy.component';
import { LogActuComponent } from './log/log-actu/log-actu.component';
import { AddBadgeComponent } from './administration/add-badge/add-badge.component';
import { GameSearchComponent } from './global/game-search/game-search.component';
import { ShowArticleComponent } from './provider/show-article/show-article.component';
import { ProviderCreateArticleComponent } from './provider/provider-create-article/provider-create-article.component';
import { ProviderEditArticleComponent } from './provider/provider-edit-article/provider-edit-article.component';
import { WarnAdminComponent } from './administration/warn-admin/warn-admin.component';
import { WarnSearchComponent } from './global/warn-search/warn-search.component';
import { ModoActuComponent } from './moderation/modo-actu/modo-actu.component';
import { CommentOneComponent } from './other/comment-one/comment-one.component';
import { CommentReplyOneComponent } from './other/comment-reply-one/comment-reply-one.component';
import { BadgeOneComponent } from './other/badge-one/badge-one.component';
import { BadgePreviewComponent } from './global/badge-preview/badge-preview.component';
import { CreateBadgeComponent } from './administration/create-badge/create-badge.component';
import { ListBadgeComponent } from './administration/list-badge/list-badge.component';
import { RoleOneComponent } from './other/role-one/role-one.component';
import { RolePreviewComponent } from './global/role-preview/role-preview.component';
import { HomeProviderComponent } from './home/home-provider/home-provider.component';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { HomeModoComponent } from './home/home-modo/home-modo.component';
import { HomeWriteComponent } from './home/home-write/home-write.component';
import { HomeTestComponent } from './home/home-test/home-test.component';
import { ProviderSearchComponent } from './global/provider-search/provider-search.component';
import { UserProviderListComponent } from './administration/user-provider-list/user-provider-list.component';
import {HmpOneComponent} from "./other/hmp-one/hmp-one.component";
import {HmgOneComponent} from "./other/hmg-one/hmg-one.component";
import { CommentSearchComponent } from './global/comment-search/comment-search.component';
import { CommentReplySearchComponent } from './global/comment-reply-search/comment-reply-search.component';
import { ModoCommentReplyComponent } from './moderation/modo-comment-reply/modo-comment-reply.component';
import { ModoCopyPlatformComponent } from './moderation/modo-copy-platform/modo-copy-platform.component';
import { HmgSearchComponent } from './global/hmg-search/hmg-search.component';
import { HmpSearchComponent } from './global/hmp-search/hmp-search.component';
import { LogCommentComponent } from './log/log-comment/log-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    FilterPipe,
    PermsComponent,
    ErrComponent,
    SettingComponent,
    ProfilComponent,
    EditArticleComponent,
    CreateArticleComponent,
    ShowArticlesComponent,
    UserSearchComponent,
    UserSearchComponent,
    WarnComponent,
    WarnOneComponent,
    ActuPreviewComponent,
    CommentPreviewComponent,
    CommentReplyPreviewComponent,
    ProfilPreviewComponent,
    HmgPreviewComponent,
    HmpPreviewComponent,
    LogRoleComponent,
    PostSearchComponent,
    LogComponent,
    UserOneComponent,
    CreateTestComponent,
    ViewTestComponent,
    LeaderGameComponent,
    LeaderActuComponent,
    LeaderProviderComponent,
    LeaderUserComponent,
    GlobalStatComponent,
    SanctionStatComponent,
    ProviderPreviewComponent,
    ProviderOneComponent,
    BanComponent,
    CopyComponent,
    GamePreviewComponent,
    GameOneComponent,
    ActuOneComponent,
    UserProviderComponent,
    ModoProfilComponent,
    ModoCommentComponent,
    ModoCopyComponent,
    LogActuComponent,
    AddBadgeComponent,
    GameSearchComponent,
    ShowArticleComponent,
    ProviderCreateArticleComponent,
    ProviderEditArticleComponent,
    WarnAdminComponent,
    WarnSearchComponent,
    ModoActuComponent,
    CommentOneComponent,
    CommentReplyOneComponent,
    BadgeOneComponent,
    BadgePreviewComponent,
    CreateBadgeComponent,
    ListBadgeComponent,
    RoleOneComponent,
    RolePreviewComponent,
    HomeProviderComponent,
    HomeAdminComponent,
    HomeModoComponent,
    HomeWriteComponent,
    HomeTestComponent,
    ProviderSearchComponent,
    UserProviderListComponent,
    HmpOneComponent,
    HmgOneComponent,
    CommentSearchComponent,
    CommentReplySearchComponent,
    ModoCommentReplyComponent,
    ModoCopyPlatformComponent,
    HmgSearchComponent,
    HmpSearchComponent,
    LogCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatMenuModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
