export type signUpResInterface = {
  additionalUserInfo: {
    isNewUser: boolean;
  };
  user: {
    _user: {
      uid: string;
      email: string;
    };
    uid: string;
  };
};
