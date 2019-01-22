import React from "reactn";
import { MdPlaylistAdd, MdDelete } from "react-icons/md";
import { IoMdCreate, IoIosUndo } from "react-icons/io";
import { FaFileExport } from "react-icons/fa";
import { Button } from "reactstrap";

interface IGridButtonBar{
    onAddRow: () => void;
    onUpdateRow: () => void;
    onDeleteRow: () => void;
    onRestoreRow: () => void;
    onExport: () => void;
}

export default class GridButtonBar extends React.Component<IGridButtonBar,any>{

    render(){
        return(
    <div style={{display: "flex", justifyContent:"space-between", flexWrap:"wrap", marginBottom:"1em"}}>
        {/* grid action buttons */}
        <div>
            <Button onClick={this.props.onAddRow} color="default" title="Click to add what has been captured in the form above as a record to the grid below"> <MdPlaylistAdd color="green" size="18px" />  Add</Button> {' '}
            <Button onClick={this.props.onUpdateRow} color="default" title="Click to update the selected record with the information captured in the form above"> <IoMdCreate color="#ffc107" size="18px" /> Update</Button> {' '}
            <Button onClick={this.props.onDeleteRow} color="default" title="Click to remove a new record from the grid or mark an active record for deletion"> <MdDelete color="#f64846" size="18px" /> Delete</Button> {' '}
            <Button onClick={this.props.onRestoreRow} color="default" title="Click to restore a record that has been marked for deletion back to active"> <IoIosUndo color="#1b8eb7" size="18px" />  Restore</Button>
        </div> 
        <div>
            {this.props.children}
        </div>
            
        <div>
            <Button color="success" title="Click to export the data in the grid below to a csv file" onClick={this.props.onExport}> <FaFileExport size="18px"/> Export</Button>
        </div>
    </div>)
    }
}