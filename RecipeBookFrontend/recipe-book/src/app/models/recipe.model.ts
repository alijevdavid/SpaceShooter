export class Recipe {
    public id : number;
    public name : string;
    public nameEn : string;
    public longDescription: string;
    public longDescriptionEn: string;
    public shortDescription: string;
    public shortDescriptionEn: string;
    public imageLink: string;
    public recipeType: string;
    public ingredients: any[];

    constructor(id : number,name: string, longDesc: string, shortDesc : string, imageLink: string,
         ingredients:any,nameEn : string, longDescriptionEn : string, shortDescriptionEn: string, recipeType : string){
        this.id = id;
        this.name = name;
        this.shortDescription = shortDesc;
        this.longDescription = longDesc;
        this.imageLink = imageLink;
        this.ingredients = ingredients;
        this.nameEn = nameEn;
        this.longDescriptionEn = longDescriptionEn;
        this.shortDescriptionEn = shortDescriptionEn;
        this.recipeType = recipeType;
    }
}