import { identifierName } from "@angular/compiler"

export interface IProperty{
  Id: number | null;
  Name: string;
  Price: number | null;
  Type: string;
  SellRent: number | null ;
  Image?: string;
}
