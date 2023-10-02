import { FC, useState } from 'react';
import TableView from './table-view';
import SearchBar from './search-bar';
import ViewSwitcher from './view-switcher';
import { Product } from '../@types/product';
import CardsView from './cards-view';

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
                {activeView === 'grid' && <CardsView filteredData={filteredData}/>}
                {activeView === 'table' && <TableView filteredData={filteredData}/>}
            </div>  
        </section>
    )
}

export default Section;