

import React from "react";


 import ReactDataGrid from "react-data-grid";
 import { Toolbar, Data } from "react-data-grid-addons";

import { DraggableHeader } from "react-data-grid-addons";
import { ErrorBoundary } from "./ErrorBoundary";

const { DraggableContainer } = DraggableHeader;


 export interface IGridProps {
     addRow?: (row: any) => void;
     addColumn?: (column: any) => void;
     getSelRow?: () => number;
     columns?: any[];
     rows?: any[];
     onRowSelect?: (row: any) => {}
     onRowClick: (index: number, row: any) => void;
     height?: number;
 }

export interface IGridState {
    rows: any[];
    filters: any;
    sortColumn: any;
    sortDirection: any;
    reorderedColumns: any[];
    emptyColumns: any[];
    columns: any[];
    selectedIndexes: any[];
}


export class MultiselectGrid extends React.Component<IGridProps, IGridState> {
    
    constructor(props: IGridProps) {
        super(props);
        this.state = { 
            selectedIndexes:[], 
            rows: this.props.rows || [], 
            filters: {}, 
            sortColumn: null, 
            sortDirection: null, 
            columns: this.props.columns as any[], 
            reorderedColumns: [], 
            emptyColumns: [] };
    }
    

    rowGetter = (i: any) => {
        if(this.props.rows && this.props.rows[i]){
            return this.props.rows[i];
        }
        return undefined;
    };

    getRows = (): any => {
        return this.props.rows;
    };

    getSize = () => {
        return this.getRows().length;
    };

    handleGridSort = (sortColumn: any, sortDirection: any) => {
        this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    };

    handleFilterChange = (filter: any) => {
        let newFilters = Object.create({}, this.state.filters);
        if (filter.filterTerm) {
            this.setState((prevState: IGridState) => prevState.filters[filter.column.key] = filter);
            //newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }

        this.setState({ filters: newFilters });
    };

    onClearFilters = () => {
        this.setState({ filters: {} });
    };

    onRowSelect = (row: any) => {
        const evt = this.props.onRowSelect || ((row: any) => {})
        evt(row);
    };
   // currentIdx: number;
    onRowsSelected = (rows: any[]) => {
        this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
        let rowIndexes = rows.map(r => r.rowIdx);

       let totalSelected = rowIndexes.length + this.state.selectedIndexes.length;

       if(this.state.rows.length == totalSelected){
      console.log('All rows have been selected');
      //You argument here when SelectAll
    }
       // this.props.onRowClick(rows[0].rowIdx, rows[0].row);
        //this.currentIdx = rows[0].rowIdx;
    };
    onHeaderDrop = (source: any, target: any) => {
        let stateCopy = Object.create({}, (this.state) as any);
        let columnSourceIndex = this.state.columns.forEach(
            (val:any, i: any) => i.key === source
        );
        const columnTargetIndex = this.state.columns.forEach(
            (i: any) => i.key === target
        );

        stateCopy.columns.splice(
            columnTargetIndex,
            0,
            stateCopy.columns.splice(columnSourceIndex, 1)[0]);

        const emptyColumns = Object.create({}, ({ columns: [] }) as any);
        this.setState(
            emptyColumns
        );

        const reorderedColumns = Object.create({}, { columns: stateCopy.columns });
        this.setState(
            reorderedColumns
        );
    };
    onRowClick = (idx: number, row: any) => {
        if (typeof idx != "undefined" && typeof row != "undefined") {
            this.props.onRowClick(idx, row);
        }
    }
    onCellSelected = (rowIdx: any ) => {
        const evt = this.props.onRowSelect || ((row: any) => {})
        evt(rowIdx);
      };
      onRowsDeselected = (rows: any[]) => {
        let rowIndexes = rows.map(r => r.rowIdx);
        this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
    };
    // onCellSelected = ({ rowIdx, idx }) => {
    //     this.props.S
    //   };
    
    // enableRowSelect="single"
    // onRowSelect={this.onRowSelect}
    // onAddFilter={this.handleFilterChange}
    //onClearFilters = { this.onClearFilters }
    render() {
        return (<ErrorBoundary errorMessage="Error rendering multiselect grid">
           <DraggableContainer onHeaderDrop={this.onHeaderDrop}>
                <ReactDataGrid
                    // columns={this.state.columns}
                    // rowGetter={this.rowGetter}
                    // rowsCount={this.props.rows.length}
                    // minHeight={600}
                    // rowKey="ID"
                    // onRowClick={this.props.onRowClick}
                    rowKey="id"
                    //enableRowSelect="multi"
                    onGridSort={this.handleGridSort}
                    enableCellSelect={true}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.getSize()}
                    minHeight={600}
                    rowSelection={{
                        showCheckbox: true,
                        enableShiftSelect: true,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy: {
                            indexes: this.state.selectedIndexes
                        }
                    }}
                   // onRowSelect={this.onRowSelect.bind(this)}
                    toolbar={<Toolbar enableFilter={true} />}
                    onAddFilter={this.handleFilterChange}
                    onClearFilters={this.onClearFilters}
                    
                />
                </DraggableContainer>
        </ErrorBoundary>);
    }
}

