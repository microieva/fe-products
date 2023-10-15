import { FC, useState } from 'react';
import TableView from './products-table-view';
import SearchBar from './search-bar';
import HomeViewSwitcherIcons from './home-view-switcher-icons';
import CardsView from './cards-view';
import { Product } from '../@types/product';

const Section: FC = () => {
    const [activeView, setActiveView] = useState<string>('grid');
    const [ filteredData, setFilteredData ] = useState<Product[]>([]);

    const switchView = (activeView: string) => {
        setActiveView(activeView)
     }

    const searchProducts = (searchResult: Product[]) => {
        setFilteredData(searchResult);
    }

    return (
        <section style={{ width: "100%"}}>
            <div className='utilities-container'>
                <SearchBar searchProducts={searchProducts}/>
                <HomeViewSwitcherIcons switchView={switchView}/>
            </div>
            <div className='grid-table-container'>
                {activeView === 'grid' && <CardsView filteredData={filteredData}/>}
                {activeView === 'table' && <TableView filteredData={filteredData}/>}
            </div>  
        </section>
    )
}

export default Section;