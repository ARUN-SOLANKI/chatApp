export type stringNullType = string | null;

export type userInfoType = {
  name?: string;
  email: string;
  password: string;
  confirm?: string;
  error: string | Error;
};

export type navigationPropType = {
  navigate: (val: string) => void;
};
