import { Summary } from './Types/UserTypes'
import server from './serverCall.ts'

/*
This method is just intended 
*/

export const deleteAllSummariesFromAtoB = async (a: number, b: number) =>{
    const from = a
    const to = b

    for(let i = from; i <= to; i++){
       await  server.delete<Summary>(`/1/resumen/${i}`).then((res) => {
        console.log(res.data.idres)
       })
    }
}