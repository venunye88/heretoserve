
import React from "react";
import { ActionBarBase } from "sibaui";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarToggler, 
  Collapse,
  Nav, 
  NavItem, 
  NavLink, 
  UncontrolledDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem } from "reactstrap";


export default class LandingActionBar extends ActionBarBase{
    constructor(props: any){
        super(props);

        this.state = {
            open: false
        };
    }

    toggle() {
      this.setState({
        open: !(this.state as any).open
      });
    }


render(){
    return(
        <Navbar color="primary" light expand="md">
          <NavbarBrand href="/">ReactStrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle.bind(this)} />
          <Collapse isOpen={(this.state as any).open} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#/components">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>);
}

}