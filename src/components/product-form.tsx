import { FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';

import { IconButton, TextField, FormControl, FormLabel } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

import { UserContext } from '../contexts/user';
import { TypeUserContext } from '../@types/types';
import { useAddProductMutation, useUpdateProductMutation } from '../redux/api-queries/product-queries';
import { Product } from '../@types/product';

interface Props {
    product: Product
}

const ProductForm: FC<Props> = ({ product }) => {
    // NEED IMAGE LINK !

    const { user } = useContext(UserContext) as TypeUserContext; 
    const [ admin, setAdmin ] = useState<boolean>(false);
     
    const [ title, setTitle ] = useState<string | undefined>(product.title);
    const [ price, setPrice ] = useState<string | undefined>(product.price.toString());
    const [ description, setDescription ] = useState<string | undefined>(product.description);
    const [ image, setImage ] = useState<string | undefined>(product.images[0]);

    const [ item, setItem ] = useState<Partial<Product>>();

    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ priceError, setPriceError ] = useState<boolean>(false);
    const [ descriptionError, setDescriptionError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    const [ addProduct ] = useAddProductMutation();
    const [ updateProduct ] = useUpdateProductMutation();
    const [ err, setErr ] = useState<boolean>(true);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const item = {
            title,
            price: Number(price),
            description,
            image
        }
        setItem(item);
    };


    useEffect(()=> {
        if (item) {
            validate();
        }
        if (user) {
            setAdmin(user.role === 'admin')
        }
    }, [item, user]);

    const validate = () => {
        const priceRegex = new RegExp('^\d*\.?\d+');
        const descriptionRegex = new RegExp('^[a-zA-Z]');
        const imageRegex = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*');

        if (product) {
            if (!product.title) {
                setTitleError(true);
            }
            if (product.price) {
                if (!product.price.toString().match(priceRegex)) {
                    setPriceError(true);
                }
            }
            if (product.description) {
                if (!product.description.match(descriptionRegex)) {
                    setDescriptionError(true);
                }
            }
            /*if (product.image[0]) {
                if (!product.image.match(imageRegex)) {
                    setImageError(true);
                }
            } else {
                setImageError(true);
            }*/
            setErr(titleError && priceError && descriptionError && imageError);
        }
    }
     /* 
             FIX IMAGES AND CATEGORY DROPDOWN

                    images: string[],
                    categoryId?: number, */

    const onEdit = () => {
        // set the form to editable
    }


    return (
        <div className='form-container' style={{margin: "0 0 0 2rem"}}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        disabled={!admin}
                        fullWidth
                        variant="standard"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        helperText="CHECK ERRORS Title is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: titleError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiFormLabel-asterisk': {
                                visibility: user?.role === 'admin' ? 'visible' : 'hidden',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { // DOESNT WORK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                borderBottom: user?.role === 'admin' ? '1px orange solid' : 'none',
                            }
                        }}
                        onFocus={()=>setTitleError(false)} 
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        disabled={!admin}
                        fullWidth
                        variant="standard"
                        label="Price"
                        name="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        helperText="Price is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: priceError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiFormLabel-asterisk': {
                                visibility: user?.role === 'admin' ? 'visible' : 'hidden',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': {
                                borderBottom: user?.role === 'admin' ? '1px orange solid' : 'none',
                            }
                        }}
                        onFocus={()=>setPriceError(false)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel 
                        style={{  
                            color: "darkgrey",
                            fontSize: "13px",
                            marginBottom: "0.5rem" 
                        }}
                    >
                        Description
                    </FormLabel>
                    <TextareaAutosize
                        disabled={!admin}
                        name="description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                        //helperText="Description is required"
                        onFocus={()=>setDescriptionError(false)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    {/* <TextField
                        disabled={!admin}
                        fullWidth
                        variant="standard"
                        label="Category"
                        name="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{
                            '& .MuiFormHelperText-root': {
                                visibility: imageError ? 'visible' : 'hidden',
                                transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiFormLabel-asterisk': {
                                visibility: user?.role === 'admin' ? 'visible' : 'hidden',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': {
                                borderBottom: user?.role === 'admin' ? '1px orange solid' : 'none',
                            }
                            }}
                        helperText="Avatar error"
                        onFocus={()=> setImageError(false)}
                    /> */}
                </FormControl> 
                { admin && <>
                    <FormControl fullWidth>
                        <TextField
                            disabled={!admin}
                            fullWidth
                            variant="standard"
                            label="Image"
                            name="image"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    visibility: imageError ? 'visible' : 'hidden',
                                    transition: 'visibility 0.2s ease-in',
                                },
                                '& .MuiFormLabel-asterisk': {
                                    visibility: user?.role === 'admin' ? 'visible' : 'hidden',
                                },
                                '& .MuiInputBase-root.MuiInput-root:before': {
                                    borderBottom: user?.role === 'admin' ? '1px orange solid' : 'none',
                                }
                            }}
                            helperText="Avatar error"
                            onFocus={()=> setImageError(false)}
                        />
                        </FormControl> 
                    </> }
                    {admin && 
                        <div className='btn-group'>
                            <IconButton type ="submit" onClick={()=> handleSubmit}>
                                <EditNoteOutlinedIcon/>
                            </IconButton> 
                            <IconButton onClick={()=> onEdit()}>
                                <DoorBackOutlinedIcon/>
                            </IconButton>
                        </div>
                    }
            </form>
        </div>
    
    );
}

export default ProductForm;