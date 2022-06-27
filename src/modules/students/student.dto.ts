export enum ECLASS {
  CL_A = 'A',
  CL_B = 'B',
  CL_C = 'C',
  CL_D = 'D',
  CL_E = 'E',
  CL_F = 'F',
  CL_G = 'G',
}

export interface IRegStudent {
  name: string;
  sex: 'Male' | 'Female';
  class: ECLASS;
}

export enum EWithRecord {
  RETRIEVE = 'RETRIEVE',
  ZERO = 'ZERO',
}
