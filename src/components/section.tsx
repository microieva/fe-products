import { FC, useState } from 'react';
import Table from './table';
import SearchBar from './search-bar';
import ViewSwitcher from './view-switcher';
import { Product } from '../@types/product';


const Section: FC = () => {
    //this component should return options to: searchbar, reset all products, switch view from cards to table
    const [activeView, setActiveView] = useState<string>('grid');
    const [ filteredData, setFilteredData ] = useState<Product[]>([]);

    const switchView = (activeView: string) => {
        setActiveView(activeView)
     }

    const searchProducts = (searchResult: Product[]) => {
        setFilteredData(searchResult);
    }

    return (
        <section>
            <div className='utilities-container'>
                <SearchBar searchProducts={searchProducts}/>
                <ViewSwitcher switchView={switchView}/>
            </div>
            <div className='products-container'>
                {/* {!table && <Cards />} */}
                {activeView === 'grid' && <p>cards</p>}
                {activeView === 'table' && <Table filteredData={filteredData}/>}
            </div>  
        </section>
    )
}

export default Section;