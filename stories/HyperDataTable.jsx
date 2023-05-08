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
    createTableColumn({columnId: 'author', renderHeaderCell: () => 'Author', renderCell: (item) => {return item.user}}),
    createTableColumn({columnId: 'comment', renderHeaderCell: () => 'Comment', renderCell: (item) =>
        {return (
            <div dangerouslySetInnerHTML={{__html: item.content}} />
        );}}),
];

const styles = {
    selected: {
        backgroundColor: 'yellow'
    }
}


export const HyperDataTable = ( {data, highlight_idx, noSelection, callback, ...props} ) => {
    // Create the table with the current comment highlighted
    // The following structure of items is used:
	// {
	//   time: 'string',
	//   author: 'string',
	//   comment: 'string
	// }
     // Assumption is that the comments are pre-sorted in chronological order
    const hasSelection = noSelection?false:"multiselect";

     return (
	<DataGrid
        style={{width: "100%"}}
		items={data}
	        columns={columns}
	        selectionMode={hasSelection}
	        getRowId={item=>item.id}
        resizableColumns={true}
        onSelectionChange={(e, d) => {
            // console.log(Array.from(d.selectedItems));
            let selectedItems = Array.from(d.selectedItems);
            callback(selectedItems);
        }}
        columnSizingOptions={{
            time: {
                defaultWidth: 150,
                idealWidth: 150
            },
            author: {
                defaultWidth: 100,
                idealWidth: 100
            },
            comment: {
                defaultWidth: 300,
                idealWidth: 300
            }
        }}

	 >
        <DataGridHeader>
	     	<DataGridRow
                // selectionCell={{ "aria-label": "Select all rows"}}
            >
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
			   // selectionCell = {{"aria-label": "Select row"}}
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
