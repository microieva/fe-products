import { ChangeEvent, FC, useEffect, useState } from "react";

interface PaginationProps {
	itemsPerPage: number[],
	totalItems: number,
	onPageChange: (newPage: number, newItemsPerPage: number) => void
}

const Pagination: FC<PaginationProps> = ({ itemsPerPage, totalItems, onPageChange }: PaginationProps) => {

	const [itemsPerPageOption, setItemsPerPageOption] = useState(20);
	const totalPages = Math.ceil(totalItems / itemsPerPageOption);
	const [currentPage, setCurrentPage] = useState(1);

	

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		onPageChange(newPage, itemsPerPageOption);
	}

	const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newItemsPerPage = parseInt(event.target.value, 10);
		setItemsPerPageOption(newItemsPerPage);
	}

	useEffect(() => {
		onPageChange(currentPage, itemsPerPageOption);
	}, [currentPage, itemsPerPage, handleItemsPerPageChange]);

	return (
		<div className="pagination">
			<div className="items-per-page">
				Items Per Page:
				<select 
					onChange={handleItemsPerPageChange} 
					value={itemsPerPageOption}>
					{itemsPerPage.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				</div>
				<p>Total Items: {totalItems}</p>
				
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
				Previous
				</button>
				<span>Page {currentPage} of {totalPages}</span>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
				Next
			</button>
		</div>
	);
}
export default Pagination;