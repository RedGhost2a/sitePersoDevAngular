export interface Users {
  _id:number;
  username:string;
  email:string;
  password:string;
  nickname:string;
  dateOfBirth:Date;
  address:{street:string;
    city:string;
    state:string;
    country:string;
    zip:number;

  }
  webSite:string;
  avatar:string;
  token:string;
}
