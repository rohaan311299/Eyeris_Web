import React from 'react';
import Customer from "./Customer";

const datas=[
    {
        id:1,
        name:"Rohan Kacheria",
        email:"rohankacheriam@gmail.com",
        address:"301 Jaywant Apartment, Opposite Film Center, Mumbai 400034",
        phone:9930042066,
        order:[
            {
                id:1,
                name:"Lense 1",
            },
            {
                id:2,
                name:"Lense 2",
            },
        ]
    },
    {
        id:2,
        name:"Rohan ",
        email:"rohankacheriam@gmail.com",
        address:"301 Jaywant ApartmentMumbai 400034",
        phone:9930042066,
        orders:[
            {
                id:1,
                name:"Lense 1",
            },
            {
                id:2,
                name:"Lense 2",
            },
        ]
    },
]

const Admin = () => {
    return (
        <div>
            <h1 className="pt-3">Mokshit Mehta</h1>
            {
                datas.map((data)=>{
                    return(
                        <Customer 
                            name={data.name}
                            address={data.address}
                            email={data.email}
                            phone={data.phone}
                            order={data.orders}
                        />
                    );
                })
            }
            <Customer />
        </div>
    )
}

export default Admin
