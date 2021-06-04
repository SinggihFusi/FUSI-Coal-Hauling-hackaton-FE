import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Divider from '@material-ui/core/Divider';
import DnsIcon from '@material-ui/icons/Dns';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CommonService from '../../service';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

export class Sidemenu extends Component {

    constructor(props) {
        super(props)
        this.comService = new CommonService();
    }

    logout = () => {
        this.comService.removeUser()
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className='init' style={{ minWidth: '250px', margin: '16px', border: '1px solid #ededed' }}>
                <List style={{ padding: '0' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <DnsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Coal Stock" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <PlaylistAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Approve Stock" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Warehouse" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <LocalShippingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Vehicle" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={this.logout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </div>
        )
    }
}

export default Sidemenu
