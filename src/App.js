import logo from './logo.svg';
import './App.css';
import { useState } from "react"
let itemBase = [
  { name: "Сковорода", image: "./image/568LRAD.webp", cost: 1500, amount: 14, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium magni vitae repudiandae?" },
  { name: "Ноутбук", image: "./image/0.webp", cost: 24000, amount: 5, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium magni vitae repudiandae?" },
  { name: "Болгарка", image: "./image/ff701370f63b710d9b48c9b2e9d35ad5.jpg", cost: 13000, amount: 10, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium magni vitae repudiandae?" }
]
function App() {
  let [cart, setCart] = useState([])
  let [catalog, setCatalog] = useState([
    { name: "Сковорода", image: "./image/568LRAD.webp", cost: 1500, amount: 14, id: 351, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium magni vitae repudiandae?" },
    { name: "Ноутбук", image: "./image/0.webp", cost: 24000, amount: 5, id: 297, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium magni vitae repudiandae?" },
    { name: "Болгарка", image: "./image/ff701370f63b710d9b48c9b2e9d35ad5.jpg", cost: 13000, amount: 10, id: 12, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium magni vitae repudiandae?" }
  ])
  let [form, setForm] = useState(false)
  function addToCart(id, amount) {
    for (let i = 0; i < catalog.length; i++) {
      if (id == catalog[i].id) {
        if (amount <= catalog[i].amount) {
          let elemCheck = false
          for (let j = 0; j < cart.length; i++) {
            if (cart[j].id == id) {
              let tempCart = [...cart]
              tempCart[j].amount += amount
              setCart(tempCart)
              let tempCatalog = [...catalog]
              tempCatalog[i].amount -= amount
              setCatalog(tempCatalog)
              elemCheck = true
              if(cart[j].amount <= 0){
                deleteFromCart(id)
              }
            }
          }
          if (!elemCheck) {
            setCart(cart.concat([{ ...catalog[i], amount: amount }]))
          }
        }
      }
    }
  }
  function deleteFromCart(id) {
    setCart(cart.filter(elem => elem.id != id))
  }

  return (
    <div className="container">
      <CatalogWrapper addToCart={addToCart} items={catalog} />,
      <button onClick={() => setForm(!form)} id='cartTriger'>Корзина</button>
      <CartWrapper addToCart={addToCart} deleteFromCart={deleteFromCart} form={form} items={cart} />
    </div>
  )
}

function CatalogWrapper(props) {
  return (
    <div className='allWrapper'>
      <div className='wrapper'>
        {props.items.map(item =>
          <CatalogItem key={item.id} addToCart={props.addToCart} name={item.name} image={item.image} cost={item.cost} amount={item.amount} id={item.id} description={item.description} />)
        }
      </div>
    </div>
  )
}
function CatalogItem(props) {
  return (
    <div className='item'>
      <img src={props.image} alt="" />
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <p className="cost">{props.cost}₽</p>
      <p className="amount">{props.amount}шт.</p>
      <button className='addCart' onClick={() => { props.addToCart(props.id, 1) }}>Добавить в корзину</button>
    </div>
  )
}
function CartWrapper(props) {
  let [Items, setItems] = useState([])
  return (
    <div className={`cartWrapper ${props.form ? 'active' : ""}`}>
      <p>Добавьте товар</p>
      {props.items.map(item =>
        <CartItem key={item.id} id={item.id} addToCart={props.addToCart} deleteFromCart={props.deleteFromCart} name={item.name} image={item.image} cost={item.cost} amount={item.amount} description={item.description} />)
      }
    </div>
  )
}
function CartItem(props) {
  return (
    <div className="cartItem">
      <img src={props.image} alt="" />
      <div className='itemText'>
        <h3>{props.name}</h3>
        <p className="cost">{props.cost}₽</p>
        <p className="amount">{props.amount}шт.</p>
        <p className="takenCost">{props.cost * props.amount}</p>
        <button onClick={() => { props.addToCart(props.id, -1) }}>Уменьшить</button>
        <button onClick={() => { props.addToCart(props.id, 1) }}>Увеличить</button>
        <button onClick={() => {props.deleteFromCart(props.id)}}>Удалить</button>
      </div>
    </div>
  )
}

export default App