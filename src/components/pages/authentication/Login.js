import React from 'react'
import '../../../../src/css/login.css'
import { Button, Card, Flex, Form, Input, Typography, Alert, Spin, Checkbox } from 'antd'
// import { Link } from 'react-router-dom'
import { useState } from 'react'
import { message } from 'antd'


function Login() {
    document.title="Login";

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    // const [messageApi, contextHolder] = message.useMessage();
    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true)
            const res = await fetch("https://localhost:7115/api/Auth/login", {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(values),
            })

            if (values.Remember === "on") {
                values.Remember = true;
            }

            const data = await res.json();
            // console.log(data);
            if (res.ok) {
                localStorage.setItem("user", values.email);
            }

            if (res.status === 200) {
                message.success('Login Success');
                // document.location="/dashboard";
                // navigate("/dashboard");
                // login(data.token, data.user)
            } else if (res.status === 401) {
                message.error("Unauthorised")
            } else {
                message.error("Incorrect details")
            }
        } catch (error) {
            message.error(error)
        } finally {
            setLoading(false)
        }
    }

    const  handelLogin = (values) => {
        //console.log(values);
     loginUser(values);
    
    }

    const onChange = (e) => {
        console.log(`ckecked = ${e.target.checked}`);
    }

  return (
    <div className="body">
    <Card className='form-container'>
            <Flex gap='large'>
                {/* form */}
                <Flex vertical flex={1}>
                    <Typography.Title level={3} strong className='tittle'>
                        Sign In
                    </Typography.Title>
                    <Typography.Text type='secondary' strong className='slogan'>
                        Unlock your account
                    </Typography.Text>
                    <Form
                        layout='vertical'
                        onFinish={handelLogin}
                        autoComplete='off'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Email",
                                }, {
                                    type: 'email',
                                    message: 'The email is invalid'
                                }
                            ]}
                        >
                            <Input placeholder='Enter  your Email' />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password",
                                }
                            ]}
                        >
                            <Input.Password placeholder='Enter  your password' />
                        </Form.Item>
                        <Form.Item
                        name="Remember"
                        >
                            <Checkbox onChange={onChange}>Remember Me</Checkbox>
                        </Form.Item>
                        {error && (
                            <Alert
                            description={error}
                            type='error'
                            showIcon
                            className='alert'
                            />
                        )}
                        <Form.Item>
                            <Button
                                type={`${loading ? '' : 'primary'}`}
                                htmlType='submit'
                                // size='large'
                                className='btn'
                            >
                                {loading ? <Spin /> : 'Sign In'}
                                
                            </Button>
                        </Form.Item>
                        
                    </Form>
                </Flex>

                
            </Flex>
        </Card>
    </div>
  )
}

export default Login