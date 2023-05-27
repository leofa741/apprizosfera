import { CanActivateFn, Router } from '@angular/router';





export const  authGuard: CanActivateFn = (route, state) => {




  const token = localStorage.getItem('token') || '';


  if (token.length === 0) {

    return false;
   
  }







  return true;
};
