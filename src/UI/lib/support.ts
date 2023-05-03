
export const limitStrLength = function (text:string, max_length:number):string {
    if(text.length > max_length - 3){
        return text.substring(0, max_length).trimEnd() + "..."
    } else return text
}
