export const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
export const HOURS = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM",
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];


const caloriesOfAKg = 7700

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

export const manageFatigue = (stats, amount) => {
  const fatigue = stats.fatigue + amount
  const fatigue_display = Math.floor((fatigue/0.10)*100)
  
  if (fatigue_display < 0.00){
    stats.fatigue = 0.0
    stats.fatigue_display = 0     
  } else {
    stats.fatigue = fatigue
    stats.fatigue_display = fatigue_display
  }

  return { 
    ... stats,
    fatigue: Math.max(0.0, fatigue),
    fatigue_display: Math.max(0.0, fatigue_display)
  }
}

export function getStat(stat, stats) {
  const fatigue = stats.fatigue
  const fatigueDebuff = debuffByFatigue(stat,fatigue)
  
  return stat - fatigueDebuff
    

}

export const checkReqs = (reqs, stats, ) => {
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


export const checkReqsMaterials = (reqs, materials) => {

     const newMaterials = {... materials}
     let conditions = []
//     this conditions is to save the substractions to the materials
//     and apply them at the end IF the condition is true, just so the forEach doesnt
//      eat up some materials and then return false, that would be dumb
     let materials_debucted = []
     reqs.forEach((req) => {
        if (req.type === "material"){
            const result = newMaterials[req.name] - req.amount
            if (result < 0){
                conditions.push(false)
            } else {
                conditions.push(true)
                materials_debucted.push(req)
            }
        }
     })
     
     if (conditions.includes(false)){
        console.log("FAIL")
        return [false, materials]
        
     } else {
        materials_debucted.forEach((req) => {
            newMaterials[req.name] -= req.amount
        })
        console.log("SUCCESS")
        return [true, newMaterials]
        
     }
}



export const getBMICategory = (bmi) => {
  if (bmi < 18) {
    return 'Underweight';
  } else if (bmi >= 18 && bmi < 25) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
};
    
    
    
export const looseGainWeight = (stats, amount) => {

  let calories = stats.calories + (amount)
  
  if (calories > caloriesOfAKg){
    calories = 0
    stats.weight += 1
    
  } else if (calories < 0) {
  
    calories = caloriesOfAKg + calories
    stats.weight -= 1
  }

  const bmi = stats.weight / stats.height**2;
  const category = getBMICategory(bmi)
  
  return { 
    ...stats, 
    bmi: `${Math.floor(bmi)} - ${category}`,
    calories: calories,
  }
}

/*substract 10% of its original value to any number*/
export const minusToStat = (stat) => {
    const tenpercent = stat * 0.1
    if (stat > 20) {
        return Math.floor(stat -= tenpercent)
    } else {
      stat = 20
    }
    return Math.floor(stat)
    
}

/*This will replace the current way we are adding stats to
the recruits/users */
export const plusToStat = (stat, amount) => {
  const sum = stat + amount
  if (sum < 100) {
      return stat += amount
  } else {
    stat = 100
  }
  return stat
}


export const changeStatByTurn = (stats, turns, rewardType) => {
  stats = looseGainWeight(stats, -50)
  console.log(rewardType !== "fatigue", rewardType)
  if (rewardType !== "fatigue") {
    stats = manageFatigue(stats, 0.00416)
  }
  
  if (turns >= 24) {
    return {
        ... stats,
        curr_strength: minusToStat(stats.curr_strength),
        curr_inteligence:  minusToStat(stats.curr_strength),
        curr_strength: minusToStat(stats.curr_strength),
    }
  }
  return stats
}

/*MAke a function that calculcates the hours without sleep based on the fatigueDebuff
or make a new variable inside the stats that counts it
*/

export const damageTaken = (team, value, setRecruits) => {
  const consolelist = []
  setRecruits(prev => prev.map(el => {
    if (!team.recruitIds.includes(el.id)) return el;
    return { ...el, stats: {... el.stats, health: Math.max(0, el.stats.health - value)}}; // Prevent negative health
  }));
};

export const calculateTeamHealth = (team, recruits) => {
  let teamsHealth = team.recruitIds
    .map(id => recruits.find(r => r.id === id).stats.health || 0)
    .reduce((sum, health) => sum + health, 0);

  const teamsMaxHealth = team.maxHealth * team.recruitIds.length;
  return (teamsHealth / teamsMaxHealth) * team.maxHealth;
};

export const isTeamDead = (team, recruits) => {
    const members = team.recruitIds.map(el => recruits.find(re => re.id === el))
    const aliveMembers = members.filter(el => el.stats.health > 0)
    return (aliveMembers.length === 0)
}

export const healRecruit = (recruit, setRecruits, value) => {
    setRecruits(prev => prev.map(re => {
        if (re.id !== recruit.id) return re
        return {
            ... recruit,
            stats: {
                ... recruit.stats,
                health: Math.min(recruit.stats.health + value, recruit.stats.maxHealth)
            }
        }
    }))
}

