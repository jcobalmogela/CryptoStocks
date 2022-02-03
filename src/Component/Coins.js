/* eslint-disable */ 

import axios from 'axios';
import React,{useState,useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { PER_PAGE } from '../Component/Constant.js';
import{ wait} from "../util/await"


//icon

//component
import { Spinner,Card,Row,Col } from 'react-bootstrap';


const Coins = () => {
    const [Coins,setCoins] = useState([]);
    const [Loading,setLoading] = useState(false);
    const [HasMore,setHasMore] = useState(true);
    const [TotalCount,setTotalCount] = useState(200);
    const [Offset,setOffSet] = useState(-PER_PAGE);


    const isEmptyCoins = !Coins || Coins.length === 0;

    const getImageUrl = (symbol) => `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`

    const fetchCoins = async () => {

        setLoading(true);

        const newOffset = Offset + PER_PAGE;
        
        const response = await axios.get("https://api.coincap.io/v2/assets",{
            params: {limit:PER_PAGE, offset:newOffset,}
        }).catch((err) => {
            console.log("error",err);
        })

        await wait(2000)

        if(response && response.data){
            const newCoins = [...Coins, ...response.data.data]

            if(newCoins.length >= TotalCount ){
                setHasMore(false);
            }

            setCoins(newCoins);
            
            setOffSet(newOffset)
        }

        setLoading(false);
    }
    useEffect( () => {
        fetchCoins();
    },[])



  return <div>
         <h5 className='text-center p-2 m-0'>Crypto Rankings</h5>
    <InfiniteScroll pageStart={0} loader={<div className="loader text-center p-1" key={0}><Spinner  animation="border" variant="info" /></div>} hasMore={HasMore} loadMore={fetchCoins} initialLoad={true} threshold={350} style={{width:"100%"}}>
        {!isEmptyCoins && Coins.map( (Coin,idx) => {
           return(
                <div className='p-1 py-1'>
                 
                <Card className='Card'>
                           <Row className='p-0 m-0'>
                                <Col className="p-0 " xs={2} sm={1}>
                                    <section  className='p-1 w-lg-30 card-rank d-flex justify-content-center align-items-center'>
                                        <h6 className='p-0 m-0'>Rank {Coin.rank}</h6>
                                    </section>
                                </Col>
                                <Col className="p-1 px-lg-2 py-lg-2 d-md-flex justify-content-between" xs={12} sm={11}>
                                    <img className='crypimg h-lg-100' width={64} height={50} src={getImageUrl(Coin.symbol)} alt="" />
                                    <section className='p-1 h-auto h-lg-100 w-100 d-flex justify-content-center align-items-lg-center flex-column'>
                                        <p className='p-0 m-0 blur' style={{opacity:"rgba(0,0,0,0.2)"}}>Name</p>
                                          <h6 className='p-0 m-0'>{Coin.name}</h6>
                                    </section>
                                    <section className='p-1 h-auto h-lg-100 w-100 d-flex justify-content-center align-items-lg-center flex-column'>
                                            <p className='p-0 m-0 blur' style={{opacity:"rgba(0,0,0,0.2)"}}>Price</p>
                                          <h6 className='p-0 m-0'>${Number(Coin.priceUsd).toFixed(2)}</h6>
                                    </section>
                                    <section className='p-1 w-50 h-lg-100 w-100  d-lg-flex  align-items-lg-center flex-column'>
                                          <p className='p-0 m-0 blur'>Market Cap</p>
                                          <h6 className='p-0 m-0'>${Number(Coin.marketCapUsd).toFixed(2)}B</h6>
                                    </section>
                                </Col>
                           </Row>
                           
                       </Card>  
                </div>   
           ) 
        })}
    </InfiniteScroll>
    
  </div>;
};

export default Coins;
