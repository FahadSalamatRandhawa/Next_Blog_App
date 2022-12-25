export const EmailValidate=({invalid}:{invalid:number})=>{
    
    return (
        <>
            {(invalid===0)?<h2 className=" mt-2 text-center text-red-500 ">invalid email</h2>:
            (invalid===2)?<h2 className=" mt-2 text-center text-yellow-500 ">Already registered!!!</h2>:
            (invalid===1)?<h2 className=" mt-2 text-center text-green-500 "> Registered</h2>:null}
        </>
    )
}
