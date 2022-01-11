import { identifierName } from "@angular/compiler"

export interface IPropertyBase {
  Id: number | null;
  Name: string;
  Price: number | null;
  SellRent: number | null;
  Image?: string;
  FType: string;
  PType: string;
  BHK: number | null;
  City: string;
  BuiltArea: number | null;
  RTM: number | null;
}
