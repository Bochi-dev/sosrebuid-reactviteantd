import React, { useState } from 'react';
import { Form, InputNumber, Button, Typography, Divider, Modal } from 'antd';

const { Text, Title } = Typography;

export const BMICalculator = () => {
  const [form] = Form.useForm();
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [idealRange, setIdealRange] = useState(null);
  const [healthTipsVisible, setHealthTipsVisible] = useState(false);

  // Function to calculate BMI and determine additional info
  const calculateBMI = (values) => {
    const { weight, height } = values;
    if (!weight || !height) return;
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    setCategory(getBMICategory(bmiValue));
    // Calculate ideal weight range based on healthy BMI range [18.5, 24.9]
    const minIdeal = (18.5 * heightInMeters * heightInMeters).toFixed(1);
    const maxIdeal = (24.9 * heightInMeters * heightInMeters).toFixed(1);
    setIdealRange({ min: minIdeal, max: maxIdeal });
  };

  // Determine the BMI category
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  };

  // Provide health tips based on the BMI category
  const getHealthTips = (category) => {
    switch(category) {
      case 'Underweight':
        return "Consider a nutrient-rich diet with balanced proteins, carbohydrates, and healthy fats. A nutritionist might help you create a meal plan to gain weight gradually.";
      case 'Normal weight':
        return "Great job! Maintain your balanced diet and regular physical activity to keep up your healthy lifestyle.";
      case 'Overweight':
        return "Try incorporating regular physical activity and consider a moderate calorie reduction. Consulting a nutritionist for a tailored plan can be beneficial.";
      case 'Obesity':
        return "It's advisable to consult with a healthcare professional. Consider a structured diet and exercise plan to help improve your health gradually.";
      default:
        return "";
    }
  };

  // Handle form submission
  const onFinish = (values) => {
    calculateBMI(values);
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Weight (kg)"
          name="weight"
          rules={[
            { required: true, message: 'Please input your weight' },
            { type: 'number', min: 1, message: 'Weight must be greater than 0' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Enter weight in kg" />
        </Form.Item>

        <Form.Item
          label="Height (cm)"
          name="height"
          rules={[
            { required: true, message: 'Please input your height' },
            { type: 'number', min: 1, message: 'Height must be greater than 0' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Enter height in cm" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit" style={{ width: '48%' }}>
              Calculate BMI
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setBmi(null);
                setCategory('');
                setIdealRange(null);
              }}
              style={{ width: '48%' }}
            >
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>

      {bmi && (
        <>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <Title level={4}>Your BMI: {bmi}</Title>
            <Text strong style={{ fontSize: '16px' }}>
              Category: {category}
            </Text>
            {idealRange && (
              <div style={{ marginTop: '10px' }}>
                <Text>
                  Your ideal weight range: {idealRange.min} kg - {idealRange.max} kg
                </Text>
              </div>
            )}
            <div style={{ marginTop: '20px' }}>
              <Button type="dashed" onClick={() => setHealthTipsVisible(true)}>
                View Health Tips
              </Button>
            </div>
          </div>
        </>
      )}

      <Modal
        title="Health Tips"
        visible={healthTipsVisible}
        onOk={() => setHealthTipsVisible(false)}
        onCancel={() => setHealthTipsVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setHealthTipsVisible(false)}>
            Close
          </Button>
        ]}
      >
        <p>
          {bmi
            ? getHealthTips(category)
            : "Please calculate your BMI to get personalized health tips."}
        </p>
      </Modal>
    </div>
  );
}; 
