import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostActuInterface } from 'src/app/-interface/post-actu.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectedArticleService {
  private selectedArticleSubject = new BehaviorSubject<PostActuInterface | null>(null);
  selectedArticle$ = this.selectedArticleSubject.asObservable();

  setSelectedArticle(article: PostActuInterface) {
    this.selectedArticleSubject.next(article);
  }

  getSelectedArticle(): PostActuInterface | null {
    return this.selectedArticleSubject.getValue();
  }

  clearSelectedArticle() {
    this.selectedArticleSubject.next(null); 
  }
  
}
// Service crée car un article selectionné dans edit était simplement local
// les composants ne se passait pas l'article 
// pour la redirection on crée se service pour le sauvegarder et le transmettre entre composant