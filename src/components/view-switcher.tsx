import { FC, useState } from 'react';

import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';

interface SwitcherProps {
    switchView:(activeView: string)=>void
}

const ViewSwitcher: FC<SwitcherProps> = ({ switchView }: SwitcherProps) => {
    const [activeView, setActiveView] = useState<string>('grid');

    const handleTableClick = () => {
        switchView('table');
        setActiveView('table');
    };

    const handleGridClick = () => {
        switchView('grid');
        setActiveView('grid');
    };

    return (
         <div className="icons-container">
            <GridViewIcon onClick={handleGridClick} className={activeView === 'grid' ? 'active-icon' : ''} />
            <TableRowsIcon onClick={handleTableClick} className={activeView === 'table' ? 'active-icon' : ''}/>
        </div>
    );
};

export default ViewSwitcher;
