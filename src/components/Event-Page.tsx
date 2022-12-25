import Image from "next/image"
import styles from '../../styles/Home.module.css'
import React,{ useRef } from "react";
import { useRouter } from "next/router";
import { useState} from "react";
import {EmailValidate} from "./validate-Email";

interface eventInterface {
    id: string;
        title: string;
        city: string;
        description: string;
        image: string;
        emails_registered: string[];
}

export const EventPage=({myEvent}:{myEvent:eventInterface})=>{
    const singleEvent:eventInterface=myEvent;
    const inputEmail=useRef<HTMLInputElement>(null);
    const [getEmailStatus,setEmailStatus]=useState(500);
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    //console.log(inputEmail);
    const router=useRouter();
    //console.log(router.query)
    const onSubmit=async (e:React.SyntheticEvent)=>{
        e.preventDefault();
        const emailValue=inputEmail.current?.value;
        const eventID=router.query.id;
        const eventCat=router?.query.cat;

// Making API Post request

        if(emailValue){
            try{
                const response=await fetch('/api/email-registration',{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json'
                    },
                    body :JSON.stringify({email:emailValue,eventID,eventCat})
                });
                if(!response.ok){
                    throw new Error(`Error : ${response.status}`);
                }
                const data=await response.json();
        //Giving response on submission
        //        console.log(data)
                const {message}=data;
                if(message==='invalid'){
                    setEmailStatus(0)
                }else if(message==='exists'){
                    setEmailStatus(2)
                }else if(message==='successful'){
                    setEmailStatus(1);
                }
                if(!emailValue?.match(validRegex)){
                    console.log('Invalid email')
                }
                if(inputEmail.current?.value != undefined){
                    inputEmail.current.value='';
                }
            }catch(e){
                console.log(e," : Error")
                setEmailStatus(0)
            }
        }else{
            console.log('No input')
            setEmailStatus(0);
        }
    };
    
    return (
        <>
            <div className={styles.center}>
                <div>
                <h1 className=" text-2xl">{singleEvent.title}</h1>
                <h2 className=" text-xl">{singleEvent.city}</h2>
                
                <Image className=" py-2" src={singleEvent.image} alt={singleEvent.title} height={300} width={500} />
                <p className=" py-3">{singleEvent.description}</p>
                <form onSubmit={onSubmit}>
                    <label className=" text-lg"><strong>Register for this event</strong></label><br />
                    <input type='email' ref={inputEmail} placeholder="email" id="email" className="p-1" /><button type='submit' className=" mx-2 rounded-sm p-1 shadow-sm shadow-orange-600 hover hover:shadow-sky-700">Register</button>
                    <EmailValidate invalid={getEmailStatus} />
                </form>
                
                <ul className=" text-lg pt-2">Registered emails {singleEvent.emails_registered.length}</ul>
                    {
                        singleEvent.emails_registered.length==0?
                        (<li className=" text-opacity-30">no emails</li>):(
                            singleEvent.emails_registered.map((email)=>{
                                return (
                                    <>
                                        <li key={email}>{email}</li>
                                    </>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </>
    )
}