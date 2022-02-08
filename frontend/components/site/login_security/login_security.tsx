import React from 'react';

import { Typography, TextField } from '@mui/material';
import { NextCustomPageHead } from '~/next-custom/PageHead';
import { PageLayout } from '~/components/layout/PageLayout';

import { CountrySelect } from './CountrySelect';

export const Login_security = () => {
    return (
        <div className="page">
            <PageLayout>
                <NextCustomPageHead title="Orders" description="Your orders" />
                <Typography>
                    <h2 className="login-security__title">Profile settings</h2>
                    <div>
                        <div>
                            <span className="login-security__sub1title1">Edit personal information</span>
                            <span className="login-security__sub1title2">Edit contact information</span>
                            <hr className="login-security__underline"/>
                        </div>
                        <div>
                            <div className="login-security__inputrow1">
                                <TextField
                                    id="outlined-helperText"
                                    label="First name"
                                    defaultValue="John"
                                    className="login-security__inputFirstname"
                                />
                                <TextField
                                    id="outlined-helperText"
                                    label="Phone number"
                                    defaultValue="4 542377550"
                                    className="login-security__inputNumber"
                                />
                            </div>
                            <div className="login-security__inputrow2">
                                <TextField
                                    id="outlined-helperText"
                                    label="Last name"
                                    defaultValue="Doe"
                                    className="login-security__inputLastname"
                                />
                                <TextField
                                    id="outlined-helperText"
                                    label="Email"
                                    defaultValue="jonh.doe@email.com"
                                    className="login-security__inputEmail"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="login-security__sub2title">
                            <span className="login-security__sub1title1">Edit VAT(verification required)</span>
                            <hr className="login-security__underline"/>
                        </div>
                        <div>
                            <div>
                                <CountrySelect 
                                />
                                <br />
                                <TextField
                                    id="outlined-helperText"
                                    defaultValue="4 542377550"
                                    className="login-security__phoneVerify"
                                />
                            </div>
                        </div>
                    </div>
                </Typography>
            </PageLayout>
        </div>
    );
};
