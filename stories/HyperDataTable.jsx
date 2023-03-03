import React from "react";

import {
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
} from '@fluentui/react-components';

import './hyperdatatable.css'

const columns = [
    createTableColumn({columnId: 'time', renderHeaderCell: () => 'Time', renderCell: (item) => {return item.time}}),
    createTableColumn({columnId: 'author', renderHeaderCell: () => 'Author', renderCell: (item) => {return item.author}}),
    createTableColumn({columnId: 'comment', renderHeaderCell: () => 'Comment', renderCell: (item) => {return item.comment}}),
];

const styles = {
    selected: {
        backgroundColor: 'yellow'
    }
}


export const HyperDataTable = ( {data, highlight_idx, ...props} ) => {
    // Create the table with the current comment highlighted
    // The following structure of items is used:
	// {
	//   time: 'string',
	//   author: 'string',
	//   comment: 'string
	// }
     // Assumption is that the comments are pre-sorted in chronological order
     return (
	<DataGrid
		items={data}
	        columns={columns}
	        selectionMode="multiselect"
	        getRowId={item=>item.id}
	 >
             <DataGridHeader>
	     	<DataGridRow selectionCell={{ "aria-label": "Select all rows"}}>
	     		{ ({ renderHeaderCell }) => (
				<DataGridHeaderCell>{ renderHeaderCell() }</DataGridHeaderCell>
			)}
	     	</DataGridRow>
	     </DataGridHeader>
	     <DataGridBody>
	     	{({item, rowId}) => (
			<DataGridRow
			   key={rowId}
               style={rowId == highlight_idx ? styles.selected : {}}
               className={rowId == highlight_idx?'subject-row':'context-row'}
			   selectionCell = {{"aria-label": "Select row"}}
			>
			    {({renderCell}) => (
				    <DataGridCell>{renderCell(item)}</DataGridCell>
			    )}
			</DataGridRow>
		)}
	     </DataGridBody>

	 </DataGrid>
     );
     
}
