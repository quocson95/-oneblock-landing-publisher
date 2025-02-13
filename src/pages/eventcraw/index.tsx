import Tabs from "@/components/Tabs";
import { HostBackend } from "@/libs/contanst";
import FectIntercerp from "@/libs/intercerpFecth";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";

type EconomicEvent = {
    DateTime : string,
	TimeUnix: number,  
	Currency:  string,
	Event:    string, 
	Actual:   string, 
	Forecast: string, 
	Previous: string
}

type EventLogCraw = {
    ID : number,
    CreatedAt: string,
    Data: EconomicEvent[]
}

const EventCraw = ()=>{
    const formatDateUnix = (timestampUnix: number) =>  {
        const date = new Date(timestampUnix);
        return <div>{date.getFullYear()}/{date.getMonth()}/{date.getDate()} {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>;
    }
    
    const [events, setEvents] = useState([])
    const didInit = useRef(false);
    const getEventsIcs = async()=>{
        const cookie = await getCookie("session")?.toString();
        const res = await FectIntercerp(`${HostBackend}/be/admin/ics/log`, {headers: {          Authorization: `${cookie}`}});
        const events = await res.json();
        setEvents(events);
    }
    useEffect(()=>{
        if (didInit.current) {
            return;
        }      
        didInit.current = true;  
        getEventsIcs();
    },[])
    return (
        <>
        {/* <Button><Link href="/">Dashboard</Link></Button> */}
        <Tabs></Tabs>
        <h1>Log Craw from <a style={{color:"green"}} href="vn.investing.com/economic-calendar">investing.com</a></h1>
        <table id="customers">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>CreateAt</th>
                    <th>Data</th>                    
                </tr>
            </thead>
            <tbody>
            {events.map((event: EventLogCraw) => (
                <tr key={event.ID}>
                    <td>{event.ID}</td>
                    <td>{event.CreatedAt}</td>
                    <td>{JSON.stringify(event.Data)}</td>                   
                </tr>
            ))}
            </tbody>
        </table>
        </>
    )
}


export default EventCraw;