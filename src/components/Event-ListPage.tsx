import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/Home.module.css'

interface eventCategoryInterface {
    id: string;
    title: string;
    description: string;
    image: string;
    city:string;
  }

export const EventList=({data}:{data:eventCategoryInterface[]})=>{
    
    return (
        <>
            <div className={styles.center}>
            <h1 className=" text-5xl">
                Events in {data[0].city}
            </h1>
            </div>
            <div className={styles.grid}>
            {
            data.map(({id,title,description,image,city})=>{
                return (
                <>
                <div className=" p-1 content-center">
                <div className="  object-fill m-auto rounded-md shadow-md box-border p-2 border-transparent border-2 hover:shadow-amber-600 bg-slate-600 hover:  bg-opacity-30">
                <h2 className=" text-xl py-1"><Link href={`./${city}/${id}`}>{title}</Link></h2>
                <p className=" py-2">{description}</p>
                <Link href={`./${city}/${id}`}><Image className=" py-2 text-center" width={150} height={150}  src={image} alt={id} /></Link>
                </div>
                </div>
                </>
                )
            })
            }
            </div>
        </>
    )
}