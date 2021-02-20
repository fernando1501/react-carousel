import React, { useEffect, useRef, useState } from 'react'
import leftIcon from './assets/icons/left.png';
import rightIcon from './assets/icons/right.png';
let Carousel = ({
    itemsPerView = 4,
    items = [],
    gap = 16,
    Card,
    empty = '',
    description = '',
    keySelector = (e) => e.id
}) => {
    let left = useRef();
    let right = useRef();
    let [move, setMove] = useState(0)
    useEffect(() => {
        setMove(0)
    }, [itemsPerView, items])
    useEffect(() => {
        if (left.current && right.current) {
            if (move === 0) {
                left.current.style.cursor = 'not-allowed'
                left.current.style.opacity = '0.5'
            }
            else {
                left.current.style.cursor = 'pointer'
                left.current.style.opacity = '1'
            }
            if ((move + 100 + 100) <= Math.ceil(items.length / itemsPerView) * 100) {
                right.current.style.cursor = 'pointer'
                right.current.style.opacity = '1'
            }
            else {
                right.current.style.cursor = 'not-allowed'
                right.current.style.opacity = '0.5'
            }
        }
    }, [items, itemsPerView, move])
    const handleRight = () => {
        let max = items.length / itemsPerView * 100
        if (max > 100) {
            setMove((prevMove) => {
                let newMove = prevMove + 100
                if ((newMove + 100) <= max)
                    return newMove
                else {
                    return max - 100
                }
            })
        }
    }
    const handleLeft = () => {
        setMove((prevMove) => {
            let newMove = prevMove - 100
            if (newMove > 0) {
                return newMove
            }
            else {
                return 0
            }
        })
    }
    useEffect(() => {
        if (left.current && right.current) {
            left.current.addEventListener('click', handleLeft)
            right.current.addEventListener('click', handleRight)
            return () => {
                if (left && left.current && right && right.current) {
                    left.current.removeEventListener('click', handleLeft)
                    right.current.removeEventListener('click', handleRight)
                }
            }
        }
    }, [itemsPerView, items])
    return (
        <React.Fragment>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span style={{
                    margin: '5px 0 16px 0',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    display: 'flex',
                }} >{description}</span>
                <div style={{ display: 'flex' }} className='carousel-move-buttons'>
                    <img style={{
                        width: '35px',
                        height: '35px',
                        cursor: 'pointer',
                        marginLeft: '8px',
                    }} ref={left} src={leftIcon} />
                    <img style={{
                        width: '35px',
                        height: '35px',
                        cursor: 'pointer',
                        marginLeft: '8px',
                    }} ref={right} src={rightIcon} />
                </div>
            </div>
            <div style={{
                width: '100%',
                overflow: 'hidden'
            }}>
                {
                    items.length <= 0 && <span>{empty}</span>
                }
                <div style={{
                    marginLeft: `${-1 * (move)}%`,
                    width: `${(items.length / itemsPerView) * 100}%`,
                    gridTemplateColumns: `repeat(${items.length},1fr)`,
                    gap,
                    display: 'grid',
                    overflow: 'hidden',
                    transition: 'margin 0.5s ease-out'
                }}>
                    {
                        items.map((item) => {
                            return <Card key={keySelector(item)} data={item} />
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
export { Carousel };