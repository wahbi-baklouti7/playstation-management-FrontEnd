
import playStationImage from "../../assets/images/playStation3.jpg";
import playStationIcon from "../../assets/icons/PSN.png";
import { Col, Container, Row } from "react-bootstrap";
import { Alert, Button, Card, Form, Input } from "antd";
import { useAuth } from "../../context/AuthProvider";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {

  const auth = useAuth()
  
 

  const onFinish = async (values) => {
    console.log("Success:", values);
    // const data = await login(values.email, values.password)
     await auth.LoginAction(values.email, values.password)

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Container fluid className="vh-100  d-flex justify-content-center align-items-center  " > 
      <Row className="w-100">
        {/* Begin Form Section */}
      <Col md={6} className="d-flex justify-content-center align-items-center bg-warningg p-0 m-0">
        <Card
         
          className="shadow w-75   bg-warningg d-flexx justify-content-center  ">
          
          
          <div className="bg-dangerr w-100 d-flex justify-content-center"><img src={playStationIcon} width={50} alt="playStation" /> </div>
          <p className="fs-5 fw-600 text-center">Sign into your account</p>
          

            {auth.error ?<Alert message={auth.errorMessage} type="error" showIcon  className="my-3" /> : null}
          <Form
            name="basic"
            layout="vertical"
            size="large"

            style={{
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onValuesChange={() => auth.setError(false)}
              
            autoComplete="off"
          >
            <Form.Item
              // label="Email"
              
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email Address" type="email"  />
            </Form.Item>

                      <Form.Item
                        
                          name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            
            >
              <Input.Password placeholder="Password" />
            </Form.Item>



            <Form.Item
            >
              <Button loading={auth.loading}  disabled={auth.loading} iconPosition="end" className="w-100" type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      {/* End Form Section */}
      {/* Begin Image Section */}
      <Col md={6} className="bg-dangerr d-none d-md-block vh-100 p-0  ">
        <img
          className="img-fluid w-100 h-100"
          src={playStationImage}
          alt=""
        />
      </Col>
      {/* End Image Section */}

      
      </Row>
    </Container>
  );
};

export default Login;
