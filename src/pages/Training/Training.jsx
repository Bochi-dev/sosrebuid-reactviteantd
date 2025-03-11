
import { MissionCard } from "../../components"
import  { useState } from "react"

export function Training ({operations}) {
    const [trainings, setTrainings, recruits, setRecruits, timeOperations] = operations.operations

    return (<div>
        <MissionCard
          missions={trainings}
          setMisssions={setTrainings}
          operations={[recruits, setRecruits]}
          timeOperations={timeOperations}
            />
    </div>)
}
