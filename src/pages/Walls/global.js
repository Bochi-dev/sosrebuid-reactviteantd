export const damageTaken = (team, value, setRecruits) => {
  const newHealth = () => {
    const calc = team.health() - value;
    return calc <= 0 ? 0 : calc;
  };
  
  const healthPercentage = newHealth() / team.maxHealth;
  
  setRecruits(prevRecruits => prevRecruits.map(el => {
    if (!team.recruitIds.includes(el.id)) return el;
    
    const damage = Math.ceil(el.maxHealth * (healthPercentage / team.recruitIds.length));
    
    console.log("damage: ", damage)

    return { ...el, health: Math.max(0, el.health - damage) }; // Prevent negative health
  }));
};

export const calculateTeamHealth = (team, recruits) => {
  let teamsHealth = team.recruitIds
    .map(id => recruits.find(r => r.id === id)?.health || 0)
    .reduce((sum, health) => sum + health, 0);

  const teamsMaxHealth = team.maxHealth * team.recruitIds.length;
  return (teamsHealth / teamsMaxHealth) * team.maxHealth;
};
