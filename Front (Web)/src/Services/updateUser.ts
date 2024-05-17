import { useContext } from 'react'
import server from './serverCall'
import { LoggedUserContext, Summary } from '../ActiveUserContext'

export type serverUser = {
    id: string;
    userName: string;
    passwd: string;
    inventory: Summary[]; // Data to create the List of previous summaries
    }


export const ServerUserUpdate = async () => {
   const activeUser = useContext(LoggedUserContext)
    await server.put(`/${activeUser.userState.id}/`, activeUser.userState).then((res)=>{
        activeUser.userSteState(res.data)
    }).catch((err) => console.log(err.error))
    console.log("Updated")
}