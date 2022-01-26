export interface UnknownObj {
  [key: string]: string | number | any;
}

export interface StoreProp {
  commit?: Function;
  field?: string | number;
  value?: string | number;
  val?: string | number | object | UnknownObj;
}
