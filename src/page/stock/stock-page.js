import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Sidemenu from '../../component/sidemenu/sidemenu';

export class StockPage extends Component {
    render() {
        return (
            <div className='init' style={rootStyle}>

                <Sidemenu {...this.props} />

                <div style={{ flex: '1', margin: '16px', overflow: 'auto' }}>
                    <List style={{ padding: '0' }}>
                        <ListItem button>
                            <ListItemText primary="Gudang 1 - Truck 1 - Out - Progress" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Gudang 2 - Tongkang 1 - In - Progress" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Gudang 2 - Truck 2 - Out - Approved" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Gudang 1 - Tongkang 2 - In - Done" />
                        </ListItem>
                    </List>
                </div>


            </div>
        )
    }
}

const rootStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    height: '100vh',
    width: '100%',

}

export default StockPage
