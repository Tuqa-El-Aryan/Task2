export interface UsersList {
    id: number,
    fname: string;
    lname: string;
    email: string;
    status:string;
    gender: string;
    dob: Date;
    mname: string;
    activated :string;
    phone: string;
    nationality: string;
    lang: string;
    recitations:string;
    image:string;
  }
  
 export const USERS_DATA: UsersList[] = [
    {id: 1, fname: 'Ahmad', lname: 'Salem', email: 'ahmad@gmail.com', status: 'Active', gender: 'Male' , dob: new Date('1990-01-01'), mname: 'Mohammad' , activated: 'Activated', phone:'00987645384565' , nationality: 'فلسطيني',lang:'Arabic', recitations:'حـفـص عـن عـاصـم', image:'url' },
    {id: 2, fname: 'Dana', lname: 'Hashem', email: 'Dana@gmail.com', status: 'Active', gender: 'Female' , dob: new Date('1992-02-02') , mname: 'Firas' , activated: 'Activated', phone:'00987645384565' , nationality: 'أردني',lang:'Arabic', recitations:'حـفـص عـن عـاصـم', image:'url' },
    {id: 3, fname: 'Laith', lname: 'Kalouti', email: 'LaithK@yahoo.com', status: 'Active', gender: 'Male' , dob: new Date('1988-03-03'), mname: 'Basil' , activated: 'Activated', phone:'00987645384565' , nationality: 'فلسطيني',lang:'Arabic', recitations:'حـفـص عـن عـاصـم', image:'url' },
    {id: 4, fname: 'Farah', lname: 'Zalloum', email: 'Farahzalloum@outlook.com', status: 'Active', gender: 'Female' , dob: new Date('1995-04-04') , mname: 'Saleem' , activated: 'Activated', phone:'00987645384565' , nationality: 'أردني',lang:'Arabic', recitations:'حـفـص عـن عـاصـم', image:'url' },
    
  
  ];