
import { Card } from "antd";

export function GameCard ({title, amount}) {
    return <>
        <Card title={title} variant="borderless" style={{ width: 300 }}>
            <p>{amount}</p>
        </Card>
    </>
}