export class DefaultGrid extends React.Component<IGridProps, IGridState> {
    columns: any[];
    constructor(props: IGridProps, context:any) {
        super(props, context);
        this.columns = this.props.columns as any;

        this.state = { selectedIndexes:[], rows: this.props.rows || [], filters: {}, sortColumn: null, sortDirection: null, columns: this.props.columns as any, reorderedColumns: [], emptyColumns: [] };
    }
    

    getRows = (): any => {
        /*console.log(this.props.rows);*/
        if (this.props.rows) {
            return Data.Selectors.getRows({ ...this.state, rows: [...this.props.rows] });
        } else {
            return Data.Selectors.getRows({ ...this.state, rows: [] });
        }
        
    };

    getSize = () => {
        return this.getRows().length;
    };

    rowGetter = (rowIdx: any) => {
        const rows = this.getRows();
        return rows[rowIdx];
    };

    handleGridSort = (sortColumn: any, sortDirection: any) => {
        this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    };

    handleFilterChange = (filter: any) => {
        let newFilters = {...this.state.filters};
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }

        this.setState({ filters: newFilters });
    };

    onClearFilters = () => {
        this.setState({ filters: {} });
    };

    onHeaderDrop = (source: any, target: any) => {

        /*console.log(source);
        console.log(target);*/

        const stateCopy: any = { ...this.state };

        let columnSourceIndex:any;
        for (let i in this.state.columns) {
            if (this.state.columns[i].key === source) {
                columnSourceIndex = i;
                break;
            }
        }

        console.log(columnSourceIndex);

        let columnTargetIndex: any;
        for (let i in this.state.columns) {
            if (this.state.columns[i].key === target) {
                columnTargetIndex = i;
                break;
            }
        }

        console.log(columnTargetIndex);

        stateCopy.columns.splice(
            columnTargetIndex,
            0,
            stateCopy.columns.splice(columnSourceIndex, 1)[0]
        );

        const emptyColumns = {...this.state, columns: [] as any };
        this.setState(
            emptyColumns
        );

        const reorderedColumns = { ...this.state, columns: [...stateCopy.columns] };
        console.log(reorderedColumns);
        this.setState(
            reorderedColumns
        );
    };
    currentIdx!: number;
    onRowsSelected = (rows: any[]) => {
        this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
        this.props.onRowClick(rows[0].rowIdx, rows[0].row);
        this.currentIdx = rows[0].rowIdx;
    };

    onRowsDeselected = (rows: any[]) => {
        let rowIndexes = rows.map(r => r.rowIdx);
        this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
    };

    onRowClick = (idx: number, row: any) => {
        if (typeof idx != "undefined" && typeof row != "undefined") {
            this.props.onRowClick(idx, row);
        }
    }
/*
    rowSelection={{
                            showCheckbox: true,
                            enableShiftSelect: false,
                            onRowsSelected: this.onRowsSelected,
                            onRowsDeselected: this.onRowsDeselected,
                            selectBy: {
                                indexes: this.state.selectedIndexes
                            }
                        }}
    */

    rowRenderer = ({ renderBaseRow, ...props }: any) => {
        var color:string = "";
        if(props.row != undefined && props.row.status != undefined){
           
            switch(props.row.status){
                case 3:
                    color = "red";
                    break;
                default:
                    color = "#000000";
                    break;
            }
        }
        return <div style={{ color }}>{renderBaseRow(props)}</div>;
    };

    render() {
        return (
            <ErrorBoundary errorMessage="Error Displaying Default grid, please check console to view error details">
                <DraggableContainer onHeaderDrop={this.onHeaderDrop}>
                    <ReactDataGrid
                        onGridSort={this.handleGridSort}
                        enableCellSelect={false}
                        columns={this.state.columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.getSize()}
                        minHeight={this.props.height || 500}
                        onRowClick={this.onRowClick.bind(this)}
                        toolbar={<Toolbar enableFilter={true} />}
                        onAddFilter={this.handleFilterChange}
                        onClearFilters={this.onClearFilters}
                        rowRenderer={this.rowRenderer}
                        />
                </DraggableContainer>
            </ErrorBoundary>);
    }
}


