export const removeResource = (resources, setResources, resourceName, amount) => {
  setResources(prevResources => {
    // Create a shallow copy of the previous resources object
    const newResources = { ...prevResources };

    // Get the current quantity of the specific resource
    const currentQuantity = newResources[resourceName] || 0; // Use 0 if the resource doesn't exist

    // Calculate the new quantity, ensuring it doesn't go below zero
    const newQuantity = Math.max(0, currentQuantity - amount);

    // Update the quantity of the specific resource in the new object
    newResources[resourceName] = newQuantity;

    // Return the new resources object to update the state
    return newResources;
  });
};

export const removeRandomResources = (resources, setResources) => {
  setResources(prev => {
    const newResources = {}; // Inicializamos un nuevo objeto para los recursos

    // Usamos Object.keys() para obtener un array con las claves (nombres de recursos)
    // Luego iteramos sobre esas claves
    Object.keys(resources).forEach(resourceName => {
      // Calculamos la cantidad aleatoria a restar (entre 1 y 10)
      const randomReduction = Math.floor(Math.random() * 10) + 1;

      // Obtenemos la cantidad actual del recurso
      const currentQuantity = resources[resourceName];

      // Calculamos la nueva cantidad, asegurándonos de que no sea menor que 0
      const newQuantity = Math.max(0, currentQuantity - randomReduction);

      // Asignamos la nueva cantidad directamente al nuevo objeto de recursos
      newResources[resourceName] = newQuantity;
    });

    // Devolvemos el nuevo objeto de recursos para actualizar el estado
    return newResources;
  });
};

export const checkIfThereIsEnoughXResource = (resources, resourceName, amount) => {
    return (resources[resourceName] >= amount)
}

export const checkAndSubstract = (resources, setResources, resourceName, amount) => {
    const condition = checkIfThereIsEnoughXResource(resources, resourceName, amount)
    if (condition) {
      removeResource(resources, setResources, resourceName, amount)
    }
    return condition
}
