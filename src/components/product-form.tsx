import { ChangeEvent, FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';

import { IconButton, TextField, FormControl, FormLabel, MenuItem, InputLabel } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import { TextareaAutosize } from '@mui/base';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { UserContext } from '../contexts/user';
import { TypeUserContext } from '../@types/types';
import { useAddProductMutation, useUpdateProductMutation } from '../redux/api-queries/product-queries';
import { Category, Product } from '../@types/product';
import { useGetCategoriesQuery } from '../redux/api-queries/category-queries';

interface Props {
    product: Product
}

const ProductForm: FC<Props> = ({ product }) => {
    // NEED IMAGE LINK !
    const [ formData, setFormData ] = useState<Product>(product);
    const { user } = useContext(UserContext) as TypeUserContext; 
    const [ admin, setAdmin ] = useState<boolean>(false);

    const [ id, setId ] = useState<number>(product.id);
    const [ title, setTitle ] = useState<string | undefined>(formData.title);
    const [ price, setPrice ] = useState<string | undefined>(formData.price.toString());
    const [ description, setDescription ] = useState<string | undefined>(formData.description);
    const [ image, setImage ] = useState<string | undefined>(formData.images[0]);
    const [ category, setCategory ] = useState<string | undefined>(formData.category.name);
    const [ categoryId, setCategoryId ] = useState<number | undefined>(formData.categoryId);

    const [ item, setItem ] = useState<Product | Partial<Product> | undefined>();
    const { data } = useGetCategoriesQuery(undefined);
    const [ categories, setCategories ] = useState<Category[] | undefined>();

    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ priceError, setPriceError ] = useState<boolean>(false);
    const [ descriptionError, setDescriptionError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    const [ addProduct, { error } ] = useAddProductMutation();
    const [ updateProduct ] = useUpdateProductMutation();
    const [ err, setErr ] = useState<boolean>(true);
    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(true);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const item: Partial<Product> = {
            title,
            price: Number(price),
            description,
            categoryId
            //image
        }
        setItem(item);
    };
    useEffect(()=> {
        user && setAdmin(user.role === 'admin');
        data && setCategories(data);
    }, [user, data]);

    const compareObjects = ():boolean => {
        // Get the keys (property names) from both objects
            const keys1 = Object.keys(formData);
            const keys2 = item && Object.keys(item);
            console.log("comparing formData : ", keys1, " to item: ", keys2);
        // Check if the number of keys differs
        if (keys2 && keys1.length !== keys2.length) {
            return true; // At least one property has changed
        }

        // Compare the values for each property

        // If no differences were found, objects have not changed
        return false;
    }

    useEffect(()=> {
        if (item) {
            validate();
        }
        const submitProduct = async() => {
            const itemIsNew: boolean = compareObjects();
            if (!err && itemIsNew) {
                console.log("new product - ALL FIELDS changed, we call addProduct: ", itemIsNew)
                /*try {
                    const payload = item && await addProduct(item).unwrap();
                    payload && setFormData(payload);  
                } catch (error: any) {
                    setErr(true);
                }*/
            } else if (!err && !itemIsNew) {
                console.log("item is NOT new-> - not ALL FIELDS changed, we call updateProduct: ", itemIsNew)
                /*try {
                    const payload = item && await updateProduct({id, ...item}).unwrap();
                    payload && setFormData(payload);  
                } catch (error: any) {
                    setErr(true);
                }*/
            }
        }
        submitProduct();
    }, [item]);

    const validate = () => {
        const priceRegex = new RegExp('^\d*\.?\d+');
        const descriptionRegex = new RegExp('^[a-zA-Z]');
        const imageRegex = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*');

        if (item) {
            if (!item.title) {
                setTitleError(true);
            }
            if (item.price) {
                if (!product.price.toString().match(priceRegex)) {
                    setPriceError(true);
                }
            }
            if (item.description) {
                if (!item.description.match(descriptionRegex)) {
                    setDescriptionError(true);
                }
            }
            /*if (item.image[0]) {
                if (!item.image.match(imageRegex)) {
                    setImageError(true);
                }
            } else {
                setImageError(true);
            }*/
            setErr(titleError && priceError && descriptionError);
        }
    }

    const onEdit = () => {
        setDisabled(false);
    }
    const onCancel = () => {
        setTitle(formData.title);
        setPrice(formData.price.toString());
        setDescription(formData.description);
        setImage(formData.images[0]);
        setCategory(formData.category.name);

        setDisabled(true);
    }
    const handleCategoryChange = (event: SelectChangeEvent) => {
        console.log('CATEGORY BEFORE: ', category);
        setCategory(event.target.value as string);
        console.log('CATEGORY after set: ', event.target.value);
        // also set new categoryId of the new category by name
    }


    return (
        <div className='form-container' style={{margin: "0 0 0 2rem"}}>
            <form onSubmit={onSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        disabled={disabled}
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
                                visibility: !disabled ? 'visible' : 'hidden',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=>setTitleError(false)} 
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        disabled={disabled}
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
                              visibility: titleError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiFormLabel-asterisk': {
                                visibility: !disabled ? 'visible' : 'hidden',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=>setPriceError(false)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel 
                        style={{  
                            color: disabled ? "darkgrey" : "#3d3d3d",
                            fontSize: "13px",
                            marginBottom: "0.5rem" 
                        }}
                    >
                        Description
                    </FormLabel>
                    <TextareaAutosize
                        disabled={disabled}
                        name="description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                        //helperText="Description is required"
                        onFocus={()=>setDescriptionError(false)}
                    />
                </FormControl>
                <FormControl fullWidth>
                </FormControl> 
                { admin ? 
                    <>
                        <FormControl fullWidth>
                            <TextField
                                disabled={disabled}
                                fullWidth
                                variant="standard"
                                label="Image"
                                name="image"
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                      visibility: titleError ? 'visible' : 'hidden',
                                      transition: 'visibility 0.2s ease-in',
                                    },
                                    '& .MuiFormLabel-asterisk': {
                                        visibility: !disabled ? 'visible' : 'hidden',
                                    },
                                    '& .MuiInputBase-root.MuiInput-root:before': { 
                                        borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                                    }
                                }}
                                helperText="Avatar error"
                                onFocus={()=> setImageError(false)}
                            />
                        </FormControl> 
                        <FormControl variant="standard" fullWidth>
                            <FormLabel 
                                style={{  
                                    color: disabled ? "darkgrey" : "#3d3d3d",
                                    fontSize: "13px"
                                }}
                            >
                                Category
                            </FormLabel>
                            <Select
                                disabled={disabled}
                                value={category}
                                onChange={handleCategoryChange}
                                label="Category"
                            >
                                {categories && categories.map((ctgry: Category)=> {
                                    return <MenuItem key={ctgry.id} value={ctgry.name}>{ctgry.name}</MenuItem>
                                })} 
                            </Select>
                        </FormControl>
                    </> 
                    :
                    <>
                        <FormLabel 
                            style={{  
                                color: "darkgrey",
                                fontSize: "13px",
                                marginBottom: "0.5rem"
                            }}
                        >
                            Category
                        </FormLabel>
                        <div style={{color: "darkgrey"}}>{category}</div>
                    </>}
                    {admin && 
                        <div className='btn-group'>
                            {disabled ? 
                            <IconButton onClick={()=> onEdit()}>
                                <EditNoteOutlinedIcon/>
                            </IconButton>
                            :
                            <IconButton type ="submit">
                                <BackupOutlinedIcon />
                            </IconButton>
                            }
                            {!disabled && <IconButton onClick={()=> onCancel()}>
                                <CancelOutlinedIcon/>
                            </IconButton>}
                        </div>
                    }
            </form> 
        </div>
    
    );
}

export default ProductForm;