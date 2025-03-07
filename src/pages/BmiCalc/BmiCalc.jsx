import React from 'react';
import { Card, Typography } from 'antd';
import { BMICalculator } from "../../components"
const { Title } = Typography;

export function BmiCalc(){
    return (
    <div className="container">
      <Card
        style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
        bordered={false}
      >
        <Title level={2} style={{ textAlign: 'center' }}>
          BMI Calculator
        </Title>
        <BMICalculator />
      </Card>
    </div>
  );
}
