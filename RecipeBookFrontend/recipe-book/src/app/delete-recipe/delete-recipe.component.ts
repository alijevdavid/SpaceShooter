import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent {
  idParam : any
  constructor(private http : HttpClient, private route: ActivatedRoute, private router: Router){
    this.route.params.subscribe( param => this.idParam = param );
  }

  deleteRecipe(){
    const url = 'https://localhost:7090/api/recipes/delete/' + this.idParam.id;

    this.http.delete(url).subscribe(
      (response) => {
        console.log('Recipe delete success:', response);
        this.router.navigate(['recipes']);
      },
      (error) => {
        console.error('Recipe delete error:', error);
      }
    );
  }

  cancelDelete(){
    this.router.navigate(['recipes']);
  }
}
