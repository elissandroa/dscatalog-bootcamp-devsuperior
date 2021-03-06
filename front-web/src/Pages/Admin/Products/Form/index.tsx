import React, { useState } from 'react';
import BaseForm from 'Pages/Admin/components/BaseForm';
import './styles.scss';
import { makeRequest } from 'core/utils/request';

type FormState ={
    name: string;
    price: string;
    category:string;
    description:string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    
    const [formData, setFormData] = useState<FormState>({
        name:'',
        price:'',
        category:'1',
        description:''
    });
    
    
    
    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

               
        
        setFormData(data => ({...data,[name]:value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
        const payload ={
            ...formData,
            imgUrl:'https://live.staticflickr.com/65535/50564842523_c169dd688d_c.jpg',
            categories:[{id :formData.category}]
        }
      makeRequest({url:'/products', method: 'POST', data: payload})
      .then(()=>{
            setFormData({name:'', category:'', price:'', description:''});
      });
    }

    return (
        <form onSubmit={handleSubmit}>
        <BaseForm title="CADASTRAR UM PRODUTO">
            
                <div className="row">
                    <div className="col-6">
                        <input 
                        value={formData.name}
                        name="name"
                        type="text" 
                        className="form-control mb-5" 
                        placeholder="Nome do produto"
                        onChange={handleOnChange}
                        /> 

                        <select 
                        className="form-control mb-5" 
                        onChange={handleOnChange} 
                        name="category"
                        value={formData.category}
                        >
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>
                        </select>

                        <input 
                        value={formData.price}
                        name="price"
                        type="text" 
                        className="form-control" 
                        placeholder="Preço"
                        onChange={handleOnChange}
                        /> 
                    </div>
                    <div className="col-6">
                        <textarea 
                        name="description" 
                        value={formData.description}
                        onChange={handleOnChange}
                        className="form-control"
                        cols={30} 
                        rows={10}
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;