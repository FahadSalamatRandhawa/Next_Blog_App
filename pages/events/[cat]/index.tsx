import Head from "next/head";
import { EventList } from "../../../src/components/Event-ListPage";

interface eventInterface {id: string;
    title: string;
    city: string;
    description: string;
    image: string;
    emails_registered: string[];
}

const EventCatPage=({data,event_city}:{data:eventInterface[],event_city:string})=>{
    return (
        <>
        <Head>
            <title>{event_city}</title>
        </Head>
        <main> 
            <EventList data={data}/>
        </main>
        </>
    )
}

export default EventCatPage;

export async function getStaticPaths() {
    const data=await import('../../../data/data.json');
    const categories=data.events_categories;
    const allPaths=categories.map(({id}:{id:string})=>{
        return {
            params:{
                cat:id.toString(),
            }
        }
    })
    return {
        paths:allPaths,
        fallback:false,
    };
}

export async function getStaticProps({params}:{params:{cat:string}}) {
    const event_city=params.cat;
    const {allEvents}=await import('../../../data/data.json');
    const data=allEvents.filter((event)=>event.city===event_city);
    //console.log(allEvents)

    return {
        props:{
            data,
            event_city
        }
    }
}