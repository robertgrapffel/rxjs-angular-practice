export interface User {
  id: number;
  nume: string;
}

export interface Age {
  id: number;
  age: string;
}

export interface AgeType {
  id: number;
  type: string;
}

export interface UserAge extends User {
  age: string;
}

export interface UserAgeWithType extends UserAge {
  type: string;
}
