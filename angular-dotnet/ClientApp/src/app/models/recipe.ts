export interface Recipe {
  id: string;
  name: string;
  url: string;

}

/* Note: below is current manaully setup to inherit from recipe (manually setting each from it's parent)...
 would be btter to have a contsrctuor like below : https://blog.logrocket.com/writing-constructor-typescript/ */
export interface RecipeFto extends Recipe {
  isChecked: boolean;
}