export class LockedGrid extends React.Component<IGridProps, IGridState> {
    columns: any[];
    constructor(props: IGridProps, context:any) {
        super(props, context);
        this.columns = this.props.columns as any;

        this.state = { selectedIndexes:[], rows: this.props.rows || [], filters: {}, sortColumn: null, sortDirection: null, columns: this.props.columns as any, reorderedColumns: [], emptyColumns: [] };
    }
    

    getRows = (): any => {
        /*console.log(this.props.rows);*/
        if (this.props.rows) {
            return Data.Selectors.getRows({ ...this.state, rows: [...this.props.rows] });
        } else {
            return Data.Selectors.getRows({ ...this.state, rows: [] });
        }
        
    };

    getSize = () => {
        return this.getRows().length;
    };

    rowGetter = (rowIdx: any) => {
        const rows = this.getRows();
        return rows[rowIdx];
    };

    handleGridSort = (sortColumn: any, sortDirection: any) => {
        this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    };

    handleFilterChange = (filter: any) => {
        let newFilters = {...this.state.filters};
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }

        this.setState({ filters: newFilters });
    };

    onClearFilters = () => {
        this.setState({ filters: {} });
    };

    onHeaderDrop = (source: any, target: any) => {

        /*console.log(source);
        console.log(target);*/

        const stateCopy: any = { ...this.state };

        let columnSourceIndex:any;
        for (let i in this.state.columns) {
            if (this.state.columns[i].key === source) {
                columnSourceIndex = i;
                break;
            }
        }

        console.log(columnSourceIndex);

        let columnTargetIndex: any;
        for (let i in this.state.columns) {
            if (this.state.columns[i].key === target) {
                columnTargetIndex = i;
                break;
            }
        }

        console.log(columnTargetIndex);

        stateCopy.columns.splice(
            columnTargetIndex,
            0,
            stateCopy.columns.splice(columnSourceIndex, 1)[0]
        );

        const emptyColumns = {...this.state, columns: [] as any };
        this.setState(
            emptyColumns
        );

        const reorderedColumns = { ...this.state, columns: [...stateCopy.columns] };
        console.log(reorderedColumns);
        this.setState(
            reorderedColumns
        );
    };
    currentIdx!: number;
    onRowsSelected = (rows: any[]) => {
        this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
        this.props.onRowClick(rows[0].rowIdx, rows[0].row);
        this.currentIdx = rows[0].rowIdx;
    };

    onRowsDeselected = (rows: any[]) => {
        let rowIndexes = rows.map(r => r.rowIdx);
        this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
    };

    onRowClick = (idx: number, row: any) => {
        if (typeof idx != "undefined" && typeof row != "undefined") {
            this.props.onRowClick(idx, row);
        }
    }
/*
    rowSelection={{
                            showCheckbox: true,
                            enableShiftSelect: false,
                            onRowsSelected: this.onRowsSelected,
                            onRowsDeselected: this.onRowsDeselected,
                            selectBy: {
                                indexes: this.state.selectedIndexes
                            }
                        }}
    */

    render() {
        return (
            <ErrorBoundary errorMessage="Error Displaying Default grid, please check console to view error details">
                <DraggableContainer onHeaderDrop={this.onHeaderDrop}>
                    <ReactDataGrid
                        onGridSort={this.handleGridSort}
                        enableCellSelect={false}
                        columns={this.state.columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.getSize()}
                        minHeight={500}
                        //onRowClick={this.onRowClick.bind(this)}
                        toolbar={<Toolbar enableFilter={true} />}
                        onAddFilter={this.handleFilterChange}
                        onClearFilters={this.onClearFilters}
                        
                        />
                </DraggableContainer>
            </ErrorBoundary>);
    }
}


