import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AddProducts } from './components/AddProducts'
import { Home } from './components/Home'
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ProductscontextProvider } from './global/ProductsContext';
import { auth, db } from "./config/Config";
import { CartContextProvider  } from './global/CartContext';
import { Cart } from './components/Cart';
import { Cashout } from './components/Cashout';
import { NotFound } from './components/NotFound';

export class App extends Component {

  state={
    user: null
  }

  componentDidMount(){
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot=>{
          this.setState({
            user: snapshot.data().Name
          })
        })
      }
      else{
        this.setState({
          user: null
        })
      }
    })
  }
  render() {
    return (
      <ProductscontextProvider>
        <CartContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={()=><Home user={this.state.user} />} />
            <Route path='/addproducts' component={AddProducts} />
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
            <Route path='/cartproducts' component={()=><Cart user={this.state.user} />}></Route>
            <Route path='/cashout' component={() => <Cashout user={this.state.user} />} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        </CartContextProvider>
      </ProductscontextProvider>

    )
  }
}

export default App
