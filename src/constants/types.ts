import { GENDER } from "./constants";

export interface IUser {
  firstName: string;
  lastName: string;
  maidenName: string;
  birthDate: string;
  age: number;
  gender: (typeof GENDER)[number];
  email: string;
  image: string;
  phone: string;
  bloodGroup: string;
  height: number;
  weight: number;
  domain: string;
  ip: string;
  macAddress: string;
  address: IAddress;
  ein: string;
  ssn: string;
  university: string;
  hair: {
    color: string;
  };
  bank: {
    cardType: string;
  };
  company: {
    name: string;
  };
}

interface IAddress {
  address: string;
  city: string;
  postalCode: string;
}
