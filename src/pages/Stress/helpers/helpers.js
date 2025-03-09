export const debuffByFatigue = (stat, fatigue) => {
        
        const debuff_percentage = (fatigue/0.10) 
        const debuff_percentage2 = debuff_percentage * 100
        let modified
        
        if ( debuff_percentage2 > 300){
            modified = debuff_percentage * 0.25     
        
        } else if (debuff_percentage2 > 200) {
            modified = debuff_percentage * 0.35  
        
        } else {
            modified = debuff_percentage * 0.45  
        }
        
        
        if ( debuff_percentage2 > 20){
            
        
            return Math.ceil(stat*modified)
        }
        
        return 0
        
    }

export function getStat(stat, stats) {
    const fatigue = stats.fatigue
    const fatigueDebuff = debuffByFatigue(stat,fatigue)
    
    return stat - fatigueDebuff
    

}

export const checkReqs = (reqs,stats) => {
    let newReqs = [... reqs]
    newReqs = newReqs.map((req) => {
        const stat = getStat(stats["curr_"+req.type], stats)
        if (stat < req.amount){
            return false 
        }
        return true
    })
    
    if (newReqs.includes(false)){
        return false
    }
    
    return true
    
}
