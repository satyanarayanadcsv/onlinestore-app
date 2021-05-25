import React, { createContext } from 'react';
import { db } from '../config/Config';

export const Productscontext = createContext();

export class ProductscontextProvider extends React.Component{

    //defining an initial state with empty array of products
    state={
        products:[]
    }

    componentDidMount(){
        const prevProducts = this.state.products;
        db.collection('Products').onSnapshot(snapshot=>{
            let changes = snapshot.docChanges();
            changes.forEach(change=>{
                if(change.type==='added'){
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImage: change.doc.data().ProductImage,
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })
    }
    render(){
        return(
            <Productscontext.Provider value={{products:[...this.state.products]}}>
                {this.props.children}
            </Productscontext.Provider>
        )
    }
}