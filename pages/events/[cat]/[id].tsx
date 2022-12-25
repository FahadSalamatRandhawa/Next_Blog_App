import Head from 'next/head';
import styles from '../../../styles/Home.module.css'
import { EventPage } from '../../../src/components/Event-Page';

interface eventInterface {
    id: string;
        title: string;
        city: string;
        description: string;
        image: string;
        emails_registered: string[];
}

const SingEventPage=({myEvent,event_cat}:{myEvent:{0:eventInterface},event_cat:string})=>{

    //console.log("Event info");
    //console.log((myEvent));
    const singleEvent:eventInterface=myEvent[0];

    return (
        <>
        <Head>
            <title>{singleEvent.title}</title>
        </Head>
        <main>   
            <EventPage myEvent={singleEvent}/>
        </main>
    </>
    )
}

export default SingEventPage;

export async function getStaticPaths() {
    const data=await import('../../../data/data.json');
    const {allEvents}=data;

    const allPaths=allEvents.map((path)=>{
        return {
            params:{
                cat:path.city,
                id:path.id,
            }
        }
    })

    return {
        paths:allPaths,
        fallback:false
    }
}

export async function getStaticProps({params}:{params:{cat:string,id:string}}) {
    const event_id=params.id;
    const event_cat=params.cat;
    const {allEvents}=await import('../../../data/data.json');
    const myEvent=allEvents.filter(({id})=>id===event_id);
    return {
        props:{
            myEvent,
            event_cat
        }
    }
}