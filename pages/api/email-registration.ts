import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from 'fs';

interface eventInterface {id: string;
    title: string;
    city: string;
    description: string;
    image: string;
    emails_registered: string[];
}

interface eventCategoriesInterface{
    id:string,
    title:string,
    description:string,
    image:string
}

interface dataInterface{
    events_categories:eventCategoriesInterface[],
    allEvents:eventInterface[]
}

function buildPath(){
    return path.join(process.cwd(),'data','data.json');
}

function  extractData(filePath:string){
    const jsonData=fs.readFileSync(filePath,'utf8');
    const data:dataInterface=JSON.parse(jsonData);
    console.log('Read Data')
    console.log(data.events_categories);

    return data;

}

export default function handler(req:NextApiRequest,res:NextApiResponse){
    const {method}=req;
    const filePath=buildPath();
    const data=extractData(filePath);
    //console.log(data.event_categories)
    const {events_categories}=data;
    const {allEvents}=data;
    if(!allEvents){res.status(404).json({status:404,message:" no data found"})};


    if(method==='POST'){
        const {email,eventID}=req.body;
        //console.log(email)
        const newAllEvents:eventInterface[]=allEvents.map((ev)=>{
            if(ev.id===eventID){
                if(ev.emails_registered.includes(email)){
                    res.status(201).json({message:"exists"});
                }else if(!email||! email.includes('@')){
                    res.status(422).json({message:"Invalid"});
                }else{
                    ev.emails_registered.push(email);   
                }
                return ev
            }
            return ev;
        });
        fs.writeFileSync(filePath,JSON.stringify({events_categories,allEvents:newAllEvents}));

        res
            .status(200)
            .json({message:`successful`});
    }
    //console.log(res)
}