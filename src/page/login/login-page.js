import { Button, TextField } from '@material-ui/core';
import React, { Component } from 'react'
import CommonService, { baseUrlApiSebelah } from '../../service';

export class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            uerr: false,
            perr: false,
        }
        this.comService = new CommonService()
    }

    inputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        document.getElementById('err-login').style.display = 'none';

        if (!this.state.username) {
            this.setState({ uerr: true })
        } else {
            this.setState({ uerr: false })
        }

        if (!this.state.password) {
            this.setState({ perr: true })
        } else {
            this.setState({ perr: false })
        }

        if (this.state.username && this.state.password) {
            this.comService.postData({
                url: baseUrlApiSebelah,
                path: '/api/login',
                data: {
                    username: this.state.username,
                    password: this.state.password
                }
            }).then(e => {
                if (e && e.length) {
                    const s = JSON.stringify(e[0]);
                    this.comService.setUser(s)
                    window.location = '/'
                } else {
                    document.getElementById('err-login').style.display = 'block';
                }
            }).catch(() => {
                document.getElementById('err-login').style.display = 'block';
            })
        }

        event.preventDefault();
    }

    render() {
        return (
            <div className='init' style={rootStyle}>
                <form className='init' onSubmit={this.handleSubmit} noValidate autoComplete="off" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '30%'
                }}>
                    <div style={{ width: '300px' }}><p style={{ fontSize: '1.6em' }}>ITM Truck Monitoring</p></div>
                    <div id='err-login' style={{ width: '300px', display: 'none' }}><p style={{ fontSize: '.8em', color: '#ff0000' }}>Wrong Username or Password</p></div>
                    <TextField error={this.state.uerr} helperText="" value={this.state.username} onChange={this.inputChange} name='username' label="Username" style={{ width: '300px', marginBottom: '24px' }} />
                    <TextField error={this.state.perr} value={this.state.password} onChange={this.inputChange} name='password' label="Password" type="password" style={{ width: '300px', marginBottom: '24px' }} />
                    <Button variant="contained" color="primary" type='submit' value="Submit">Login</Button>
                </form>
            </div>
        )
    }
}

const rootStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '98vh',
    width: '100%'
}

export default LoginPage;
