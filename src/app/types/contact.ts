import { Activity } from './activities';
import { Task } from './task';
import { Opportunities } from './opportunities';
import { Notes } from './notes';

export const contactStatusList: string[] = [
  'Salaried',
  'Commission',
  'Terminated',
];

export type ContactStatus = (typeof contactStatusList)[number];

type State = {
    stateShort: string;
};

export interface ContactBase {
  address: string;
  firstName: string;
  lastName: string;
  position: string;
  manager: string;
  company: string;
  phoneNumber: string;
  email: string;
  image: string;
  userName: string;
  country: string;
  birthDate: Date;
  hiredDate: Date;
  department: string;
  salaried: boolean;
  status: string; // Ensure this matches your ContactStatus type
  passwordHash: string;
  city:string;
  state: string,
  imagePath?:any,
}

export interface Contact extends ContactBase {
  id: number,
  name: string,
  
  company: string,  
  notes:Notes[],
  activities: Activity[],
  zipCode: number
  opportunities: Opportunities,
  tasks: Task[],
  Role?:string
  token?:string
}


export const newContact: ContactBase = {
  firstName: '',
  lastName: '',
  position: '',
  manager: '',
  company: '',
  phoneNumber: '',
  email: '',
  image: '',
  address: '',  
  userName:'',
  country:'',
  birthDate: new Date(),
  hiredDate: new Date(),
  department:'',
  salaried:false,
  status:'',
  passwordHash:'',
  city:'',
  state: '',
}
