# React Carousel

Instalation

'npm i --save react-carousel'

```
import { Carousel } from "react-carousel";

let data = [
    { id:1 },
    { id:2 },
    { id:3 },
    { id:4 },
    { id:5 },
    { id:6 },
    { id:7 },
]

let Card = ({ data }) => {
    return(
        <div>{data.id}</div>
    )
}

let App = () => {
    return (
        <Carousel 
            items={[...data]}
            Card={Card} 
            itemsPerView={4}
            gap={16} // px
            description={'Name of my carousel'}
            keySelector={(e) => e.id}
            empty={'There are no items in this carousel'}
        />
    )
}
```