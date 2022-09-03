
import { resetMessage } from "../slices/photoSlice"

export const useResetComponent = (dispatch) => {

    return () => {
        setTimeout(()=>{
         dispatch(resetMessage())
        },3000)
    }

}