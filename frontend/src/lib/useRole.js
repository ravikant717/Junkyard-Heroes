import {useAuthStore} from '../store/useAuthStore'; 

export const useRole = () => {
    const {authUser} = useAuthStore(); 
    return authUser.role; 
}

