import React,{useState} from 'react'
import {storage, db} from '../config/Config'

export const AddProducts = () => {

    const[ProductName, setProductName] = useState('');
    const[ProductPrice, setProductPrice] = useState(0);
    const[ProductImage, setProductImage] = useState(null);
    const[error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'] //image types

    //product image handler
    const productImghandler = (e) =>{
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)){
            setProductImage(selectedFile);
            setError('');
        }
        else{
            setProductImage(null);
            setError('please select a valid image type png or jpeg')
        }
    }

    //add product form submit event
    const addProduct = (e) => {
        e.preventDefault();
        // console.log(ProductName, ProductPrice, ProductImage);
        //storing the image
        const uploadTask = storage.ref(`product-images/${ProductImage.name}`).put(ProductImage);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            console.log(progress);
        }, err=>{
            setError(err.message)
        },()=>{
            //getting product url and if success then storing in db
            storage.ref('product-images').child(ProductImage.name).getDownloadURL().then(url=>{
                db.collection('Products').add({
                    ProductName: ProductName,
                    ProductPrice: Number(ProductPrice),
                    ProductImage: url
                }).then(()=>{
                    setProductName('');
                    setProductPrice(0);
                    setProductImage('');
                    setError('');
                    document.getElementById('file').value = '';
                }).catch(err => setError(err.message));
            })
        })
    }
    return (
        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete='off' className='form-group' onSubmit={addProduct}>
                <label htmlFor='product-name'>Product Name</label>
                <br />
                <input type='text' className='form-control' required 
                onChange={ (e) => setProductName(e.target.value)} value={ProductName}/>
                <br />
                <label htmlFor='product-price'>Product Price</label>
                <br />
                <input type='number' className='form-control' required 
                onChange={ (e) => setProductPrice(e.target.value)} value={ProductPrice}/>
                <br />
                <label htmlFor='product-img'>Product Image</label>
                <br />
                <input type='file' className='form-control' onChange={productImghandler} id='file'/>
                <br />
                <button className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span>{error}</span>}
        </div>
    )
}
