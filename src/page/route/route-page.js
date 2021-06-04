import { CircularProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Sidemenu from '../../component/sidemenu/sidemenu'
import CommonService from '../../service'
import DashboardPage from '../dashboard/DashboardPage'
import StockPage from '../stock/stock-page'

export class RoutePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.comService = new CommonService();
    }

    componentDidMount() {
        const user = this.comService.getUser();
        if (user) {
            this.setState({ user: user })
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        if (this.state.user) {
            return (
                <div className='init' style={rootStyle}>
                    {/* <Sidemenu {...this.props} /> */}

                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/dashboard" />
                        </Route>

                        <Route path="/dashboard" component={DashboardPage} />
                        <Route path="/stock" component={StockPage} />
                    </Switch>
                </div>
            )
        }
        return (<div className='init' style={rootStyle}><CircularProgress /></div>)
    }
}

const rootStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    height: '100vh',
    width: '100%',
}

export default RoutePage
