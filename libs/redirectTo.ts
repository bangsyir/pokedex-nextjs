export const lastPage = (page: any) => {
  if(page !== undefined) {
    return localStorage.setItem("redirectTo", `?page=${page}`);
  } else {
    return localStorage.setItem("redirectTo", "?page=1")
  }
};

export const redirectTo = () => {
  return localStorage.getItem("redirectTo");
};
