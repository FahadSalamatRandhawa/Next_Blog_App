import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/Home.module.css'

interface eventCategoryInterface {
    id: string;
    title: string;
    description: string;
    image: string;
    city?:string;
  }

export const HomePage=({data}:{data:eventCategoryInterface[]})=>{
    
    return (
        <>
            <div className={styles.center}>
            <h1 className=" text-3xl" >
                Events
            </h1>
            </div>
            <div className={styles.grid}>
            {
            data.map(({id,title,description,image})=>{
                return (
                <>
                <div key={id} className=" m-2 rounded-md shadow-lg box-border p-2 border-transparent border-2 hover:shadow-amber-600 bg-slate-600 bg-opacity-30">
                <h2 className=" text-xl py-1"><Link href={`./events/${id}`}>{title}</Link></h2>
                <p className=" py-2">{description}</p>
                <Link href={`./events/${id}`}><Image src={image} alt={id} width={150} height={150}></Image></Link>
                </div>
                </>
                )
            })
            }
            </div>
        </>
    )
}