import React, { useState, useEffect, FC, ChangeEvent } from 'react';

interface PaginationProps {
  totalItems: number,
  itemsPerPageOptions: number[],
  defaultItemsPerPage: number,
  onPageChange: (currentPage:number, itemsPerPage: number)=> void
}

const Pagination:FC<PaginationProps> = ({ totalItems, itemsPerPageOptions, defaultItemsPerPage, onPageChange }: PaginationProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

	useEffect(() => {
		// Ensure currentPage is within valid bounds when itemsPerPage changes
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [itemsPerPage, totalItems]);

	useEffect(() => {
		// Notify the parent component when the current page changes
		onPageChange(currentPage, itemsPerPage);
	}, [currentPage, itemsPerPage, onPageChange]);

	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newItemsPerPage = parseInt(event.target.value, 10);
		setItemsPerPage(newItemsPerPage);
	};

	return (
		<div className="pagination">
			<div className="items-per-page">
        Items Per Page:
				<select onChange={handleItemsPerPageChange} value={itemsPerPage}>
					{itemsPerPageOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
			<p>Total Items: {totalItems}</p>
			<p>Now showing: {}</p>
			<div className="page-numbers">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
                    &lt; Prev
				</button>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
                    Next &gt;
				</button>
			</div>
		</div>
	);
};

export default Pagination;
