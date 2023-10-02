import { ChangeEvent, useState, FC } from 'react';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { SearchBarProps } from '../@types/types';
import { useFilterProductsByTitleQuery } from '../redux/api-queries/product-queries';

const SearchBar: FC<SearchBarProps> = ({ searchProducts }: SearchBarProps) => {
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    const { data } = useFilterProductsByTitleQuery(searchTerm);

    const handleClick = () => {
        if (data !== undefined) {
            searchProducts(data);
        }
        setSearchTerm("");
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        //if (e.target.value.length > 3 && data) {
            setSearchTerm(e.target.value);
            data && searchProducts(data)
       // }
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Products"
                inputProps={{ 'aria-label': 'search products by name' }}
                value={searchTerm}
                onChange={e => handleChange(e)}
                type="text"
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton 
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search" 
                onClick={() => handleClick()}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
