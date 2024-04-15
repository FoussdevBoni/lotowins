export function createReference(dateString, prefix = "Ref") {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getSeconds().toString().padStart(2, '0');
  const milliseconds = dateObject.getMilliseconds().toString().padStart(3, '0');

  const reference = `${prefix}-${year}-${month}-${day}-${hours}${minutes}${seconds}.${milliseconds}Z`;

  return reference;
}

// Exemple d'utilisation
const dateString = "2024-02-21T19:37:21.139Z";
const reference = createReference(dateString, "Doc");
console.log(reference);
