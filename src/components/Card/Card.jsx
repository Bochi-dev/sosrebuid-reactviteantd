
import { Card, Statistic } from "antd";

export function GameCard ({title, amount}) {
    return <>
        <Card variant="borderless" style={{ width: 300 }}>
             <Statistic title={title} value={amount} />
        </Card>
    </>
}
